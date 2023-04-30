const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));


const contractAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD';  // proxy address



const contractABI =  require('./abi-repay-USDC.js');

require('dotenv').config()
const USDCAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
const contract = new web3.eth.Contract(contractABI, contractAddress);
const senderAddress = '0xD065833450C9AB16C35BEe9377593800628fC29A';

const privateKey = process.env.WALLET_SECRET;



async function repay() {
 // const jumlahnya = await web3.utils.toWei('1.29', 'ether');
  const jumlahnya = 2000000
    //const jumlahnya = 1800000
    const interestRateMode = 2
  const referalCode = 0;
  //const amountToDeposit = '1000000000000000000';
  const nonce = await web3.eth.getTransactionCount(senderAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 488000;

  //const txData = await contract.methods.depositETH(  senderAddress, senderAddress ,referalCode ).encodeABI();
  const txData = await contract.methods.repay(  USDCAddress, jumlahnya, interestRateMode, senderAddress ).encodeABI();
  const tx = {
    to: contractAddress,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    gas: 3000000,
    //value: jumlahnya ,
    value: '0',
    data: txData
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  console.log(receipt);
}

repay();