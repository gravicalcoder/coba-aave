const Web3 = require('web3');

const abi = require('./abi-userStorage.js'); // Replace with your contract's ABI
const contractABI = abi;

require('dotenv').config()
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET


const contractAddress ='0x8F8C6D79E51c3059c76053e21d227be948881D8A';
const privateKey =  WALLET_SECRET ;

const web3 = new Web3('https://polygon-rpc.com/');

const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

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

setUserData('Jordan Peterson', 539, '+1234909090', '1723 old school bunker', '0xd5FEc352b7A0A4e4B5a7Ea797E63d12870EF401e');
