const Web3 = require('web3');
const abi = require('./abi-check-balance.js');

class MyWeb3 {
  constructor() {
    const provider = 'https://polygon-rpc.com/';
    this.web3 = new Web3(provider);
    require('dotenv').config();
    this.WALLET_SECRET = process.env.WALLET_SECRET;
    this.WALLET_RESERVE_SECRET = process.env.WALLET_SECRET2;
    this.RESERVE_ADDRESS = process.env.WALLET_ADDRESS2;
    this.USDCAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
    this.contract = new this.web3.eth.Contract(abi, this.USDCAddress);
    this.address = this.web3.eth.accounts.privateKeyToAccount(this.WALLET_SECRET).address;
  }

  async getBalance() {
    const res = await this.contract.methods.balanceOf(this.address).call();
    let a = res;
    a = a.toString();
    a = a.substring(0, a.length - 6) + "." + a.substring(1, a.length );
    return a;
  }

  async getEthBalance() {
    const balance = await this.web3.eth.getBalance(this.address);
    return this.web3.utils.fromWei(balance, 'ether');
  }

  async getReserveBalance() {
    const balance = await this.web3.eth.getBalance(this.RESERVE_ADDRESS);
    return this.web3.utils.fromWei(balance, 'ether');
  }
}

module.exports = MyWeb3;
