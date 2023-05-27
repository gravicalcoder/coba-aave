// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract UserData {
    struct User {
        string name;
        uint age;
        string phoneNumber;
        string homeAddress;
        address erc20Address;
    }

    mapping(address => User) private users;
    
    function storeUserData(
        string memory _name,
        uint _age,
        string memory _phoneNumber,
        string memory _homeAddress,
        address _erc20Address
    ) public {
        User memory newUser = User({
            name: _name,
            age: _age,
            phoneNumber: _phoneNumber,
            homeAddress: _homeAddress,
            erc20Address: _erc20Address
        });

        users[msg.sender] = newUser;
    }

    function getUserData() public view returns (
        string memory,
        uint,
        string memory,
        string memory,
        address
    ) {
        User memory user = users[msg.sender];
        return (
            user.name,
            user.age,
            user.phoneNumber,
            user.homeAddress,
            user.erc20Address
        );
    }
}
