const hre = require("hardhat");

async function main() {
    monthly_reward = 1;

    const LP = await hre.ethers.getContractFactory("LiquidityPool");
    const liquidity_pool = await LP.deploy(monthly_reward);

    await liquidity_pool.deployed();

    console.log(
        `LiquidityPool deployed to ${liquidity_pool.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
