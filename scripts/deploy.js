const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const initialSupply = hre.ethers.parseUnits("1000000", 18); // 1,000,000 TZC

  const Token = await hre.ethers.getContractFactory("TeamZoneCoin");
  const token = await Token.deploy(initialSupply);

  await token.waitForDeployment();

  console.log("TeamZone Coin (TZC) deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
