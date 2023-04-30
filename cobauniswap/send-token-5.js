const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.matic.today'));

const privateKey = Buffer.from('0x94bf4693d19e8fc7e80fbd66731591bb6fc70f55c5827d18a9097d6a6749d7e2', 'hex');
const contractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
const abi = [{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const fromAddress = '0x48C6079A8D9DF863eC98a65199Ae8224CadabA70';
const toAddress = '0x65EcEe68791340340Aef4F0ee8144bE7097CbB47';

const contract = new web3.eth.Contract(abi, contractAddress);
const transferAmount = web3.utils.toWei('1.7', 'ether');

contract.methods.transferFrom(fromAddress, toAddress, transferAmount).estimateGas({from: fromAddress}, (error, gasAmount) => {
  if (error) {
    console.error(error);
  } else {
    const rawTransaction = {
      from: fromAddress,
      to: contractAddress,
      value: '0x0',
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
      gasLimit: web3.utils.toHex(gasAmount),
      data: contract.methods.transferFrom(fromAddress, toAddress, transferAmount).encodeABI(),
      nonce: web3.utils.toHex(web3.eth.getTransactionCount(fromAddress)),
    };

    const transaction = new Tx(rawTransaction, {chain: 'ropsten'});
    transaction.sign(privateKey);
    const serializedTransaction = transaction.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'), (sendError, hash) => {
      if (sendError) {
        console.error(sendError);
      } else {
        console.log('Transaction hash:', hash);
      }
    });
  }
});
