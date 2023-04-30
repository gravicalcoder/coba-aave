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

contract.methods.getUser().call({
    from: WALLET_ADDRESS, // your account address
    gasPrice: gasPrice, // gas price in wei
    gas: 4880000 // gas limit
  })
  .then((result) => {

    let str = JSON.stringify(result)
    let data = JSON.parse(str)
    console.log(data['0'] );
    console.log('berusia =>'+ data['1'] );
  })
  .catch((error) => {
    console.error(error);
  });

}

mana()
  