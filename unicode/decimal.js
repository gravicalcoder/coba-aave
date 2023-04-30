const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));

const address1 = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'   // USDC polygon

const tokenAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_proxyTo",
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
          "indexed": false,
          "internalType": "address",
          "name": "_new",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_old",
          "type": "address"
        }
      ],
      "name": "ProxyOwnerUpdate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_new",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_old",
          "type": "address"
        }
      ],
      "name": "ProxyUpdated",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [],
      "name": "IMPLEMENTATION_SLOT",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "OWNER_SLOT",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "implementation",
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
      "name": "proxyOwner",
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
      "name": "proxyType",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "proxyTypeId",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
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
      "name": "transferProxyOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newProxyTo",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "updateAndCall",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newProxyTo",
          "type": "address"
        }
      ],
      "name": "updateImplementation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]

const getTokenDecimals = async (address: string) => {
    const tokenContract = await new web3.eth.Contract(tokenAbi, address1);
    let decimals = await tokenContract.methods.decimals().call();
    return decimals;
  };
  
  
  //let decimals = await getTokenDecimals('0xeae2bbbc0000f605bd37a02c7fe346a3b68b03eb')

  let decimals = await getTokenDecimals('0xD065833450C9AB16C35BEe9377593800628fC29A')


  console.log('isi desimal ='+decimals)