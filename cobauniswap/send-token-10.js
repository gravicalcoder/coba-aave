const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today"));
const Tx = require("ethereumjs-tx").Transaction;

const contractAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const contractABI = [{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const fromAddress = "0x48C6079A8D9DF863eC98a65199Ae8224CadabA70";
const privateKey = "0x94bf4693d19e8fc7e80fbd66731591bb6fc70f55c5827d18a9097d6a6749d7e2";
const toAddress = "0x65EcEe68791340340Aef4F0ee8144bE7097CbB47";
const gasLimit = 28000;

async function sendLINKToken() {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const nonce = await web3.eth.getTransactionCount(fromAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const value = web3.utils.toWei("1.7", "ether");
  const data = contract.methods.transferFrom(fromAddress, toAddress, value).encodeABI();

  const rawTx = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: contractAddress,
    value: "0x0",
    data: data
  };

  const tx = new Tx(rawTx);
  tx.sign(privateKey);
  const serializedTx = tx.serialize();

  web3.eth.sendSignedTransaction("0x" + serializedTx.toString("hex"))
    .on("receipt", (receipt) => {
      console.log("Transaction confirmed with transaction hash: ", receipt.transactionHash);
    })
    .on("error", (error) => {
      console.log("Error sending transaction: ", error);
    });
}

sendLINKToken();
