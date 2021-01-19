const MemeDApp = artifacts.require("./Meme.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("MemeDApp", ([deployer, uploader]) => {
  let memeDApp;

  before(async () => {
    memeDApp = await MemeDApp.deployed();
  });

  describe("deployment", async () => {
    it("succesful", async () => {
      const address = await memeDApp.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });
});
