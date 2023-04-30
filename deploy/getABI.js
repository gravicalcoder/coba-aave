const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

// Connect to the Polygon network via Infura
const web3 = new Web3('https://polygon-rpc.com/');

require('dotenv').config()
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

// Load contract source code
const sourceCode = fs.readFileSync('UserInfo.sol', 'utf8');

// Compile contract
const input = {
  language: 'Solidity',
  sources: {
    'UserInfo.sol': {
      content: sourceCode,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));
const abi = output.contracts['UserInfo.sol']['UserInfo'].abi;
const bytecode = output.contracts['UserInfo.sol']['UserInfo'].evm.bytecode.object;

// Set up account to deploy contract
const account = web3.eth.accounts.privateKeyToAccount(WALLET_SECRET);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

// Deploy contract
const contract = new web3.eth.Contract(abi);
const deployTx = contract.deploy({
  data: bytecode,
});

deployTx.estimateGas().then((gas) => {
  console.log('Estimated gas:', gas);

  deployTx.send({
    from: account.address,
    gas: gas,
    gasPrice: web3.utils.toWei('10', 'gwei'),
  })
    .on('transactionHash', (hash) => {
      console.log('Transaction hash:', hash);
    })
    .on('receipt', (receipt) => {
      console.log('Contract address:', receipt.contractAddress);
    });
});
