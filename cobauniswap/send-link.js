const Web3 = require('web3');
//const web3 = new Web3(new Web3.providers.HttpProvider('MATIC_NODE_URL'));
const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today"));

// Address of the account that will be sending the tokens
const account = '0x48C6079A8D9DF863eC98a65199Ae8224CadabA70';

// Get the nonce (transaction count) of the account
web3.eth.getTransactionCount(account)
  .then((nonce) => {
    console.log(`Nonce: ${nonce}`);
  })
  .catch((error) => {
    console.error(`Error getting nonce: ${error}`);
  });

// Contract address of the LINK token on the Matic network
const linkContractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';

// ABI of the LINK contract
const linkAbi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  // Other contract functions ...
];

// Create an instance of the LINK contract
const linkContract = new web3.eth.Contract(linkAbi, linkContractAddress);

// Recipient address
const to = '0x65EcEe68791340340Aef4F0ee8144bE7097CbB47';

// Amount of tokens to send
const value = '170000000000000000';

// Send the tokens
async function eth_transaction(){

    await linkContract.methods.transferFrom(account, to, value)
     .send({ from: account })
     .on('transactionHash', (hash) => {
         console.log(`Transaction hash: ${hash}`);
     })
     .on('receipt', (receipt) => {
      console.log(`Transaction receipt: ${receipt}`);
     })
    .on('error', (error) => {
      console.error(`Error sending transaction: ${error}`);
    });

}

eth_transaction();