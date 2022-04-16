const hre = require("hardhat");
const ethers = require('ethers');
const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.01"),
    });
    await waveContract.deployed();
    console.log("Contract addy to:", waveContract.address);
    // const waveContract = await waveContractFactory.attach("0xa4aF70d01498701A6dc42358C31b2B8e55BE4a98");
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));


    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [signer] = await hre.ethers.getSigners();
    //ethers.js的事件监听在hardhat下不能使用
    /* const onNewWave = (from, timestamp, message, success) => {
         console.log("NewWave", from, timestamp, message, success);
     };
     let contractABI = "[{\"inputs\":[],\"stateMutability\":\"payable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"message\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"name\":\"NewWave\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"getAllWaves\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"waver\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"message\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\"}],\"internalType\":\"struct WavePortal.Wave[]\",\"name\":\"\",\"type\":\"tuple[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getTotalWaves\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"lastWavedAt\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_message\",\"type\":\"string\"}],\"name\":\"wave\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]";

     let wavePortalContract = new hre.ethers.Contract(waveContract.address, contractABI, signer);
     wavePortalContract.on("NewWave", onNewWave);*/

    const waveTxn = await waveContract.wave("This is wave #1", {gasLimit: 300000});
    let receipt = await waveTxn.wait();
    // console.log("receipt1 :", receipt);
    let event = receipt.events.find(event => event.event === "NewWave");
    if (event != null) {
        const [from, timestamp, message, success] = event.args;
        console.log("event----->> from:%s, timestamp:%s, message:%s, success:%s", from, timestamp, message, success);
    }

    const waveTxn2 = await waveContract.wave("This is wave #2", {gasLimit: 300000});
    receipt = await waveTxn2.wait();

    // console.log("receipt1 :", receipt);
    event = receipt.events.find(event => event.event === "NewWave");
    if (event != null) {
        const [from, timestamp, message, success] = event.args;
        console.log("event----->> from:%s, timestamp:%s, message:%s, success:%s", from, timestamp, message, success);
    }

    // console.log("receipt2 :", receipt);

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

    /*waveContract.on("NewWave", (sender, timestamp, _message, success) => {
        console.log("NewWave event:", sender, timestamp, _message, success);
    });*/

    let allWaves = await waveContract.getAllWaves();
    // console.log("allWaves:", allWaves);

    let waveCount = await waveContract.getTotalWaves();
    console.log("waveCount:", waveCount);

    /*    ethers.on({
            address: waveContract.address,
            topics: [
                ethers.utils.id("NewWave(address,uint256,string,bool)")
            ]
        }, (from, timestamp, message, success) => {
            console.log(from, timestamp, message, success);
        })*/
};

const runMain = async () => {
    try {
        await main();
        console.log("invoke finished.");
        process.exit(0);
    } catch (e) {
        console.log("error occur:", e);
        process.exit(1);
    }
};

runMain();
