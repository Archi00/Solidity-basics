const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = ethers.Wallet(
    "b2aa29989f2206160546cc61fc8ae8ed90249ace3f75a2fdff21de4083709a51",
    provider
  );
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
