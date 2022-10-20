"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const fs = __importStar(require("fs"));
function generateAddress() {
    let address = {
        street: faker_1.faker.address.streetAddress(),
        country: faker_1.faker.address.country(),
        zipcode: faker_1.faker.address.zipCode('####'),
        city: faker_1.faker.address.city(),
    };
    return address;
}
function generateAddresses(nbreAddress) {
    let address = [];
    for (let i = 0; i < nbreAddress; i++) {
        address.push(generateAddress());
    }
    return address;
}
function generateAddressInsert(tableName, columnsName, addresses) {
    let column = '';
    for (let i = 0; i < columnsName.length; i++) {
        column += columnsName[i];
        if (i == columnsName.length - 1)
            continue;
        column += ', ';
    }
    let values = '';
    for (let i = 0; i < addresses.length; i++) {
        values += '('
            + '\"' + addresses[i].street + '\", '
            + '\"' + addresses[i].country + '\", '
            + '\"' + addresses[i].zipcode + '\", '
            + '\"' + addresses[i].city + '\" ' + `) ${(i == addresses.length - 1) ? ';' : ','}` + `\n`;
    }
    return `INSERT INTO ${tableName} (${column})\nVALUES\n${values}`;
}
function start() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readline.question(' chose a number?', (num) => {
        const addresses = generateAddresses(Number(num));
        const sql = generateAddressInsert('address', ['address_street', 'address_country', 'address_zipcode', 'address_city'], addresses);
        fs.writeFile("insertAddress.sql", sql, (err) => {
            if (err)
                console.log(err);
        });
        readline.close();
    });
}
start();
