pragma solidity >=0.5.16;
import './BorealisswapPair.sol';

contract CalHash {
    function getInitHash() public pure returns(bytes32){
        bytes memory bytecode = type(BorealisswapPair).creationCode;
        return keccak256(abi.encodePacked(bytecode));
    }
}