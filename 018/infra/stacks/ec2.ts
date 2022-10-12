import { DataAwsAcmCertificate } from '@cdktf/provider-aws/lib/data-aws-acm-certificate';
import { DataAwsAmi } from '@cdktf/provider-aws/lib/data-aws-ami';
import { DataAwsSubnet } from '@cdktf/provider-aws/lib/data-aws-subnet';
import { DataAwsSubnets } from '@cdktf/provider-aws/lib/data-aws-subnets';
import { DataAwsVpc } from '@cdktf/provider-aws/lib/data-aws-vpc';
import { EbsVolume } from '@cdktf/provider-aws/lib/ebs-volume';
import { Instance } from '@cdktf/provider-aws/lib/instance';
import { Lb } from '@cdktf/provider-aws/lib/lb';
import { LbListener } from '@cdktf/provider-aws/lib/lb-listener';
import { LbListenerRule } from '@cdktf/provider-aws/lib/lb-listener-rule';
import { LbTargetGroup } from '@cdktf/provider-aws/lib/lb-target-group';
import { LbTargetGroupAttachment } from '@cdktf/provider-aws/lib/lb-target-group-attachment';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { SecurityGroup } from '@cdktf/provider-aws/lib/security-group';
import { VolumeAttachment } from '@cdktf/provider-aws/lib/volume-attachment';
import {
  S3Backend,
  TerraformOutput,
  TerraformStack,
  TerraformVariable,
} from 'cdktf';

import { Construct } from 'constructs';

