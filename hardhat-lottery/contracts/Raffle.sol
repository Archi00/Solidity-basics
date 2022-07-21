//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/* Imports */
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

/* Custom errors */
error Raffle__NotEnoughEthEntered();

contract Raffle is VRFConsumerBaseV2 {
  /* State Variables  */
  VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
  uint256 private immutable i_entranceFee;
  address payable[] private s_players;
  bytes32 private immutable i_gasLane;
  uint64 private immutable i_subscriptionId;
  uint32 private immutable i_callbackGasLimit;
  uint16 private constant REQUEST_CONFIRMATIONS = 3;
  uint32 private constant NUM_WORDS = 1;

  /* Events */
  event RaffleEnter(address indexed _player);
  event RequestedRaffleWinner(uint256 indexed _requestId);

  constructor(
    address _vrfCoordinatorV2,
    uint256 _entraceFee,
    bytes32 _gasLane,
    uint64 _subscriptionId,
    uint32 _callbackGasLimit
  ) VRFConsumerBaseV2(_vrfCoordinatorV2) {
    i_entranceFee = _entraceFee;
    i_vrfCoordinator = VRFCoordinatorV2Interface(_vrfCoordinatorV2);
    i_gasLane = _gasLane;
    i_subscriptionId = _subscriptionId;
    i_callbackGasLimit = _callbackGasLimit;
  }

  function enterRaffe() public payable {
    if (msg.value < i_entranceFee) {
      revert Raffle__NotEnoughEthEntered();
    }
    s_players.push(payable(msg.sender));
    emit RaffleEnter(msg.sender);
  }

  function requestRandomWinner() external {
    uint256 requestId = i_vrfCoordinator.requestRandomWords(
      i_gasLane,
      i_subscriptionId,
      REQUEST_CONFIRMATIONS,
      i_callbackGasLimit,
      NUM_WORDS
    );
    emit RequestedRaffleWinner(requestId);
  }

  function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {}

  /* View / Pure functions */
  function getEntranceFee() public view returns (uint256) {
    return i_entranceFee;
  }

  function getPlayers(uint256 _index) public view returns (address) {
    return s_players[_index];
  }
}
