// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../IFlashLoanReceiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TestReceiverERC20 is IFlashLoanReceiver{
    address token;

    constructor(address _token) {
        token = _token;
    }

    function execute(uint256 fee) public payable {
        uint256 amount = IERC20(token).allowance(msg.sender, address(this));
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        IERC20(token).approve(msg.sender, amount + fee);
    }

    receive() external payable {}
}