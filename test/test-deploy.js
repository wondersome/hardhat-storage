const { ethers } = require("hardhat");
const { expect, assert } = require("chai");
const { assertHardhatInvariant } = require("hardhat/internal/core/errors");

describe("SimpleStorage", () => {
    let simpleStorageFactory;
    let simpleStorage;

    beforeEach(async function() {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with a favorite number of 0", async function() {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(), expectedValue);
    });

    it("Should update when we call store", async function() {
        const expectedValue = "7";
        const transactionResponse = await simpleStorage.store("7");
        await transactionResponse.wait(1);
        const currentValue = await simpleStorage.retrieve();
        assert.equal(expectedValue, currentValue.toString());
    });

    it("Should add person when we call addPerson", async function() {
        const expectedValue = "7";
        const transactionResponse = await simpleStorage.addPerson("Gary", 7);
        await transactionResponse.wait(1);
        const currentValue = await simpleStorage.nameToFavoriteNumber("Gary");
        assert.equal(currentValue.toString(), expectedValue);
    });
});