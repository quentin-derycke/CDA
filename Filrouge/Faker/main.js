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
function boolRandom() {
    return (Math.round(Math.random())) ? true : false;
}
/**
 *
 * @param max valeur max exclu
 * @returns
 */
function numberRandom(max) {
    return (Math.round(Math.random() * max));
}
function generateUser() {
    let user = {
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
        name: faker_1.faker.name.firstName(),
        lastname: faker_1.faker.name.lastName(),
        birthdate: faker_1.faker.date.birthdate(),
        signupdate: faker_1.faker.date.past(),
        phonenumber: faker_1.faker.phone.number('+33 06 ### ## ##'),
        isverified: boolRandom(),
        roles: numberRandom(6),
        vat: 20,
        pro: boolRandom()
    };
    if (user.pro) {
        user.pro_company_name = faker_1.faker.company.name();
        user.user_pro_duns = faker_1.faker.finance.account();
    }
    return user;
}
function generateUsers(nbreUser) {
    let users = [];
    for (let i = 0; i < nbreUser; i++) {
        users.push(generateUser());
    }
    return users;
}
function convertDate(dateBuff) {
    return `${dateBuff.getFullYear()}-${dateBuff.getMonth()}-${dateBuff.getDay()}`;
}
function generateUsersInsert(tableName, columnsName, users) {
    let column = '';
    for (let i = 0; i < columnsName.length; i++) {
        column += columnsName[i];
        if (i == columnsName.length - 1)
            continue;
        column += ', ';
    }
    let values = '';
    for (let i = 0; i < users.length; i++) {
        values += '('
            + '\"' + users[i].email + '\", '
            + '\"' + users[i].password + '\", '
            + '\"' + users[i].name + '\", '
            + '\"' + users[i].lastname + '\", '
            + '\"' + convertDate(users[i].birthdate) + '\", '
            + '\"' + convertDate(users[i].signupdate) + '\", '
            + '\"' + users[i].phonenumber + '\", '
            + users[i].isverified + ', '
            + '\"' + users[i].roles + '\", '
            + '\"' + users[i].vat + '\", '
            + users[i].pro + ', '
            + ((users[i].pro_company_name === undefined) ? null : ('\"' + users[i].pro_company_name) + '\"') + ', '
            + ((users[i].user_pro_duns === undefined) ? null : ('\'' + users[i].user_pro_duns) + '\'')
            + `)${(i == users.length - 1) ? ";" : ","}\n`;
    }
    return `INSERT INTO ${tableName} (${column})\nVALUES\n${values}`;
}
function start() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readline.question(' chose a number?', (num) => {
        const users = generateUsers(Number(num));
        const sql = generateUsersInsert('_user', ['user_email', 'user_password', 'user_name', 'user_lastname', 'user_birthdate', 'user_signupdate', 'user_phonenumber', 'user_isverified', 'user_roles', 'user_vat', 'user_pro', 'user_pro_company_name', 'user_pro_duns'], users);
        fs.writeFile("insertUsers.sql", sql, (err) => {
            if (err)
                console.log(err);
        });
        readline.close();
    });
}
start();
