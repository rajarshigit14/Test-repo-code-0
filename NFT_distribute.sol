// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import the ERC-721 interface and necessary libraries
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Inherit from ERC721 and Ownable
contract NFT_distribute is ERC721, Ownable {
    uint256 public nextTokenId;

    // Mapping to keep track of whether a user has received an NFT
    mapping(address => bool) public hasReceivedNFT;

    /*constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {

        nextTokenId = 1;
    }*/
    constructor() ERC721("NFT", "nft") {
        nextTokenId=1;
    }

    


    // Function to mint an NFT and distribute to a user
    function distributeNFT(address recipient) external onlyOwner {
        require(!hasReceivedNFT[recipient], "User has already received an NFT");
        
        // Mint the NFT
        _mint(recipient, nextTokenId);
        nextTokenId++;

        // Mark the user as having received an NFT
        hasReceivedNFT[recipient] = true;
    }
}
