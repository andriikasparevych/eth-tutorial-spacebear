(async () => {
  try {
    const Spacebear = await hre.ethers.getContractFactory('Spacebear');
    const sbInstance = await Spacebear.deploy();
    await sbInstance.waitForDeployment();

    console.log(`Deployed contract at ${sbInstance.target}`);
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  }
})();
