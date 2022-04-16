const hre = require("hardhat");
const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    console.log("Contract addy to:", waveContract.address);
    // const waveContract = await waveContractFactory.attach("0xa504CD05e5d892a429FFf0d560414744A4CF37E8");

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));
    
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    /*let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(owner).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();*/

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

runMain();