const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today"));
const EthereumTx = require('ethereumjs-tx').Transaction;

const senderAddress = '0x48C6079A8D9DF863eC98a65199Ae8224CadabA70';
const privateKey = Buffer.from('94bf4693d19e8fc7e80fbd66731591bb6fc70f55c5827d18a9097d6a6749d7e2', 'hex');
const receiverAddress = '0x65EcEe68791340340Aef4F0ee8144bE7097CbB47';
const contractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}];
const linkTokenContract = new web3.eth.Contract(contractABI, contractAddress);
const amountLinkToken = web3.utils.toWei('0.111', 'ether');

async function sendLinkToken() {
  const nonce = await web3.eth.getTransactionCount(senderAddress);
  const gasPrice = await web3.eth.getGasPrice();

  const txData = linkTokenContract.methods.transfer(receiverAddress, amountLinkToken).encodeABI();

  const tx = new EthereumTx({
    nonce: web3.utils.toHex(nonce),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(21000),
    to: contractAddress,
    value: '0x0',
    data: txData
  });

  tx.sign(privateKey);

  const serializedTx = tx.serialize();
  const rawTx = '0x' + serializedTx.toString('hex');

  const transaction = await web3.eth.sendSignedTransaction(rawTx);
  console.log(transaction.transactionHash);
}

sendLinkToken();
