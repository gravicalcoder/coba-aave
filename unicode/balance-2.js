const Web3 = require('web3');

const abi = require('./abi-USDC.js');
const provider = 'https://polygon-rpc.com/';

const web3 = new Web3(provider);
require('dotenv').config()
const WALLET_SECRET = process.env.WALLET_SECRET

const USDCAddress ='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'   // USDC polygon



const contract = new web3.eth.Contract(abi, USDCAddress);

const address = web3.eth.accounts.privateKeyToAccount(WALLET_SECRET).address;

web3.eth.getBalance(address, function(error, balance) {
  if (!error) {
    console.log('Balance:', web3.utils.fromWei(balance, 'ether'));
    getBalance();
  } else {
    console.log(error);
  }
});

const getBalance = async () => {
  const res = await contract.methods.balanceOf(address).call();
  //const format = web3.utils.fromWei(res);
  //console.log("saldo USDC ="+format);
  console.log("saldo USDC tanpa koma="+res);
  let a = res;
  a = a.toString();
  
    a = a.substring(0, a.length - 6) + "." + a.substring(1, a.length );
  
  
  console.log("saldo USDC dengan koma ="+a);
  
}