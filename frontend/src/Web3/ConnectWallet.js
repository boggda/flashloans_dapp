import { ethers } from "ethers";
import CONTRACT_ABI from "../Config/FlashLoansABI.json";
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
    window._token = new ethers.Contract(
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