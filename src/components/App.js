import React, { Component } from "react";
import Web3 from "web3";
import Meme from "../abis/Meme.json";
import MemeComponent from "./Meme";
import "./Meme.scss";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    if (web3) {
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
      const networkId = await web3.eth.net.getId();
      const networkData = Meme.networks[networkId];
      if (networkData) {
        const contract = web3.eth.Contract(Meme.abi, networkData.address);
        this.setState({ contract });
        const memeHash = await contract.methods.get().call();
        this.setState({ memeHash });
        this.setState({ isMetaMaskOn: true });
      } else {
        window.alert("Smart contract not deployed to detected network.");
      }
    } else {
      this.setState({ isMetaMaskOn: false });
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      memeHash: "",
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      isMetaMaskOn: false,
    };
  }

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
    };
  };

  onSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting file to ipfs...");
    ipfs.add(this.state.buffer, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.state.contract.methods
        .set(result[0].hash)
        .send({ from: this.state.account })
        .then((r) => {
          return this.setState({ memeHash: result[0].hash });
        });
    });
  };

  render() {
    return (
      <div>
        {this.state.isMetaMaskOn && (
          <MemeComponent
            memeHash={this.state.memeHash}
            onSubmit={this.onSubmit}
            captureFile={this.captureFile}
          />
        )}

        {!this.state.isMetaMaskOn && (
          <h2 className="container">Please connect the meta mask</h2>
        )}
      </div>
    );
  }
}

export default App;