export class EC2Abstraction {
  constructor(
    scope: Construct,
    config: {
      environment: string;
      region: string;
      availabilityZone: string;
      instanceType: string;
      volumeType: string;
      volumeSize: number;
    } = {
      environment: 'development',
      region: 'ap-southeast-1',
      availabilityZone: 'ap-southeast-1a',
      instanceType: 't3a.small',
      volumeType: 'gp3',
      volumeSize: 50,
    }
  ) {
    const availabilityZone = new TerraformVariable(scope, 'availability_zone', {
      type: 'string',
      default: config.availabilityZone,
    });

    const instanceType = new TerraformVariable(scope, 'instance_type', {
      type: 'string',
      default: config.instanceType,
    });

    const volumeType = new TerraformVariable(scope, 'volume_type', {
      type: 'string',
      default: config.volumeType,
    });

    const volumeSize = new TerraformVariable(scope, 'volume_size', {
      type: 'number',
      default: config.volumeSize,
    });

    new S3Backend(scope, {
      bucket: 'labs-vault-terraform',
      region: 'ap-southeast-1',
      key: `ec2.tfstate`,
    });

    new AwsProvider(scope, 'aws', {
      region: config.region,
    });

    const vpc = new DataAwsVpc(scope, 'vpc', {
      tags: {
        Name: `vault-vpc-${config.environment}`,
        Environment: config.environment,
      },
    });

    const subnet = new DataAwsSubnet(scope, 'subnet', {
      vpcId: vpc.id,
      availabilityZone: availabilityZone.value,
      tags: {
        Public: '1',
      },
    });

    const subnets = new DataAwsSubnets(scope, 'subnets', {
      filter: [
        {
          name: 'vpc-id',
          values: [vpc.id],
        },
      ],
      tags: { Public: '1' },
    });

    const ami = new DataAwsAmi(scope, 'ami', {
      owners: ['137130492928'],
      filter: [
        {
          name: 'name',
          values: ['vault-base'],
        },
      ],
    });

    const acm = new DataAwsAcmCertificate(scope, 'acm', {
      domain: 'highoutput.io',
      types: ['AMAZON_ISSUED'],
      mostRecent: true,
    });

    const securityGroup = new SecurityGroup(scope, 'security_group', {
      name: `vault-ec2-${config.environment}`,
      vpcId: vpc.id,

      ingress: [
        {
          fromPort: 22,
          toPort: 22,
          protocol: 'tcp',
          cidrBlocks: ['0.0.0.0/0'],
        },
        {
          fromPort: 8200,
          toPort: 8200,
          protocol: 'tcp',
          cidrBlocks: ['0.0.0.0/0'],
        },
        {
          fromPort: 0,
          toPort: 0,
          protocol: '-1',
          selfAttribute: true,
        },
      ],

      egress: [
        {
          fromPort: 0,
          toPort: 0,
          protocol: '-1',
          cidrBlocks: ['0.0.0.0/0'],
        },
      ],
    });

    const volume = new EbsVolume(scope, 'volume', {
      availabilityZone: availabilityZone.value,
      size: volumeSize.value,
      type: volumeType.value,
      tags: {
        Project: 'vault',
        Terraform: 'true',
        Environment: config.environment,
      },
    });

    const instance = new Instance(scope, 'instance', {
      ami: ami.id,
      instanceType: instanceType.value,
      associatePublicIpAddress: true,
      rootBlockDevice: {
        volumeSize: volumeSize.value,
        volumeType: volumeType.value,
        deleteOnTermination: true,
      },
      vpcSecurityGroupIds: [securityGroup.id],
      subnetId: subnet.id,
      keyName: 'hov-monitoring',
      tags: {
        Name: 'vault-app',
        Project: 'vault',
        Environment: config.environment,
        Terraform: 'true',
      },
    });

    new TerraformOutput(scope, 'ip', {
      value: instance.publicIp,
    });

    new VolumeAttachment(scope, 'volume_att', {
      deviceName: '/dev/sdh',
      volumeId: volume.id,
      instanceId: instance.id,
    });

    const lb = new Lb(scope, 'lb', {
      name: 'vault-app',
      internal: false,
      loadBalancerType: 'application',
      securityGroups: [securityGroup.id],
      subnets: subnets.ids,

      enableDeletionProtection: false,

      tags: {
        Terraform: 'true',
        Project: 'vault',
        Environment: config.environment,
      },
    });

    const lbTargetGroup = new LbTargetGroup(scope, 'lb_target_group', {
      name: 'vault-app',
      port: 80,
      protocol: 'HTTP',
      targetType: 'instance',
      vpcId: vpc.id,

      dependsOn: [lb],

      lifecycle: {
        createBeforeDestroy: true,
      },

      tags: {
        Terraform: 'true',
        Project: 'vault',
        Environment: config.environment,
      },
    });

    new LbTargetGroupAttachment(scope, 'lb_target_group_attachment', {
      targetGroupArn: lbTargetGroup.arn,
      targetId: instance.id,
      port: 80,
    });

    new LbListener(scope, 'lb_listener_http', {
      loadBalancerArn: lb.arn,
      port: 80,
      protocol: 'HTTP',

      defaultAction: [
        {
          type: 'redirect',
          redirect: {
            port: '443',
            protocol: 'HTTPS',
            statusCode: 'HTTP_301',
          },
        },
      ],
    });

    const lbListenerHttps = new LbListener(scope, 'lb_listener_https', {
      loadBalancerArn: lb.arn,
      port: 443,
      protocol: 'HTTPS',
      sslPolicy: 'ELBSecurityPolicy-2016-08',
      certificateArn: acm.arn,

      defaultAction: [
        {
          type: 'forward',
          targetGroupArn: lbTargetGroup.arn,
        },
      ],
    });

    new LbListenerRule(scope, 'lb_listener_rule', {
      listenerArn: lbListenerHttps.arn,
      priority: 100,

      action: [
        {
          type: 'forward',
          targetGroupArn: lbTargetGroup.arn,
        },
      ],
      condition: [
        {
          hostHeader: {
            values: ['*.highoutput.io', 'highoutput.io'],
          },
        },
      ],
    });
  }
}

export class EC2Stack extends TerraformStack {
  constructor(
    scope: Construct,
    name: string,
    config?: {
      environment: string;
      region: string;
      availabilityZone: string;
      instanceType: string;
      volumeType: string;
      volumeSize: number;
    }
  ) {
    super(scope, name);

    new EC2Abstraction(this, config);
  }
}
