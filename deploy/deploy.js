const Web3 = require('web3');
const infuraProvider = 'https://mainnet.infura.io/v3/<PROJECT_ID>'; // Replace <PROJECT_ID> with your Infura project ID
//const web3 = new Web3(infuraProvider);
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"))


const fs = require('fs');
const solc = require('solc');  // pake  ==>  npm install --save solc@0.4.25

require('dotenv').config()
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

//const source = fs.readFileSync('<PATH_TO_YOUR_SOLIDITY_FILE>', 'utf8');
//const contractPath = path.join(__dirname, deploy , 'database.sol');
/*
const contractPath = path.join(__dirname, './database.sol');
const source = fs.readFileSync(contractPath, 'utf8');
*/
const source = fs.readFileSync('database.sol', 'utf8');

//const compiledCode = solc.compile(source, 1).contracts['<CONTRACT_NAME>'];
const compiledCode = solc.compile(source, 1).contracts['database.sol'];
const bytecode = compiledCode.bytecode;
const abi = JSON.parse(compiledCode.interface);


const MyContract = new web3.eth.Contract(abi);


const deployTransaction = MyContract.deploy({ data: bytecode });
const fromAddress = WALLET_ADDRESS
//const fromAddress = '<YOUR_ADDRESS>'; // Replace with your Ethereum address
//const gasPrice = web3.utils.toWei('<GAS_PRICE_IN_GWEI>', 'gwei'); // Replace with the gas price you want to use

async function ayoDeploy(){
    const gasPrice = await web3.eth.getGasPrice();
    //const gas = '<GAS_LIMIT>'; // Replace with the gas limit you want to use
    //const gas = 30000 ; 
    const gas = await web3.eth.estimateGas(); 
    const privateKey = Buffer.from(WALLET_SECRET, 'hex'); // Replace with your private key
    //const privateKey = WALLET_SECRET 

   // const nonce = await this.web3.eth.getTransactionCount(this.senderAddress);

    web3.eth.getTransactionCount(fromAddress).then((nonce) => {
    const signedTransaction = web3.eth.accounts.signTransaction(
        {
        from: fromAddress,
        nonce: nonce,
        gasPrice: gasPrice,
        gas: gas,
        data: deployTransaction.encodeABI(),
        },
        privateKey
    );

    web3.eth
     .sendSignedTransaction(signedTransaction.rawTransaction)
        .on('receipt', (receipt) => {
        console.log('Contract deployed at address', receipt.contractAddress);
        });
    });

}


ayoDeploy()
