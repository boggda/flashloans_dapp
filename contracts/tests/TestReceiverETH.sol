// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../IFlashLoanReceiver.sol";

contract TestReceiverETH is IFlashLoanReceiver{
    function execute(uint256 fee) public payable {
        payable(msg.sender).transfer(msg.value + fee);
    }

    receive() external payable {}
}