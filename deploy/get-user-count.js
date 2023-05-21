/*
const Web3 = require('web3');
const contractABI = [
  // ... contract ABI here ...
];
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

const web3 = new Web3('https://polygon-rpc.com/');
*/

// Import the required dependencies
const Web3 = require('web3');

//const abi = require('./abi-UserInfo.js');
const abi = require('./abi-userStorage.js'); // Replace with your contract's ABI
const contractABI = abi
const contractAddress = '0x8F8C6D79E51c3059c76053e21d227be948881D8A'; // Replace with your contract's address

// Connect to the Ethereum network using web3.js
const web3 = new Web3('https://polygon-rpc.com/'); // Replace with your Ethereum node URL


const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

async function getUserCount() {
  try {
    const count = await contractInstance.methods.getUserCount().call();
    console.log('User Count:', count);
  } catch (error) {
    console.error('Error:', error);
  }
}

getUserCount();
