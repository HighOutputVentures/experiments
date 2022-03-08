import EthersAdapter from '@gnosis.pm/safe-ethers-lib'
import Safe from "@gnosis.pm/safe-core-sdk";
import R from 'ramda';
import chaiAsPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { expect, use } from 'chai';

use(chaiAsPromised);

const encodeTransactionData = (args: {
  abi: string[];
  values: any[];
}) => {
  const iFace = new ethers.utils.Interface(args.abi);
  
  return iFace.encodeFunctionData('executeWorkflow', args.values);
}

export const buildSignatureBytes = (signatures: any[]): string => {
  signatures.sort((left, right) =>
    left.signer.toLowerCase().localeCompare(right.signer.toLowerCase())
  );
  let signatureBytes = "0x";
  for (const sig of signatures) {
    signatureBytes += sig.data.slice(2);
  }
  return signatureBytes;
};

const OWNER = '0xC9e29C46E35AA801a8226886912a9b1A9e355D47';
const OWNER02 = '0xB0E965c2c3Ab93007662B6Efaff38549bA01FbFF';
const OWNERS = [OWNER, OWNER02];

describe('WorkflowModuleV2 - Delegate executor', () => {
  before(async function () {
    const signer = ethers.provider.getSigner(OWNER);

    this.signer = signer;

    const ethAdapter = new EthersAdapter({
      ethers,
      signer,
    });

    const SAFE_ADDRESS = '0x2700208D4b0b2bb83CF89601d5691b08c296Ae72';

    const safeSdk: Safe = await Safe.create({ ethAdapter, safeAddress: SAFE_ADDRESS })
    
    this.safeSdk = safeSdk;

    const owner02 = await safeSdk.connect({
      ethAdapter: new EthersAdapter({
        ethers,
        signer: ethers.provider.getSigner(OWNER02),
      }),
      safeAddress: SAFE_ADDRESS,
    });

    const safeAddress = safeSdk.getAddress();
    
    this.safeAddress = safeAddress;

    const owners = await safeSdk.getOwners();

    this.owners = owners;
  
    const workflowV2ContractAddress = '0xeA1d9F887902b3b2a6Fa7cBB60953908A6aE81d2';
    const contract = await ethers.getContractAt('WorkflowModuleV2', workflowV2ContractAddress);

    this.contract = contract;

    const txHash = await contract.getTransactionHash(
      safeAddress,
      [OWNER, OWNER02],
      [
       {
         selector: '0x0ebaf650',
         arguments: '0x0000000000000000000000002700208d4b0b2bb83cf89601d5691b08c296ae7200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003000000000000000000000000b0e965c2c3ab93007662b6efaff38549ba01fbff000000000000000000000000c778417e063141139fce010982780140aa0cd5ab00000000000000000000000000000000000000000000000000000000000000640000000000000000000000003fa9bfbe6a6e70a052e7478431fb7bc400d2f694000000000000000000000000c778417e063141139fce010982780140aa0cd5ab0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000f0ec734b0a144e72e90da72ad91317fe2bab90bd000000000000000000000000c778417e063141139fce010982780140aa0cd5ab0000000000000000000000000000000000000000000000000000000000000064',
       },
      ],
      1
    );
    
    this.txHash = txHash;

    const firstSafeSignature = await safeSdk.signTransactionHash(txHash);
    const secondSafeSignature = await owner02.signTransactionHash(txHash);

    const signatureBytes = ethers.utils.solidityPack(
      ['bytes', 'bytes'], 
      [secondSafeSignature.data, firstSafeSignature.data]
    );
    
    this.signatureBytes = signatureBytes;

    const encodedTransactionData = encodeTransactionData({
      abi: ['function executeWorkflow(address,address[],tuple(bytes4,bytes)[],bytes)'],
      values: [
        safeAddress,
        [OWNER, OWNER02],
        [
          ['0x0ebaf650', '0x0000000000000000000000002700208d4b0b2bb83cf89601d5691b08c296ae7200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003000000000000000000000000b0e965c2c3ab93007662b6efaff38549ba01fbff000000000000000000000000c778417e063141139fce010982780140aa0cd5ab00000000000000000000000000000000000000000000000000000000000000640000000000000000000000003fa9bfbe6a6e70a052e7478431fb7bc400d2f694000000000000000000000000c778417e063141139fce010982780140aa0cd5ab0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000f0ec734b0a144e72e90da72ad91317fe2bab90bd000000000000000000000000c778417e063141139fce010982780140aa0cd5ab0000000000000000000000000000000000000000000000000000000000000064']
        ],
        signatureBytes
      ]
    });

    this.encodedTransactionData = encodedTransactionData;
    
    const txData = await safeSdk.createTransaction({
      to: contract.address,
      value: '0',
      data: encodedTransactionData,
    });

    this.txData = txData;

    await safeSdk.signTransaction(txData);
    await owner02.signTransaction(txData);

    const executedTransaction = await owner02.executeTransaction(txData, {
      gasLimit: 250000,
    });

    this.executedTransaction = executedTransaction;

    const confirmed = await executedTransaction.transactionResponse?.wait();

    this.confirmed = confirmed;
  });

  it('should have correct values', async function () {
    await expect(this.signer.getAddress()).to.eventually.fulfilled.and.become('0xC9e29C46E35AA801a8226886912a9b1A9e355D47');

    expect(this.safeAddress).to.be.equals('0x2700208D4b0b2bb83CF89601d5691b08c296Ae72');
    
    await expect(this.contract.deployed()).to.eventually.fulfilled.and.become(this.contract);

    expect(this.owners).to.have.members(['0xC9e29C46E35AA801a8226886912a9b1A9e355D47', '0xB0E965c2c3Ab93007662B6Efaff38549bA01FbFF']);

    expect(this.txHash).to.be.not.null;

    await expect(this.safeSdk.signTransactionHash(this.txHash)).to.eventually.fulfilled

    const encodedTxData = encodeTransactionData({
      abi: ['function executeWorkflow(address,address[],tuple(bytes4,bytes)[],bytes)'],
      values: [
        this.safeAddress,
        OWNERS,
        [
          ['0x0ebaf650', '0x0000000000000000000000002700208d4b0b2bb83cf89601d5691b08c296ae7200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003000000000000000000000000b0e965c2c3ab93007662b6efaff38549ba01fbff000000000000000000000000c778417e063141139fce010982780140aa0cd5ab00000000000000000000000000000000000000000000000000000000000000640000000000000000000000003fa9bfbe6a6e70a052e7478431fb7bc400d2f694000000000000000000000000c778417e063141139fce010982780140aa0cd5ab0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000f0ec734b0a144e72e90da72ad91317fe2bab90bd000000000000000000000000c778417e063141139fce010982780140aa0cd5ab0000000000000000000000000000000000000000000000000000000000000064']
        ],
        this.signatureBytes,
      ]
    })

    expect(encodedTxData).to.be.equals(this.encodedTransactionData);

    expect(this.txData).to.be.not.null;
    expect(this.txData).to.be.not.undefined;
    expect(this.txData).to.be.an('object')
    expect(this.txData).to.have.property('signatures');
    expect(this.txData).to.have.property('data');
    expect(!R.isEmpty(this.txData)).to.be.true;

    expect(this.executedTransaction).to.be.not.null;
    expect(this.executedTransaction).to.be.not.undefined;
    expect(this.executedTransaction).to.be.an('object')
    expect(!R.isEmpty(this.executedTransaction)).to.be.true;

    expect(this.confirmed).to.be.not.null;
    expect(this.confirmed).to.be.not.undefined;
    expect(this.confirmed).to.be.an('object');
    expect(!R.isEmpty(this.confirmed)).to.be.true;
  })
});

