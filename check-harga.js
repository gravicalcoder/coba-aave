const Web3 = require("web3") // 
const web3 = new Web3("https://rpc-mainnet.maticvigil.com") // matic

const aggregatorV3InterfaceABI = require('./abi-harga-MATIC.js');

const addr = "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0"  //matic / usd polygon


const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr)
priceFeed.methods
  .latestRoundData()
  .call()
  .then((roundData) => {
    // Do something with roundData
    console.log("Latest Round Data", roundData)
    console.log("harga 1 matic = ", roundData.answer, 'dalam dolar dengan 8 digit dibelakang koma')
  })
