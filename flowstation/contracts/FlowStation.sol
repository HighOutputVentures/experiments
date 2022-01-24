//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0;

import "@gnosis.pm/safe-contracts/contracts/common/Enum.sol";
import "@gnosis.pm/safe-contracts/contracts/external/GnosisSafeMath.sol";

import "./GnosisSafe.sol";

contract FlowStation {
    using GnosisSafeMath for uint256;

    string public constant NAME = "FlowStation Gnosis Safe Module";
    string public constant VERSION = "1.0.0";

    struct Transfer {
      address recipient;
      address token;
      uint256 amount;
    }

    function executeBulkTransfer(
        GnosisSafe safe,
        Transfer[] calldata transfers
    ) public {
        for (uint256 i = 0; i < transfers.length; i++) {
            transfer(safe, transfers[i].token, payable(transfers[i].recipient), transfers[i].amount);
        }
    }

    function transfer(
        GnosisSafe safe,
        address token,
        address payable to,
        uint256 amount
    ) private {
        if (token == address(0)) {
            require(
                safe.execTransactionFromModule(
                    to,
                    amount,
                    "",
                    Enum.Operation.Call
                ),
                "cannot execute ether transfer"
            );
        } else {
            // token transfer
            bytes memory data = abi.encodeWithSignature(
                "transfer(address,uint256)",
                to,
                amount
            );
            require(
                safe.execTransactionFromModule(
                    token,
                    0,
                    data,
                    Enum.Operation.Call
                ),
                "cannot execute token transfer"
            );
        }
    }
}
