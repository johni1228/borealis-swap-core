var HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

console.log('mnemonic = ', mnemonic);
//const BSC_DEPLOYER_KEY = process.env.BSC_DEPLOYER_KEY;
// const BSC_TESTNET_DEPLOYER_KEY = process.env.BSC_TESTNET_DEPLOYER_KEY;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard BSC port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://testnet.aurora.dev/`),
      network_id: 131316555,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      from: '0x8A1eAA7f43D44D06ac1b7677FD6B979538EBc652',
      gasPrice: 3000000000

    },
    aurora: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://mainnet.aurora.dev`),
      network_id: 0x4e454152,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      from: '0x8A1eAA7f43D44D06ac1b7677FD6B979538EBc652'
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    // Add BSCSCAN_API_KEY in .env file to verify contracts deployed through truffle
    etherscan: process.env.BSCSCAN_API_KEY
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      //https://forum.openzeppelin.com/t/how-to-deploy-uniswapv2-on-ganache/3885
      version: "0.5.16",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: true,
        runs: 999999
      },
      evmVersion: "istanbul", 
      outputSelection: {
        "*": {
          "": [
            "ast"
          ],
          "*": [
            "evm.bytecode.object",
            "evm.deployedBytecode.object",
            "abi",
            "evm.bytecode.sourceMap",
            "evm.deployedBytecode.sourceMap",
            "metadata"
          ]
        },
      }
      }
    },
  }
}
