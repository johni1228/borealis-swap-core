const Migrations = artifacts.require("Migrations");
const BorealisswapFactory = artifacts.require("BorealisswapFactory");

module.exports = function (deployer) {

  deployer.deploy(Migrations);
};
