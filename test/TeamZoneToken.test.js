const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TeamZoneCoin", function () {
  let Token, token, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    Token = await ethers.getContractFactory("TeamZoneCoin");
    token = await Token.deploy(ethers.parseUnits("1000000", 18)); // 1M initial supply
    await token.waitForDeployment();
  });

  it("Should assign the total supply to the owner", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  it("Owner should be able to mint new tokens", async function () {
    await token.mint(addr1.address, ethers.parseUnits("1000", 18));
    expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseUnits("1000", 18));
  });

  it("Non-owner should not be able to mint", async function () {
    await expect(
      token.connect(addr1).mint(addr1.address, ethers.parseUnits("1000", 18))
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
