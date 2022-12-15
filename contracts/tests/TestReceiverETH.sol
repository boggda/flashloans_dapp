// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../IFlashLoanReceiver.sol";
import "../FlashLoans.sol";

contract TestReceiverETH is IFlashLoanReceiver{
    function execute(uint256 fee) external payable {
        payable(msg.sender).transfer(msg.value + fee);
    }

    receive() external payable {}
}