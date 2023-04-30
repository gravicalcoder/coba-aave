const Web3 = require('web3');

// Connect to an Ethereum node using Web3.js
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));

// Address to track transactions for
require('dotenv').config();
const WALLET_SECRET = process.env.WALLET_SECRET;
const WALLET_RESERVE_SECRET = process.env.WALLET_SECRET2;
const RESERVE_ADDRESS = process.env.WALLET_ADDRESS2;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS; // fixed typo
const address = '0x123456789abcdef';

// Retrieve all the past transactions involving the specified address
web3.eth.getPastLogs({
    fromBlock: 0,
    toBlock: 'latest',
    address: WALLET_ADDRESS,
    topics: [web3.utils.sha3('Transfer(address,address,uint256)')]
}, function(error, events){
    console.log(events);
});
