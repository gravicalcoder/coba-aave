const Web3 = require('web3');

const hre = require("hardhat");


async function getABi(){
const artifact = await hre.artifacts.readArtifact("UserData");


const abi = artifact.abi;

//console.log(abi)

const web3 = new Web3();

const encodedABI = abi.map((item) => {
  if (item.type === 'function') {
    const signature = web3.eth.abi.encodeFunctionSignature(item);
    return `${signature}${item.name}`;
  }
  return item;
});

console.log(encodedABI);

}


getABi()


