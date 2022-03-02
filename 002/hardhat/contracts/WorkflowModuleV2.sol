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

    uint public nonce;
    
    struct Action {
        bytes4 selector;
        bytes arguments;
    }

    struct Workflow {
        IGnosisSafe safe;
        Action[] actions;
        address[] delegates;
    }

    /// @notice Execute actions
    function executeWorkflow(
        IGnosisSafe _safe,
        address[] calldata _delegates,
        Action[] calldata _actions,
        bytes memory _signatures
    ) public {
        bool success;
        // bytes memory data;
        bytes32 txHash;

        {
            bytes memory txHashData = encodeTransactionData(
                address(_safe),
                _delegates,
                _actions,
                nonce
            );

            txHash = keccak256(txHashData);

            _safe.checkSignatures(txHash, txHashData, _signatures);
        }

        require(
            indexOf(_delegates, msg.sender) == 1 || _safe.isOwner(msg.sender), 
            "Can't execute if not an owner nor part of the delegates"
        );

        nonce++;

        for (uint index = 0; index < _actions.length; index++) {
            (success,) = address(this).call(
                abi.encodePacked(_actions[index].selector, _actions[index].arguments)        
            );
        } 

        require(success, "Call failed!");
    }

    
    function indexOf(address[] calldata _haystack, address _needle) public pure returns(uint8) {
        for (uint index = 0; index < _haystack.length; index++) {
            if (_haystack[index] == _needle) {
                return 1;
            }
        }

        return 0;
    }

    function encodeTransactionData(address _safe, address[] calldata _delegates, Action[] calldata _actions, uint _nonce)
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
                ),
                _nonce
            );
    }

    function getTransactionHash(address _safe, address[] calldata _delegates, Action[] calldata _actions, uint _nonce)
        public
        pure
        returns (bytes32)
    {
        return keccak256(encodeTransactionData(_safe, _delegates, _actions, _nonce));
    }
}
