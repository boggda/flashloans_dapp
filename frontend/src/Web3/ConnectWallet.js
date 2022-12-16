import { ethers } from "ethers";
import CONTRACT_ABI from "../Config/FlashLoansABI.json";
import IERC20_ABI from "../Config/IERC20.json";
import {NETWORK_ID, CONTRACT_ADDRESS} from "../Config/config";

export async function _connectWallet() {
    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!_checkNetwork()) {
        return;
    }
    window.selectedAddress = selectedAddress;
    window.ethereum.on("accountsChanged", ([newAddress]) => {
        if (newAddress === undefined) {
            return this._resetState();
        }
        window.selectedAddress = newAddress;
    });
    window._provider = new ethers.providers.Web3Provider(window.ethereum);
    window.contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        window._provider.getSigner(0)
    );
}

async function _checkNetwork() {
    if (window.ethereum.networkVersion === NETWORK_ID) {
      return true;
    }
    return false;
}

export async function _depositEther(amount) {
    if (!window.selectedAddress) {
        return false;
    }
    await window.contract.connect(window._provider.getSigner(0))["deposit()"]({value: ethers.utils.parseEther(amount)});
    return true;
}

export async function _depositERC(amount, tokenAddr) {
    if (!window.selectedAddress) {
        return false;
    }
    const token = new ethers.Contract(
        tokenAddr,
        IERC20_ABI,
        window._provider.getSigner(0)
    );
    await token.approve(CONTRACT_ADDRESS, ethers.utils.parseEther(amount));
    await window.contract.connect(window._provider.getSigner(0))["deposit(address,uint256)"](tokenAddr, ethers.utils.parseEther(amount));
    return true;
}

export async function _withdrawETH() {
    if (!window.selectedAddress) {
        return false;
    }
    await window.contract.connect(window._provider.getSigner(0))["withdraw()"]();
    return true;
}

export async function _withdrawERC(tokenAddr) {
    if (!window.selectedAddress) {
        return false;
    }
    await window.contract.connect(window._provider.getSigner(0))["withdraw(address)"](tokenAddr);
    return true;
}