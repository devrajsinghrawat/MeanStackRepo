/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    geth: {
      host: 'localhost',
      port: 8545,
      network_id: "3" // Match any network id
    },

    private: {
      host: 'localhost',
      port: 2000,
      network_id: "*", //"2019", // Match any network id
      from: "0xc371d3c04ac6f495b6e35e5b36b487a715e6eecf",
      gas: 4700000
    },

    ganache: {
      host: 'localhost',
      port: 9545,
      network_id: "4447" // Match any network id
    }
  }
};
