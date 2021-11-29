const BorealisswapFactory = artifacts.require("BorealisswapFactory");

module.exports = function (deployer, network, accounts) {
  let currentAccount = accounts[0]
  if(network == 'testnet') {
    console.warn('WARNING: Using account[1] for testnet')
    currentAccount = accounts[0]
  }
  deployer.deploy(BorealisswapFactory, currentAccount, {from: currentAccount});
};
