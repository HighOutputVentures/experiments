import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { S3Backend, TerraformStack, TerraformVariable } from 'cdktf';
import { Construct } from 'constructs';
import { Vpc } from '../.gen/modules/vpc';

export class VpcAbstraction {
  constructor(
    scope: Construct,
    config: {
      environment: string;
      region: string;
      cidr: string;
      azs: string[];
      publicSubnets: string[];
      privateSubnets: string[];
    } = {
      environment: 'development',
      region: 'ap-southeast-1',
      cidr: '10.0.0.0/16',
      azs: ['ap-southeast-1a', 'ap-southeast-1b', 'ap-southeast-1c'],
      publicSubnets: ['10.0.1.0/24', '10.0.2.0/24', '10.0.3.0/24'],
      privateSubnets: ['10.0.11.0/24', '10.0.12.0/24', '10.0.13.0/24'],
    }
  ) {
    const cidr = new TerraformVariable(scope, 'cidr', {
      type: 'string',
      default: config.cidr,
    });
    const azs = new TerraformVariable(scope, 'azs', {
      type: 'list',
      default: config.azs,
    });
    const publicSubnets = new TerraformVariable(scope, 'public_subnets', {
      type: 'list',
      default: config.publicSubnets,
    });
    const privateSubnets = new TerraformVariable(scope, 'private_subnets', {
      type: 'list',
      default: config.privateSubnets,
    });

    new S3Backend(scope, {
      bucket: 'labs-vault-terraform',
      region: 'ap-southeast-1',
      key: `vpc.tfstate`,
    });

    new AwsProvider(scope, 'aws', {
      region: config.region,
    });

    new Vpc(scope, 'vpc', {
      cidr: cidr.value,
      azs: azs.value,
      publicSubnets: publicSubnets.value,
      privateSubnets: privateSubnets.value,
      enableNatGateway: false,
      enableDnsHostnames: true,
      enableDnsSupport: true,
      publicSubnetTags: {
        Public: '1',
      },
      privateSubnetTags: {
        Private: '1',
      },
      tags: {
        Name: `vault-vpc-${config.environment}`,
        Terraform: 'true',
        Project: 'vault',
        Environment: config.environment,
      },
    });
  }
}

export class VpcStack extends TerraformStack {
  constructor(
    scope: Construct,
    name: string,
    config?: {
      environment: string;
      region: string;
      cidr: string;
      azs: string[];
      publicSubnets: string[];
      privateSubnets: string[];
    }
  ) {
    super(scope, name);

    new VpcAbstraction(this, config);
  }
}
