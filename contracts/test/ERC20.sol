pragma solidity =0.5.16;

import '../BorealisswapERC20.sol';

contract ERC20 is BorealisswapERC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
