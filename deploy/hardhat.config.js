require("@nomicfoundation/hardhat-toolbox");
//require("@nomicfoundation/hardhat-verify");

/** @type import('hardhat/config').HardhatUserConfig */

/*
module.exports = {
  solidity: "0.8.18",
};
*/

require('dotenv').config();

//const { projectId, privateKey } = require('./secrets.json');

const senderAddress = process.env.WALLET_ADDRESS;
const privateKey = process.env.WALLET_SECRET;

module.exports = {
  networks: {
    polygon: {
      url: `https://polygon-rpc.com`, // Ganti dengan URL RPC jaringan Polygon yang sesuai
      accounts:[privateKey] ,
      gas: 280000000000, // Gas limit yang dapat disesuaikan sesuai kebutuhan Anda   // bisa di deploy ke matic sejumlah 0.0028 Ether
      gasPrice: 250000000000, // Harga gas dalam wei (opsional)
    },
  },
  solidity: {
    version: '0.8.0', // Versi Solidity yang digunakan dalam proyek Anda
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

//  di tulisannya : Lock with 0.001ETH and unlock timestamp 1685171607 deployed to 0xBaEeC2aBa85078fe35F3Fb787b6A99B884480cC8
// keyataanya matic yang kepake sebanyak 0.5 buat gas fee//

// seetingan fee terakhir = 280000000000  dan gas price = 250000000000