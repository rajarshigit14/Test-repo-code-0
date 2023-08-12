require("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/NFT_distribute.sol/NFT_distribute.json");

//console.log(JSON.stringify(contract.abi));

const contractAddress = "0x9c16a9c02268c7DEaC9784AAAead67659cf9C637";
const nftContract = new web3.eth.Contract(contract.abi,contractAddress);

//TRANSACTION

async function distributeNFT(tokenURI){
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY,"latest");//create transaction

    const tx={
        'from':PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 5000000,
        'data':nftContract.methods.distributeNFT(PUBLIC_KEY/*,tokenURI*/).encodeABI(),
    };
    
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise.then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log("The hash of your transaction is: ",hash,"\nCheck Alchemy's Mempool to view the status of your transaction!");
          } 
          else {
            console.log(
              "Something went wrong when submitting your transaction:",err);
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}
distributeNFT("https://gateway.pinata.cloud/ipfs/QmPxX14v88L9XtMVP3UX6uksPQFiZoSWLH8TSXw6EWHGxt")

export const distributeNFT = async () => {
  const message = await NFT_distribute.methods.message().call();
  return message;
};

//transaction hash:0xbf0f73513382ab5340722e675041676d908f02bea9d9b759e61fc1f69e236007