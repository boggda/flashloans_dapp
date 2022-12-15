const { expect } = require("chai");
const hre = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("LiquidityPool", function () {
    let MONTHLY_REWARD, deployer, user1, user2;

    beforeEach(async function () {
        [deployer, user1, user2] = await ethers.getSigners();
        MONTHLY_REWARD = "1";
        FLASH_LOAN_FEE = "50";

        const FL = await hre.ethers.getContractFactory("FlashLoans", deployer);
        const TT = await hre.ethers.getContractFactory("TestToken", deployer);
        this.flash_loans = await FL.deploy(MONTHLY_REWARD, FLASH_LOAN_FEE);
        this.test_token = await TT.deploy();

        await this.test_token.deployed();
        await this.flash_loans.deployed();
    });

    it("Should set the right monthly reward", async function () {
        expect(await this.flash_loans.reward()).to.deep.equal(ethers.BigNumber.from(MONTHLY_REWARD));
    });

    it("Should deposit and withdraw ether", async function () {
        await this.flash_loans.connect(user1)["deposit()"]({value: ethers.utils.parseEther("1")});
        expect(await ethers.provider.getBalance(this.flash_loans.address)).to.deep.equal(ethers.utils.parseEther("1"));
        await this.flash_loans.connect(user1)["withdraw()"]();
        expect(await ethers.provider.getBalance(this.flash_loans.address)).to.deep.equal(ethers.utils.parseEther("0"));
    });

    it("Get eth reward for 1 month", async function () {
        const ONE_MONTH_IN_SECS = 30*24*60*60;
        console.log(await user1.getBalance());
        await this.flash_loans.connect(user1)["deposit()"]({value: ethers.utils.parseEther("1")});
        await this.flash_loans.connect(user2)["deposit()"]({value: ethers.utils.parseEther("1")});
        expect(await ethers.provider.getBalance(this.flash_loans.address)).to.deep.equal(ethers.utils.parseEther("2"));

        await time.increaseTo((await time.latest()) + ONE_MONTH_IN_SECS);

        expect(await this.flash_loans.connect(user1)["withdraw()"]()).to.changeEtherBalance(user1, ethers.utils.parseEther("1.01"));
        console.log(await user1.getBalance());
    });

    it("Get eth reward for 12 months", async function () {
        const TWELVE_MONTHS_IN_SECS = 10*30*24*60*60;
        console.log(await user1.getBalance());
        await this.flash_loans.connect(user1)["deposit()"]({value: ethers.utils.parseEther("1")});
        await this.flash_loans.connect(user2)["deposit()"]({value: ethers.utils.parseEther("1")});
        expect(await ethers.provider.getBalance(this.flash_loans.address)).to.deep.equal(ethers.utils.parseEther("2"));

        await time.increaseTo((await time.latest()) + TWELVE_MONTHS_IN_SECS);

        expect(await this.flash_loans.connect(user1)["withdraw()"]()).to.changeEtherBalance(user1, ethers.utils.parseEther("1.14"));
        console.log(await user1.getBalance());
    });

    it("Should deposit and withdraw ether", async function () {
        await this.test_token.connect(deployer).transfer(user1.address, "100000000000000000000")
        expect(await this.test_token.balanceOf(user1.address)).to.equal("100000000000000000000");
        await this.test_token.connect(user1).approve(this.flash_loans.address, "100000000000000000000");
        await this.flash_loans.connect(user1)["deposit(address,uint256)"](this.test_token.address, "100000000000000000000");
        expect(await this.test_token.balanceOf(user1.address)).to.equal("0");
        expect(await this.test_token.balanceOf(this.flash_loans.address)).to.equal("100000000000000000000");
        await this.flash_loans.connect(user1)["withdraw(address)"](this.test_token.address);
        expect(await this.test_token.balanceOf(this.flash_loans.address)).to.equal("0");
    });

    it("Get token reward for 1 month", async function () {
        const ONE_MONTH_IN_SECS = 30*24*60*60;
        await this.test_token.connect(deployer).transfer(user1.address, "100000000000000000000")
        expect(await this.test_token.balanceOf(user1.address)).to.equal("100000000000000000000");
        console.log(await this.test_token.balanceOf(user1.address));
        await this.test_token.connect(user1).approve(this.flash_loans.address, "100000000000000000000");
        await this.flash_loans.connect(user1)["deposit(address,uint256)"](this.test_token.address, "100000000000000000000");
        await this.test_token.connect(deployer).approve(this.flash_loans.address, "100000000000000000000");
        await this.flash_loans.connect(deployer)["deposit(address,uint256)"](this.test_token.address, "100000000000000000000");
        expect(await this.test_token.balanceOf(user1.address)).to.equal("0");
        expect(await this.test_token.balanceOf(this.flash_loans.address)).to.equal("200000000000000000000");

        await time.increaseTo((await time.latest()) + ONE_MONTH_IN_SECS);

        expect(await this.flash_loans.connect(user1)["withdraw(address)"](this.test_token.address)).to.changeTokenBalance(this.test_token, user1, "101000000000000000000");
        console.log(await this.test_token.balanceOf(user1.address));
    });

    it("Get token reward for 12 month", async function () {
        const TWELVE_MONTHS_IN_SECS = 10*30*24*60*60;
        await this.test_token.connect(deployer).transfer(user1.address, "100000000000000000000")
        expect(await this.test_token.balanceOf(user1.address)).to.equal("100000000000000000000");
        console.log(await this.test_token.balanceOf(user1.address));
        await this.test_token.connect(user1).approve(this.flash_loans.address, "100000000000000000000");
        await this.flash_loans.connect(user1)["deposit(address,uint256)"](this.test_token.address, "100000000000000000000");
        await this.test_token.connect(deployer).approve(this.flash_loans.address, "100000000000000000000");
        await this.flash_loans.connect(deployer)["deposit(address,uint256)"](this.test_token.address, "100000000000000000000");
        expect(await this.test_token.balanceOf(user1.address)).to.equal("0");
        expect(await this.test_token.balanceOf(this.flash_loans.address)).to.equal("200000000000000000000");

        await time.increaseTo((await time.latest()) + TWELVE_MONTHS_IN_SECS);

        expect(await this.flash_loans.connect(user1)["withdraw(address)"](this.test_token.address)).to.changeTokenBalance(this.test_token, user1, "110462212541120451001");
        console.log(await this.test_token.balanceOf(user1.address));
    });

    it("Flashloan test eth", async function () {
        const TRE = await hre.ethers.getContractFactory("TestReceiverETH", deployer);
        const receiver_eth = await TRE.deploy();
        await receiver_eth.deployed();
        await deployer.sendTransaction({
            to: receiver_eth.address,
            value: "500000000000000000"
        });
        expect(await ethers.provider.getBalance(receiver_eth.address)).to.equal("500000000000000000");
        await deployer.sendTransaction({
            to: this.flash_loans.address,
            value: "100000000000000000000"
        });
        expect(await ethers.provider.getBalance(this.flash_loans.address)).to.equal("100000000000000000000");
        await this.flash_loans.connect(user1)["flashLoan(uint256,address)"]("100000000000000000000", receiver_eth.address);
        expect(await ethers.provider.getBalance(this.flash_loans.address)).to.equal("100500000000000000000");
    });

    it("Flashloan test erc20", async function (){
        const TRT = await hre.ethers.getContractFactory("TestReceiverERC20", deployer);
        const receiver_erc20 = await TRT.deploy(this.test_token.address);
        await receiver_erc20.deployed();
        await this.test_token.connect(deployer).transfer(this.flash_loans.address, "100000000000000000000");
        expect(await this.test_token.balanceOf(this.flash_loans.address)).to.equal("100000000000000000000");
        await this.test_token.connect(deployer).transfer(receiver_erc20.address, "500000000000000000");
        expect(await this.test_token.balanceOf(receiver_erc20.address)).to.equal("500000000000000000");
        await this.flash_loans.connect(user1)["flashLoan(uint256,address,address)"]("100000000000000000000", this.test_token.address, receiver_erc20.address);
        expect(await this.test_token.balanceOf(this.flash_loans.address)).to.equal("100500000000000000000");
    });
});