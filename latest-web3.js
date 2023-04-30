/**
 * THIS IS EXAMPLE CODE THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS EXAMPLE CODE THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

const Web3 = require("web3") // for nodejs only
//const web3 = new Web3("https://rpc.ankr.com/eth_goerli")
const web3 = new Web3("https://rpc-mainnet.maticvigil.com") // matic

const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]


//const addr = "0xA39434A63A52E749F02807ae27335515BA4b07F7"  // btc / usd
//const addr = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e"  // eth /usd

//const addr = "0x0d79df66BE487753B02D015Fb622DED7f0E9798d"  // dai / usd

//const addr = "0xAb5c49580294Aff77670F839ea425f5b78ab3Ae7"  // usdc / usd

//const addr = "0xf9680d99d6c9589e2a93a78a04a279e509205945"  // eth /usd  polygon

//const addr ="0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6"  // btc/usd polygon

//const addr ="0xefb7e6be8356cCc6827799B6A7348eE674A80EaE"  // ETH/usd

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
