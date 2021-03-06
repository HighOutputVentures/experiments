// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract SimpleEvent {
    event Hello(address sender);

    function hello() public {
        emit Hello(msg.sender);
    }
}
