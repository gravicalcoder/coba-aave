const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));

const contractAddress = '0x1e4b7A6b903680eab0c5dAbcb8fD429cD2a9598c';

const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "weth",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "contract IPool",
          "name": "pool",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "interesRateMode",
          "type": "uint256"
        },
        {
          "internalType": "uint16",
          "name": "referralCode",
          "type": "uint16"
        }
      ],
      "name": "borrowETH",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "onBehalfOf",
          "type": "address"
        },
        {
          "internalType": "uint16",
          "name": "referralCode",
          "type": "uint16"
        }
      ],
      "name": "depositETH",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "emergencyEtherTransfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "emergencyTokenTransfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPool",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWETHAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rateMode",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "onBehalfOf",
          "type": "address"
        }
      ],
      "name": "repayETH",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "withdrawETH",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "permitV",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "permitR",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "permitS",
          "type": "bytes32"
        }
      ],
      "name": "withdrawETHWithPermit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]



const inputCOntract = '0x794a61358D6845594F94dc1DB02A252b5b4814aD';
const contract = new web3.eth.Contract(contractABI, contractAddress);
const senderAddress = '0xD065833450C9AB16C35BEe9377593800628fC29A';

require('dotenv').config()
const privateKey = process.env.WALLET_SECRET;

async function repay() {
  //const jumlahnya = await web3.utils.toWei('0.25', 'ether');
  const jumlahnya = await web3.utils.toWei('2', 'ether');
  //const jumlahnya = 1500000000000000000;
  //const jumlahnya = 1500000;
  // satu matic
  //const jumlahnya = 1000000000000000000
  const interesRateMode = 2;
  const referalCode = 0;
  //const amountToDeposit = '1000000000000000000';
  const nonce = await web3.eth.getTransactionCount(senderAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 4880000;

  const txData = await contract.methods.repayETH( inputCOntract, jumlahnya, interesRateMode, senderAddress ).encodeABI();
  const tx = {
    to: contractAddress,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    gas: 3000000,
    value: jumlahnya ,
    //value: '0',
    data: txData
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  console.log(receipt);
}

repay();