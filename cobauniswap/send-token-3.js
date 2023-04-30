const Web3 = require('web3');
//const web3 = new Web3('https://mainnet.infura.io/v3/your-project-id');
const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today"));

const contractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
const abi = [{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const senderAddress = '0x48C6079A8D9DF863eC98a65199Ae8224CadabA70';
const privateKey = '0x94bf4693d19e8fc7e80fbd66731591bb6fc70f55c5827d18a9097d6a6749d7e2';
const receiverAddress = '0x65EcEe68791340340Aef4F0ee8144bE7097CbB47';

async function sendTokens() {
  const contract = new web3.eth.Contract(abi, contractAddress);
  const nonce = await web3.eth.getTransactionCount(senderAddress);

  const data = contract.methods.transferFrom(senderAddress, receiverAddress, '230000000000000').encodeABI();

  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 25000;

  const tx = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: contractAddress,
    value: '23000',
    data: data
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log(receipt);
}

sendTokens();
