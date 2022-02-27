//SPDX-License-Identifier: Unlicense
pragma solidity >0.8.0;
pragma abicoder v2;

import "@gnosis.pm/safe-contracts/contracts/common/SignatureDecoder.sol";
import "@gnosis.pm/safe-contracts/contracts/external/GnosisSafeMath.sol";

import "./IGnosisSafe.sol";
import "./BulkTransfer.sol";
import "./ISignatureValidator.sol";

/// @notice You can use this contract for basic simulation (bulk transferring and swap)
contract WorkflowModuleV2 is BulkTransfer, SignatureDecoder, ISignatureValidatorConstants {
    using GnosisSafeMath for uint256;

    string public constant NAME = "Workflow Module V2";

    string public constant VERSION = "0.0.2";

    struct Action {
        bytes4 selector;
        bytes arguments;
    }

    struct Workflow {
        IGnosisSafe safe;
        Action[] actions;
        address[] delegates;
    }

    modifier checkDelegates(IGnosisSafe _safe, address[] calldata _delegates) {
        for (uint index = 0; index < _delegates.length; index++) {
            require(_safe.isOwner(_delegates[index]), "Not an owner");
        }
        _;
    }

    /// @notice Execute actions
    function executeWorkflow(
        IGnosisSafe _safe,
        address[] calldata _delegates,
        Action[] calldata _actions,
        bytes memory _signatures
    ) external payable checkDelegates(_safe, _delegates) {
        bool success;
        // bytes memory data;
        bytes32 txHash;

        {
            bytes memory txHashData = encodeTransactionData(
                address(_safe),
                _delegates,
                _actions
            );

            txHash = keccak256(txHashData);

            _safe.checkSignatures(txHash, txHashData, _signatures);
        }

        for (uint index = 0; index < _actions.length; index++) {
            (success,) = address(this).call(
                abi.encodePacked(_actions[index].selector, _actions[index].arguments)        
            );
        } 

        require(success, "Call failed!");
    }

    function encodeTransactionData(address _safe, address[] calldata _delegates, Action[] calldata _actions)
        public
        pure
        returns (bytes memory)
    {
        return
            abi.encodePacked(
                bytes1(0x19),
                bytes1(0x01),
                keccak256(
                    abi.encodeWithSignature(
                        "executeWorkflow(address,address[],(bytes4,bytes)[],bytes)",
                        _safe,
                        _delegates,
                        _actions,
                        abi.encodePacked(address(0))
                    )
                )
            );
    }

    function getTransactionHash(address _safe, address[] calldata _delegates, Action[] calldata _actions)
        public
        pure
        returns (bytes32)
    {
        return keccak256(encodeTransactionData(_safe, _delegates, _actions));
    }
}
