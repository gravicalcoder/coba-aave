const ethers = require('ethers');

require('dotenv').config()

//const account = process.env.WALLET_ADDRESS;
const privateKey = process.env.WALLET_SECRET;

//checkBalance();

var url = 'https://polygon-rpc.com/';
const Web3 = require('web3');

// Create a new instance of Web3
const web3 = new Web3();

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
const publicKey = account.address;

// Print the public key
console.log('Public Key:', publicKey);
//checkBalance();

var url = 'https://polygon-rpc.com/';


async function checkBalance() {

    var customHttpProvider = await new ethers.providers.JsonRpcProvider(url);
    customHttpProvider.getBlockNumber().then((result) => {
    console.log("Current block number: " + result);
        });

const wallet = new ethers.Wallet(privateKey,customHttpProvider );
  const balance = await wallet.getBalance();
  console.log('Balance:', ethers.utils.formatEther(balance));
}

checkBalance();
