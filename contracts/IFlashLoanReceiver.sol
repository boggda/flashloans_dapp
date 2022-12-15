// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IFlashLoanReceiver {
    function execute(uint256 fee) external payable;
}
