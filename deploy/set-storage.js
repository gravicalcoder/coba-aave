const Web3 = require('web3');

const abi = require('./abi-userStorage.js'); // Replace with your contract's ABI
const contractABI = abi;

require('dotenv').config()
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET


//const contractAddress ='0x8F8C6D79E51c3059c76053e21d227be948881D8A';
const contractAddress ='0x68D851606726406005B8125710e0524532D89895'; // yang bisa akses hanya yang nyimpen-2
const privateKey =  WALLET_SECRET ;

const web3 = new Web3('https://polygon-rpc.com/');

const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
// 250000000000    ==12
// 25000000000 == 11 
async function setUserData(name, age, phoneNumber, homeAddress, erc20Address) {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const gasPrice = await web3.eth.getGasPrice();

    const tx = {
      from: account.address,
      to: contractAddress,
      gas: 200000,
      gasPrice,
      data: contractInstance.methods.storeUserData(name, age, phoneNumber, homeAddress, erc20Address).encodeABI(),
      nonce: await web3.eth.getTransactionCount(account.address)
    };

    const signedTx = await account.signTransaction(tx);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('Transaction Hash:', receipt.transactionHash);
  } catch (error) {
    console.error('Error:', error);
  }
}

setUserData('Sujiwo Kepo', 104, '+1234904335', '1723 kalijogo', '0x3058aB42f14B412aB3326A3D21164cFcAd592D0b');
