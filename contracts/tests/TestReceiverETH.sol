// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../IFlashLoanReceiver.sol";
import "../FlashLoans.sol";

contract TestReceiverETH is IFlashLoanReceiver{
    function execute() external payable {
        payable(msg.sender).transfer(msg.value);
    }

    receive() external payable {}
}