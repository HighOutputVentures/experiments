import { ethers } from 'ethers';

const AbiCoder = new ethers.utils.AbiCoder();

export const generateTransactionHash = (args: {
  abi: string[];
  functionName: string;
  signature: string[];
  values: any[];
}) => {
  const iFace = new ethers.utils.Interface(args.abi);
  const selector = iFace.getSighash(args.functionName);

  const tx = AbiCoder.encode(args.signature, args.values);

  return [selector, tx];
}

export const AMOUNT = 100;
export const TOKEN = '0xc778417E063141139Fce010982780140Aa0cD5Ab';

/* console.log('#executeBulkTransfer', generateTransactionHash({
  abi: ['function executeBulkTransfer(address,tuple(address,address,uint256)[])'],
  functionName: 'executeBulkTransfer',
  signature: ['address', 'tuple(address,address,uint256)[]'],
  values: [
    '0x2700208D4b0b2bb83CF89601d5691b08c296Ae72',
    // recipient, token, amount
    [
      ["0xB0E965c2c3Ab93007662B6Efaff38549bA01FbFF", "0xc778417E063141139Fce010982780140Aa0cD5Ab", 100],
      ["0x3FA9BfBE6a6E70A052E7478431fb7bc400D2f694", "0xc778417E063141139Fce010982780140Aa0cD5Ab", 100],
      ["0xf0EC734B0A144E72e90DA72ad91317fe2bab90bd", "0xc778417E063141139Fce010982780140Aa0cD5Ab", 100],
    ],
  ]
})); */
