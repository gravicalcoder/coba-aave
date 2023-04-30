const Web3 = require('web3');


const contractAddress = '0x282229459dDa360cAFb2C0b691B491140C56C404';
const abi = require('./abi-UserInfo.js');



const web3 = new Web3('https://polygon-rpc.com/');
const contract = new web3.eth.Contract(abi, contractAddress);

require('dotenv').config()
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

async function mana(){

const gasPrice = await web3.eth.getGasPrice();

/*
contract.methods.getUser().call({
    from: WALLET_ADDRESS, // your account address
    gasPrice: gasPrice, // gas price in wei
    gas: 4880000 // gas limit
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

}
*/

const name = 'John thor';
const age = 31;
const sex = '3 times a day';
const phoneNumber = 023321223456543;
const city = 'sekeloa';
//const almamater = 'Harvard';  // karena kontraknya belum update



const privateKey = WALLET_SECRET; // your private key

const contract = new web3.eth.Contract(abi, contractAddress); // create a new contract instance

const account = web3.eth.accounts.privateKeyToAccount(privateKey); // create a new account instance from the private key
const nonce = await web3.eth.getTransactionCount(WALLET_ADDRESS);

const txData = await contract.methods.setUser(name, age, sex, phoneNumber, city).encodeABI() // encode the function call with the arguments

  const txParams = {
    nonce: nonce,
    from: WALLET_ADDRESS, // your account address
    to: contractAddress, // the contract address
    gasPrice: gasPrice, // gas price in wei
    gas: 500000, // gas limit
    data: txData
  };

  const signedTx = await account.signTransaction(txParams); // sign the transaction with your private key

  web3.eth.sendSignedTransaction(signedTx.rawTransaction) // send the signed transaction
    .then((receipt) => {
      console.log(receipt);
    })
    .catch((error) => {
      console.error(error);
    });
}


mana()