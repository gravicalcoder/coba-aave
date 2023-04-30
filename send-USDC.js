const Web3 = require('web3');
const abi = require('./abi-USDC.js');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));

require('dotenv').config()

const senderAddress = process.env.WALLET_ADDRESS;
const privateKey = process.env.WALLET_SECRET;
const receiverAddress = process.env.WALLET_ADDRESS2;
const contractAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';



async function sendUSDC() {
  const contract = new web3.eth.Contract(abi, contractAddress);
  
  const transferValue = 1500000

  const nonce = await web3.eth.getTransactionCount(senderAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 288000;

  const transferData =  contract.methods.transfer(receiverAddress, transferValue).encodeABI();

  const tx = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    gas: 30000,
    to: contractAddress,
    value: '0',
    data: transferData
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log(receipt);

}

sendUSDC()