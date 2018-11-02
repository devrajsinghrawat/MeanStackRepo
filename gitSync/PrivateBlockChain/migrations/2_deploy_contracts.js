// Get an instance of the contract 
let SigData = artifacts.require("./SigData.sol");

module.exports = function (deployer) {
  deployer.deploy(SigData);
};