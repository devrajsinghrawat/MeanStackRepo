// Get an instance of the contract 
const SimpleStore = artifacts.require("./SimpleStore.sol");

module.exports = function (deployer) {
  deployer.deploy(SimpleStore);
};