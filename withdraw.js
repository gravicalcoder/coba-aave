const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));

const contractAddress = '0x1e4b7A6b903680eab0c5dAbcb8fD429cD2a9598c';
const contractABI = require('./abi-withdraw-MATIC.js');

require('dotenv').config()
const contract = new web3.eth.Contract(contractABI, contractAddress);
const senderAddress = '0xD065833450C9AB16C35BEe9377593800628fC29A';
const privateKey = process.env.WALLET_SECRET;

async function withdraw() {
  const jumlahnya = await web3.utils.toWei('5.21', 'ether');
  //const jumlahnya = 290000000000000000;
  const referalCode = 0;
  //const amountToDeposit = '1000000000000000000';
  const nonce = await web3.eth.getTransactionCount(senderAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 4880000;

  const txData = await contract.methods.withdrawETH(  senderAddress,jumlahnya , senderAddress, ).encodeABI();
  const tx = {
    to: contractAddress,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    gas: 3000,
    //value: jumlahnya ,
    data: txData
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  console.log(receipt);
}

withdraw();