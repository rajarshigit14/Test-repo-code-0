async function main() {
  const NFT_distribute = await ethers.getContractFactory("NFT_distribute");

  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await NFT_distribute.deploy();
  console.log("Contract deployed to address:", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  
  //Contract address:0x9c16a9c02268c7DEaC9784AAAead67659cf9C637