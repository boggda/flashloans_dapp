# Flash Loan DAPP

https://young-dawn-5861.on.fleek.co/
https://ipfs.fleek.co/ipfs/QmXcSeqoJ1ZuGdSnTFusFUKgvabauH1qdc485Jtcg3DCqE/

This is a simple decentralized application that allows you to issue instant loans in ether or in some ERC20 tokens. To provide liquidity, this application allows users to stake their ethers or tokens and get rewarded for keeping the funds on the contract.

## Technology stack

* Solidity
* Hardhat - developmnet, testing
* ReactJS - frontend
* fleek - deployment on IPFS

## How to use

### Build
```
yarn --ignore-engines
yarn build --ignore-engines
```

### Run
```
npm start
```

### Tests
```
npx hardhat test
```

### Deploy Scripts
```
npx hardhat run --network goerli scripts/deploy.js
```

### Ether FlashLoan

In order to receive a flash loan in ether, the borrower must deploy a contract with a specific structure - this contract must implement the IFlashLoanReceiver interface.

There is an example of such contract:
```solidity=
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IFlashLoanReceiver {
    function execute(uint256 fee) external payable;
}

contract TestReceiverETH is IFlashLoanReceiver{
    function execute(uint256 fee) public payable {
        //do something
        payable(msg.sender).transfer(msg.value + fee);
    }

    receive() external payable {}
}
```

### Tokens FlashLoan

An example of a borrower's contract for a flash loan in some tokens:
```solidity=
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IFlashLoanReceiver {
    function execute(uint256 fee) external payable;
}


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
```
