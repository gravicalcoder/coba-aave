const Web3 = require("web3");
const aggregatorV3InterfaceABI = require('./abi-harga-MATIC.js');

class PriceFeed {
  constructor() {
    this.web3 = new Web3("https://rpc-mainnet.maticvigil.com"); // matic
    this.addr = "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0"  //matic / usd polygon
    this.priceFeed = new this.web3.eth.Contract(aggregatorV3InterfaceABI, this.addr);
  }

  async getLatestRoundData() {
    const roundData = await this.priceFeed.methods.latestRoundData().call();
    return roundData;
  }
}

module.exports = PriceFeed;