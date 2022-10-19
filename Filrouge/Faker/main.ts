import { faker } from "@faker-js/faker";
import * as fs from 'fs';


interface IUser {
    email: string,
    password: string,
    name: string,
    lastname: string,
    birthdate: Date,
    signupdate: Date,
    phonenumber: string,
    isverified: boolean,
    roles: number,
    vat: number,
    pro: boolean,
    pro_company_name?: string,
    user_pro_duns?: string
}


function boolRandom(): boolean {
    return (Math.round(Math.random())) ? true : false;
}

/**
 * 
 * @param max valeur max exclu
 * @returns 
 */

function numberRandom(max: number): number {
    return (Math.round(Math.random() * max));
}


function generateUser(): IUser {
    let user: IUser = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        birthdate: faker.date.birthdate(),
        signupdate: faker.date.past(),
        phonenumber: faker.phone.number('+33 06 ### ## ##'),
        isverified: boolRandom(),
        roles: numberRandom(6),
        vat: 20,
        pro: boolRandom()
    }
    if (user.pro) {
        user.pro_company_name = faker.company.name();
        user.user_pro_duns = faker.finance.account();
    }
    return user;
}


function generateUsers(nbreUser: number): IUser[] {
    let users: IUser[] = [];
    for (let i = 0; i < nbreUser; i++) {
        users.push(generateUser());
    }
    return users;
}

function convertDate(dateBuff: Date) : string {
    return `${dateBuff.getFullYear()}-${dateBuff.getMonth()}-${dateBuff.getDay()}`;
}

function generateUsersInsert(tableName: string, columnsName: string[], users: IUser[]): string {
    let column: string = '';
    for (let i = 0; i < columnsName.length; i++) {
        column += columnsName[i];
        if (i == columnsName.length - 1) continue;
        column += ', '
    }
    let values: string = '';
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
        + ((users[i].pro_company_name === undefined) ? null : ('\"' + users[i].pro_company_name) + '\"')  + ', '
        + ((users[i].user_pro_duns === undefined) ? null : ('\'' + users[i].user_pro_duns) + '\'')
                + `)${(i == users.length - 1) ? ";" : ","}\n`
            ;
    }

    return `INSERT INTO ${tableName} (${column})\nVALUES\n${values}`;
}

function start() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });


    readline.question(' chose a number?', (num: any) => {
        const users = generateUsers(Number(num));
        const sql = generateUsersInsert('_user', ['user_email', 'user_password', 'user_name', 'user_lastname', 'user_birthdate', 'user_signupdate', 'user_phonenumber', 'user_isverified', 'user_roles', 'user_vat', 'user_pro', 'user_pro_company_name', 'user_pro_duns'], users);
        fs.writeFile("insertUsers.sql", sql, (err) => {
            if (err) console.log(err);
        });
        readline.close();
    });



}

start();
