// Import the required dependencies
const Web3 = require('web3');

const abi = require('./abi-multiUser.js');
//const abi = require('./abi-userStorage.js'); // Replace with your contract's ABI
//const contractAddress = '0x8F8C6D79E51c3059c76053e21d227be948881D8A'; // Replace with your contract's address
const contractAddress = '0x68D851606726406005B8125710e0524532D89895'; // yang bisa akses hanya yang nyimpen

// Connect to the Ethereum network using web3.js
const web3 = new Web3('https://polygon-rpc.com/'); // Replace with your Ethereum node URL

// Create an instance of the contract
const contractInstance = new web3.eth.Contract(abi, contractAddress);


require('dotenv').config()
const accountAddress = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

async function getUserData(index) {
    const userData = await contractInstance.methods.getUserData(index).call({ from: accountAddress });
    console.log('Name:', userData[0]);
    console.log('Age:', userData[1]);
    console.log('Phone Number:', userData[2]);
    console.log('Home Address:', userData[3]);
    console.log('ERC-20 Address:', userData[4]);
}

// Usage example: call getUserData function for index 0
//getUserData(0);

getUserData(2);