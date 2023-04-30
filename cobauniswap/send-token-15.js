const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
//const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR-PROJECT-ID'));
const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today"));

const senderAddress = '0x48C6079A8D9DF863eC98a65199Ae8224CadabA70';

const privateKey = '0x94bf4693d19e8fc7e80fbd66731591bb6fc70f55c5827d18a9097d6a6749d7e2';
const receiverAddress = '0x65EcEe68791340340Aef4F0ee8144bE7097CbB47';
const contractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';


//const contractABI = require('./abi-doang.js')


//import { contractABI } from './abi-doang.js'

import { ABI } from './abi-aja'


async function sendLINK() {
  const contract = new web3.eth.Contract(ABI, contractAddress);
  const transferValue = web3.utils.toWei('0.28', 'ether');
  //const transferValue ="110000000000000000";

  const nonce = await web3.eth.getTransactionCount(senderAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 288000;

 
  const transferData =  contract.methods.transfer(receiverAddress, transferValue).encodeABI();



  const tx = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: contractAddress,
    value: '0',
    data: transferData
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log(receipt);

}

sendLINK() 