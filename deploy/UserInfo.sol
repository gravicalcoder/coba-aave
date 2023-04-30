//SPDX-License-Identifier: MIT 

pragma solidity ^0.8.0;

contract UserInfo {
    
    struct User {
        string name;
        uint256 age;
        string sex;
        uint256 phoneNumber;
        string city;
        string almamater;
    }
    
    mapping (address => User) users;
    
    function setUser(string memory _name, uint256 _age, string memory _sex, uint256 _phoneNumber, string memory _city , string memory _almamater) public {
        users[msg.sender] = User(_name, _age, _sex, _phoneNumber, _city, _almamater );
    }
    
    function getUser() public view returns (string memory, uint256, string memory, uint256, string memory , string memory) {
        User memory user = users[msg.sender];
        return (user.name, user.age, user.sex, user.phoneNumber, user.city, user.almamater);
    }
}