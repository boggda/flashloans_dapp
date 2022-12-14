const hre = require("hardhat");

async function main() {
    MONTHLY_REWARD = "1";
    FLASH_LOAN_FEE = "50";

    const FL = await hre.ethers.getContractFactory("FlashLoans");
    const flash_loans = await FL.deploy(MONTHLY_REWARD, FLASH_LOAN_FEE);

    await flash_loans.deployed();
    console.log(
        `FlashLoans deployed to ${flash_loans.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
