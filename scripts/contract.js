const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');
const path = require('path');
const web3 = new Web3();
const dir = "../contracts";

const contracts = {
  fee: {
    name: "Fee.sol:Fee",
    parameters: {
      types: ["address[]", "string", "uint8", "string"],
      values: [[
        "0x833a2FA19349dAf085B94376ac3042197cF66443",
        "0xD8ada5c29785F5e486bba48Bd196B103D58BBCa5",
        "0x7461CCF1FD55c069ce13E07D163C65c78c8b48D1"
      ], "Leverj FEE Token", "0", "FEE"]
    }
  },
  stake: {
    name: "Stake.sol:Stake",
    parameters: {
      types: ["address[]", "address", "address", "uint256", "address"],
      values: [[
        "0x833a2FA19349dAf085B94376ac3042197cF66443",
        "0xD8ada5c29785F5e486bba48Bd196B103D58BBCa5",
        "0x7461CCF1FD55c069ce13E07D163C65c78c8b48D1"
      ], "0xDaa1A6c972d4b8d57dce119E48C6ABB19BaF8402", "0xC66f77054bF7536f3d1e7c8dD311e5394A4c8B7B", "1000000", "0xaa7127e250e87476fdd253f15e86a4ea9c4c4bd4"]
    }
  }
};

function generateContractByteCode(_contract) {
  try {
    let compiled = allCompiled.contracts[_contract.name];
    let contractByteCode = compiled.bytecode;
    let contractABI = compiled.interface;
    let parametersByteCode = web3.eth.abi.encodeParameters(_contract.parameters.types, _contract.parameters.values);
    parametersByteCode = parametersByteCode.substr(2, parametersByteCode.length);
    console.log({name: _contract.name, bytecode: contractByteCode + parametersByteCode, abi: contractABI});
  } catch (e) {
    console.error(e);
  }
}

function compile() {
  let sources = {};
  let fileNames = fs.readdirSync(dir);
  for (let i = 0; i < fileNames.length; i++) {
    let fileName = fileNames[i];
    let solPath = dir + path.sep + fileName;
    sources[fileName] = fs.readFileSync(solPath).toString();
    // console.log(solPath, sources[fileName]);
  }
  return solc.compile({sources}, 1);
}

let allCompiled = compile();
Object.keys(contracts).forEach(_contract => generateContractByteCode(contracts[_contract]));

// require('./command').run({bytes: generateContractByteCode});
