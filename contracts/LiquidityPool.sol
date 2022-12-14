// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LiquidityPool is ReentrancyGuard {

    struct stacker {
        uint256 balance;
        uint256 timestamp;
    }

    mapping (address => stacker) balances;
    mapping (address => mapping(address => stacker)) tokenBalances;
    uint256 public reward;

    constructor(uint256 _reward) {
        reward = _reward;
    }

    function calcReward(uint256 _balance, uint256 _timestamp, uint256 _now, uint256 _reward) public pure returns(uint256) {
        uint256 months_passed = (_now - _timestamp) / (30 days);
        return (_balance * (100 + _reward) ** months_passed) / 100 ** months_passed - _balance;
    }

    function deposit() external nonReentrant payable {
        balances[msg.sender].balance += msg.value;
        balances[msg.sender].timestamp = block.timestamp;
    }

    function deposit(address _token, uint256 amount) external nonReentrant {
        tokenBalances[_token][msg.sender].balance += amount;
        tokenBalances[_token][msg.sender].timestamp = block.timestamp;
        IERC20(_token).transferFrom(msg.sender, address(this), amount);
    }

    function withdraw() external nonReentrant {
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
}