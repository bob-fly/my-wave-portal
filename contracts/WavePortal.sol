pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    uint256 private seed;

    mapping(address => uint256) public lastWavedAt;

    event NewWave(address indexed from, uint256 timestamp, string message, bool success);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        //        require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, "Wait 30s");
        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        //        console.log("%s waved w/ message %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        //        console.log("timestamp: %s, difficulty: %s", block.timestamp, block.difficulty);
        seed = (block.timestamp + block.difficulty) % 100;
        //        console.log("seed: %s", seed);
        if (seed > 50) {
            emit NewWave(msg.sender, block.timestamp, _message, false);
            return;
        }

        console.log("%s won!", msg.sender);
        uint256 prizeAmount = 0.0001 ether;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success,) = (msg.sender).call{value : prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");

        emit NewWave(msg.sender, block.timestamp, _message, true);

    }

    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }

    function getTotalWaves() public view returns (uint256){
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
