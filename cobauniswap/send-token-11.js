const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today"));

const contractAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const contractABI = [
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

const fromAddress = "0x48C6079A8D9DF863eC98a65199Ae8224CadabA70";
const privateKey = "0x94bf4693d19e8fc7e80fbd66731591bb6fc70f55c5827d18a9097d6a6749d7e2";
const toAddress = "0x65EcEe68791340340Aef4F0ee8144bE7097CbB47";

async function sendTransaction() {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const gasLimit = "28000";
  const gasPrice = await web3.eth.getGasPrice();
  const nonce = await web3.eth.getTransactionCount(fromAddress);
  const value = web3.utils.toWei("1.7", "ether");
  const transferFromData = contract.methods.transferFrom(fromAddress, toAddress, value).encodeABI();

  const rawTransaction = {
    nonce: web3.utils.toHex(nonce),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: contractAddress,
    //value: "0x0",
    value :"30000",
    data: transferFromData
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  console.log("Transaction receipt: ", transactionReceipt);
}

sendTransaction();
