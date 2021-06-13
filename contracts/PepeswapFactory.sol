pragma solidity =0.5.16;

import './interfaces/IPepeswapFactory.sol';
import './PepeswapPair.sol';

contract PepeswapFactory is IPepeswapFactory {
    address public feeTo;
    address public feeToSetter;

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }

    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, 'Pepeswap: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'Pepeswap: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'Pepeswap: PAIR_EXISTS'); // single check is sufficient
        bytes memory bytecode = type(PepeswapPair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IPepeswapPair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'Pepeswap: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'Pepeswap: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }

     function getInitCodeHash() public pure returns(bytes32){
        bytes memory bytecode = type(PepeswapPair).creationCode;
        return keccak256(abi.encodePacked(bytecode));
    }
}
