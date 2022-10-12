data "amazon-ami" "ami" {
  filters = {
    name                = "ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"
    root-device-type    = "ebs"
    virtualization-type = "hvm"
  }

  most_recent = true
  owners      = ["099720109477"]
  region      = var.region
}

source "amazon-ebs" "ebs" {
  ami_name      = "vault-base"
  source_ami    = data.amazon-ami.ami.id
  instance_type = "t3a.small"
  ssh_username  = "ubuntu"
  region        = var.region
}

build {
  name = "vault-base"

  sources = ["source.amazon-ebs.ebs"]

  provisioner "ansible" {
    user          = "ubuntu"
    use_proxy     = false
    playbook_file = "./ansible/main.yml"
  }
}
