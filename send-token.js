const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today"));

const privateKey = "0x94bf4693d19e8fc7e80fbd66731591bb6fc70f55c5827d18a9097d6a6749d7e2";
const fromAddress = "0x48C6079A8D9DF863eC98a65199Ae8224CadabA70";
const toAddress = "0x65EcEe68791340340Aef4F0ee8144bE7097CbB47";
const amount = "0.1";

const rawTransaction = {
    "from": fromAddress,
    "to": toAddress,
    "value": web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
    "gasPrice": web3.utils.toHex(20 * 1e9),
    "gasLimit": web3.utils.toHex(210000),
    "chainId": web3.utils.toHex(137)
};

web3.eth.accounts.signTransaction(rawTransaction, privateKey)
    .then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
    .then(receipt => console.log("Transaction receipt: ", receipt))
    .catch(err => console.error(err));
