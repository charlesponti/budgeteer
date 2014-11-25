# -*- mode: ruby -*-
# vi: set ft=ruby :

# Setup virtual machine box. This VM configuration code is always executed.
Vagrant.configure("2") do |config|

  # Choose your base box
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  # Give VM name
  config.vm.hostname = 'chailatte'

  # Give the guest OS access to the user's home dir for .ssh keys and so on.
  # Enable nfs for faster performance.
  config.vm.synced_folder "~/", "/host", nfs: true

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network :private_network, ip: "192.168.50.4"

  config.vm.provision :shell, path: "bin/install.sh"
end
