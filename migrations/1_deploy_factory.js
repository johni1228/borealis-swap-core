const BorealisswapFactory = artifacts.require("BorealisswapFactory");
const _feeToSetter = '0x8A1eAA7f43D44D06ac1b7677FD6B979538EBc652';

module.exports = function (deployer, accounts) {
  deployer.deploy(BorealisswapFactory, _feeToSetter);
};