//const { ethers, upgrades } = require("hardhat");

const hre = require("hardhat");

async function main() {

    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + 60;
  
    const lockedAmount = hre.ethers.utils.parseEther("0.01");
  // Compile contract
  const UserData = await hre.ethers.getContractFactory("UserData"); /// diisi nama kontrak di solidity file
  console.log("Compiling putter-getter contract...");
  


  // Deploy contract
  console.log("Deploying putter-getter contract...");
 // const userData = await hre.upgrades.deployProxy(UserData);
  //  const lock = await UserData.deploy(unlockTime, { value: lockedAmount }); /// jika ada nilai yang harus disetting dari awal
  const lock = await UserData.deploy();
  await lock.deployed();
  
  console.log("UserData contract deployed to:", lock.address);
}



/*
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  */

  // We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
