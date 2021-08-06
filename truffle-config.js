/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */
const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

const result = dotenv.config();
if (result.error) {
  throw result.error;
}


exports.networks = {
  // Useful for testing. The `development` name is special - truffle uses it by default
  // if it's defined here and no other network is specified at the command line.
  // You should run a client (like ganache-cli, geth or parity) in a separate terminal
  // tab if you use this network and you must also set the `host`, `port` and `network_id`
  // options below to some value.
  //
  development: {
   host: "127.0.0.1",     // Localhost (default: none)
   port: 8545,            // Standard Ethereum port (default: none)
   network_id: "97",       // Any network (default: none)
  },
  testnet: {
    provider: () => new HDWalletProvider(MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545`),
    network_id: 97,
    confirmations: 10,
    timeoutBlocks: 200,
    skipDryRun: true
  },
  bsc: {
    provider: () => new HDWalletProvider(MNEMONIC, `https://bsc-dataseed1.binance.org`),
    network_id: 56,
    confirmations: 10,
    timeoutBlocks: 200,
    skipDryRun: true
  },
};
exports.mocha = {
  // timeout: 100000
};
exports.compilers = {
  solc: {
    version: '0.4.25',
  },
};
