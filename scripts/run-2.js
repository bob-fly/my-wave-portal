const hre = require("hardhat");
const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    // const waveContract = await waveContractFactory.attach("0xa504CD05e5d892a429FFf0d560414744A4CF37E8");

    let waveCount = await waveContract.getTotalWaves();
    console.log("waveCount:", waveCount.toNumber());

    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait();

    // const [_, randomPerson] = await hre.ethers.getSigners();

    waveTxn = await waveContract.wave("Another message!");
    await waveTxn.wait();

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