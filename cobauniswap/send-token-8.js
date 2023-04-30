const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.matic.today'));
const abi = [{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const contractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
const fromAddress = '0x48C6079A8D9DF863eC98a65199Ae8224CadabA70';
const privateKey = '0x94bf4693d19e8fc7e80fbd66731591bb6fc70f55c5827d18a9097d6a6749d7e2';
const toAddress = '0x65EcEe68791340340Aef4F0ee8144bE7097CbB47';
const amount = web3.utils.toWei('1.7', 'ether');
const gasLimit = 28000;

const contract = new web3.eth.Contract(abi, contractAddress);
const functionData = contract.methods.transferFrom(fromAddress, toAddress, amount).encodeABI();

web3.eth.getTransactionCount(fromAddress).then((nonce) => {
  const rawTransaction = {
    from: fromAddress,
    to: contractAddress,
    nonce: nonce,
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    gasLimit: web3.utils.toHex(gasLimit),
    data: functionData
  };

  const tx = new EthJS.Tx(rawTransaction);
  tx.sign(privateKey);

  const serializedTx = tx.serialize();
  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .on('transactionHash', (hash) => {
      console.log('Transaction hash: ', hash);
    })
    .on('receipt', (receipt) => {
      console.log('Transaction receipt: ', receipt);
    })
    .on('error', (error) => {
      console.error('Transaction error: ', error);
    });
});
