
// import ether
const { ethers } = require("hardhat");



async function main() {
    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    const supplyChain = await SupplyChain.deploy();

    await supplyChain.deployed();

    console.log("SupplyChain deployed to:", supplyChain.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
