const Web3 = require('web3');
const eth = require('eth-lib');
//const maticWeb3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mainnet.matic.today"));
const maticWeb3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today"));

// Replace with the ABI of your LINK token contract in Matic Network
//const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]


//const abi = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const abi = [{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

// Replace with the address of your LINK token contract in Matic Network
const contractAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

// Create a contract object
const linkContract = new maticWeb3.eth.Contract(abi, contractAddress);

// Replace with the address of the sender
const senderAddress = "0x48C6079A8D9DF863eC98a65199Ae8224CadabA70";

// Replace with the address of the recipient
const recipientAddress = "0x65EcEe68791340340Aef4F0ee8144bE7097CbB47";

// Replace with the amount of LINK tokens to send
const amount = "230000000000000000"; // 0.23 LINK

// Replace with the private key of the sender
const privateKey = "0x94bf4693d19e8fc7e80fbd66731591bb6fc70f55c5827d18a9097d6a6749d7e2";


// Call the transferFrom method
maticWeb3.eth.getTransactionCount(senderAddress)
.then((nonce) => {
    // Build the transaction object
    const tx = {
        nonce: maticWeb3.utils.toHex(nonce),
        gasPrice: maticWeb3.utils.toHex(20000000000), // 20 Gwei
        gasLimit: 23000,
        to: contractAddress, // The address of the contract to call
        value: 0, // The amount of Ether to send (in wei)
        data: linkContract.methods.transferFrom(senderAddress, recipientAddress, amount).encodeABI() // The ABI-encoded method call
    };

    // Sign the transaction
    /*
    const signedTx = new ethJs.Tx(tx, { chain: 'Polygon Mumbai Testnet' });
    signedTx.sign(Buffer.from(privateKey.substring(2), 'hex'));
*/
/*
const tx = {
    to: contractAddress,
    data: linkContract.methods.transferFrom(senderAddress, recipientAddress, amount).encodeABI(),
    //gas: gas,
    gas: gas,
    gasPrice: maticWeb3.utils.toWei("20000", "gwei"),
    chainId: 80001
};
*/
const signedTx =  maticWeb3.eth.accounts.signTransaction(tx, privateKey);

    // Send the signed transaction
    maticWeb3.eth.sendSignedTransaction('0x' + signedTx.rawTransaction)
    .on('receipt', (receipt) => {
        console.log('Transaction receipt: ', receipt);
    })
    .on('error', (error) => {
        console.error(error);
    });


})
