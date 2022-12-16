const hre = require("hardhat");

async function main() {
    MONTHLY_REWARD = "1";
    FLASH_LOAN_FEE = "50";
    [deployer] = await ethers.getSigners();

    const TT = await hre.ethers.getContractFactory("TestToken", deployer);
    this.test_token = await TT.deploy();

    await this.test_token.deployed();
    console.log(
        `TestToken deployed to ${test_token.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
