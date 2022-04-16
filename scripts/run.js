const hre = require("hardhat");
const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    /*const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);
    console.log("randomPerson :", randomPerson.address);*/
    const waveContract = await waveContractFactory.attach("0xa504CD05e5d892a429FFf0d560414744A4CF37E8");

    let waveCount = await waveContract.getTotalWaves();
    console.log("waveCount:", waveCount);

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
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

runMain();