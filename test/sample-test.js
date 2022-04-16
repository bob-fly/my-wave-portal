const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WavePortal", function () {
  it("Should return the new greeting once it's changed", async function () {
    const WavePortal = await ethers.getContractFactory("WavePortal");
    const wavePortal = await WavePortal.deploy();
    console.log("address:",wavePortal.address)
  });
});
