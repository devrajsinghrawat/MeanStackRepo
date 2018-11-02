pragma solidity ^0.4.22;
/** This Contract will store the data for Balance Proof sig */
contract SigData {

    address public owneraddress;
    uint number;

    struct SigData {
        string id;
        uint balance;
        bytes balance_proof;
    }

    mapping (address => SigData) public ownerToSigData;

    event ValueSetted(address indexed sender, uint value);

    constructor() public {
        owneraddress = msg.sender;
    }

    function setData(string _id, uint _balance, bytes _balance_proof) external {
        ownerToSigData[msg.sender] = SigData(_id, _balance, _balance_proof);

        emit ValueSetted(msg.sender, _balance);
    }

    function getBalance() external view returns(uint) {
        return ownerToSigData[msg.sender].balance;
    }

    function getSig() external view returns(bytes) {
        return ownerToSigData[msg.sender].balance_proof;
    }

    function setNumber(uint _number) external {
        number = _number;
    }

    function getNumber() external view returns(uint) {
        return number;
    }


}
