// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IFlashLoanReceiver.sol";

contract FlashLoans is ReentrancyGuard {

    struct stacker {
        uint256 balance;
        uint256 timestamp;
    }

    mapping (address => stacker) balances;
    mapping (address => mapping(address => stacker)) tokenBalances;
    uint256 public reward;
    uint256 public flashLoanFee;

    constructor(uint256 _reward, uint256 _flashLoanFee) {
        reward = _reward;
        flashLoanFee = _flashLoanFee;
    }

    function calcReward(uint256 _balance, uint256 _timestamp, uint256 _now, uint256 _reward) public pure returns(uint256) {
        uint256 months_passed = (_now - _timestamp) / (30 days);
        return (_balance * (100 + _reward) ** months_passed) / 100 ** months_passed - _balance;
    }

    function calcFee(uint256 amount, uint256 _flashLoanFee) public pure returns(uint256) {
        return amount * _flashLoanFee / 10000;
    }

    function deposit() external nonReentrant payable {
        require(balances[msg.sender].balance == 0, "You already deposit ether");
        balances[msg.sender].balance += msg.value;
        balances[msg.sender].timestamp = block.timestamp;
    }

    function deposit(address _token, uint256 amount) external nonReentrant {
        require(tokenBalances[_token][msg.sender].balance == 0, "You already deposit this token");
        tokenBalances[_token][msg.sender].balance += amount;
        tokenBalances[_token][msg.sender].timestamp = block.timestamp;
        IERC20(_token).transferFrom(msg.sender, address(this), amount);
    }

    function withdraw() external nonReentrant {
        require(balances[msg.sender].balance != 0, "Nothing to withdraw");
        uint256 amountToWithdraw = balances[msg.sender].balance 
            + calcReward(
                balances[msg.sender].balance,
                balances[msg.sender].timestamp,
                block.timestamp,
                reward
            );
        balances[msg.sender].balance = 0;
        (bool sent, ) = payable(msg.sender).call{value: amountToWithdraw}("");
        require(sent, "Failed to withdraw");
    }

    function withdraw(address _token) external nonReentrant {
        require(tokenBalances[_token][msg.sender].balance != 0, "Nothing to withdraw");
        uint256 amountToWithdraw = tokenBalances[_token][msg.sender].balance
        + calcReward(
                tokenBalances[_token][msg.sender].balance,
                tokenBalances[_token][msg.sender].timestamp,
                block.timestamp,
                reward
            );
        tokenBalances[_token][msg.sender].balance = 0;
        IERC20(_token).transfer(msg.sender, amountToWithdraw);
    }

    function flashLoan(uint256 amount, address _flashLoanReceiver) external nonReentrant payable {
        require(balances[_flashLoanReceiver].balance == 0, "You can't take a flash loan if you've already staked eth");
        uint256 balanceBefore = address(this).balance;
        require(amount <= balanceBefore, "Not enough eth in the contract");
        uint256 fee = calcFee(amount, flashLoanFee); 
        IFlashLoanReceiver(_flashLoanReceiver).execute{value: amount}(fee);
        uint256 balanceAfter = address(this).balance;
        //require(balanceAfter >= balanceBefore + fee, "Flash loan hasn't been paid back");
    }

    function flashLoan(uint256 amount, address _token, address _flashLoanReceiver) external nonReentrant payable {
        require(
            tokenBalances[_token][_flashLoanReceiver].balance == 0, 
            "You can't take a flash loan if you've already staked this token"
        );
        require(
            IERC20(_token).balanceOf(address(this)) >= amount, 
            "Not enough tokens on the balance of the contract"
        );
        uint256 fee = calcFee(amount, flashLoanFee);
        IERC20(_token).transfer(_flashLoanReceiver, amount);
        IFlashLoanReceiver(_flashLoanReceiver).execute(fee);
        require(
            IERC20(_token).allowance(_flashLoanReceiver, address(this)) == amount + fee,
            "Repay not approved"
        );
        IERC20(_token).transferFrom(_flashLoanReceiver, address(this), amount + fee);
    }

    fallback() external payable {}
    receive() external payable {}
}