const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:7545");
  const wallet = new ethers.Wallet(
    "b2aa29989f2206160546cc61fc8ae8ed90249ace3f75a2fdff21de4083709a51",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
