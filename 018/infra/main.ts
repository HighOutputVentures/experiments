import { App } from 'cdktf';
import { EC2Stack } from './stacks/ec2';
import { VpcStack } from './stacks/vpc';

const app = new App();
new VpcStack(app, 'vpc-dev');

new EC2Stack(app, 'app');

app.synth();
