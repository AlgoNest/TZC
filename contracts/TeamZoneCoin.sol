// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title TeamZone Coin (TZC)
/// @notice ERC20 token for TeamZone ecosystem
contract TeamZoneCoin is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("TeamZone Coin", "TZC") {
        // Mint initial supply to contract deployer
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }

    /// @notice Mint new tokens (only owner can call)
    /// @param to Address to receive tokens
    /// @param amount Number of tokens to mint
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
