const Web3 = require('web3');
//const web3 = new Web3('https://mainnet.infura.io/v3/your-infura-project-id');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"))

const fs = require('fs');


const solc = require('solc');
const input = {
    language: 'Solidity',
    sources: {
        'UserInfo.sol': {
            content: fs.readFileSync('UserInfo.sol', 'utf8')
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

/*
const output = JSON.parse(solc.compile(JSON.stringify(input)));
const abi = output.contracts['UserInfo.sol']['UserInfo'].abi;
const bytecode = output.contracts['UserInfo.sol']['UserInfo'].evm.bytecode.object;
*/

const output = solc.compile(JSON.stringify(input));
//const abi = JSON.parse(output).contracts['UserInfo.sol']['UserInfo'].abi;
//const abi = output.contracts['UserInfo.sol']['UserInfo'].abi;
const abi = output.contracts['UserInfo.sol'].abi;
//const bytecode = JSON.parse(output).contracts['UserInfo.sol']['UserInfo'].evm.bytecode.object;
//const bytecode = output.contracts['UserInfo.sol']['UserInfo'].evm.bytecode.object;
const bytecode = output.contracts['UserInfo.sol'].evm.bytecode.object;

require('dotenv').config()
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

async function ayoDeploy(){
    const contract = new web3.eth.Contract(abi);
    const deployTx = contract.deploy({ data: bytecode });
    //const deployReceipt = await deployTx.send({ from: 'your-account-address', gas: 1500000 });
    //const contractAddress = deployReceipt.contractAddress;


    //const contract = new web3.eth.Contract(abi);
    //const deployTx = contract.deploy({ data: bytecode });
    const encodedTx = deployTx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(WALLET_ADDRESS);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 1500000;

    const txObject = {
        nonce: web3.utils.toHex(nonce),
        gasLimit: web3.utils.toHex(gasLimit),
        gasPrice: web3.utils.toHex(gasPrice),
        data: encodedTx,
        from: WALLET_ADDRESS,
        chainId: 1337 // or the appropriate chain ID for the network you're using
    };

    const signedTx = await web3.eth.accounts.signTransaction(txObject, WALLET_SECRET);
    const sentTx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    const contractAddress = sentTx.contractAddress;


}

//ayoDeploy()
