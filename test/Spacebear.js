const { expect } = require('chai');
const hre = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe('Spacebear', () => {
  async function deployAndMintFixture() {
    const sbFactory = await hre.ethers.getContractFactory('Spacebear');
    const sb = await sbFactory.deploy();
    const [owner, otherAccount] = await ethers.getSigners();
    await sb.safeMint(otherAccount.address);

    return { sb };
  }

  it('is possible to mint a token', async () => {
    const { sb } = await loadFixture(deployAndMintFixture);

    const [owner, otherAccount] = await ethers.getSigners();
    await sb.safeMint(otherAccount.address);

    await expect(sb.ownerOf(0)).become(otherAccount.address);
  });

  it('is fails to transfer tokens from the wrong address', async () => {
    const { sb } = await loadFixture(deployAndMintFixture);

    const [owner, otherAccount, notTheNftOwner] = await ethers.getSigners();
    await sb.safeMint(otherAccount.address);

    expect(sb.ownerOf(0)).become(otherAccount.address);
    await expect(
      sb
        .connect(notTheNftOwner)
        .transferFrom(otherAccount.address, notTheNftOwner.address, 0)
    ).to.be.revertedWith('ERC721: caller is not token owner or approved');
  });
});
