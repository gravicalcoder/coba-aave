const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today"));
const Tx = require("ethereumjs-tx").Transaction;

const contractAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const abi = [
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const fromAddress = "0x48C6079A8D9DF863eC98a65199Ae8224CadabA70";
const toAddress = "0x65EcEe68791340340Aef4F0ee8144bE7097CbB47";
const privateKey = Buffer.from(
  "0x94bf4693d19e8fc7e80fbd66731591bb6fc70f55c5827d18a9097d6a6749d7e2",
  "hex"
);
const value = web3.utils.toWei("1.7", "ether");
const gasLimit = "28000";

const contract = new web3.eth.Contract(abi, contractAddress);
contract.methods
  .transferFrom(fromAddress, toAddress, value)
  .send({ from: fromAddress, gas: gasLimit }, (error, transactionHash) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Transaction hash: ${transactionHash}`);
    }
  });
