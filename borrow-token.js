const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));


require('dotenv').config()
//const contractAddress = '0x1e4b7A6b903680eab0c5dAbcb8fD429cD2a9598c';
const contractAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD';  // proxy address


// cari ABI yang dibawah ada di "write as proxy" link nya berisi :ABI for the implementation contract at 0xdd9185db084f5c4fff3b4f70e7ba62123b812226,
const contractABI = require('./abi-borrow-USDC.js');


  // set LTV ke 60% dari 65% biar aman, referensi ==> https://docs.aave.com/risk/asset-risk/polygon

const USDCAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
const contract = new web3.eth.Contract(contractABI, contractAddress);
const senderAddress = '0xD065833450C9AB16C35BEe9377593800628fC29A';

const privateKey = process.env.WALLET_SECRET;

async function borrow() {
  //const jumlahnya = await web3.utils.toWei('0.27', 'ether');
  //const jumlahnya = 3800000
    const jumlahnya = 1000000
    const interestRateMode = 2
  const referalCode = 0;
  
  const nonce = await web3.eth.getTransactionCount(senderAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 488000;

 
  const txData = await contract.methods.borrow(  USDCAddress, jumlahnya, interestRateMode, referalCode,  senderAddress ).encodeABI();
  const tx = {
    to: contractAddress,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    gas: 3000,
    //value: jumlahnya ,
    value: '0',
    data: txData
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  console.log(receipt);
}

borrow();