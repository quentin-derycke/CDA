import { faker } from "@faker-js/faker";
import * as fs from 'fs';


interface Iaddress {
    street: string,
    country: string,
    zipcode: string,
    city: string,

}

function generateAddress(): Iaddress {
    let address: Iaddress = {
        street: faker.address.streetAddress(),
        country: faker.address.country(),
        zipcode: faker.address.zipCode('####'),
        city: faker.address.city(),
    
    }
    return address ;
    }


function generateAddresses(nbreAddress: number): Iaddress[] {
    let address: Iaddress[] = [];
    for (let i = 0; i < nbreAddress; i++) {
        address.push(generateAddress());
    }
    return address;
}
    
function generateAddressInsert(tableName : string, columnsName : string[], addresses : Iaddress[]) : string {
let column: string = ''; 
for (let i = 0; i < columnsName.length; i++) {
    column += columnsName[i];
    if (i == columnsName.length - 1) continue;
    column += ', '
}
let values: string = '';
for (let i = 0; i < addresses.length; i++) {
values += '('
    + '\"' + addresses[i].street  + '\", '
    + '\"' + addresses[i].country + '\", '
    + '\"' + addresses[i].zipcode + '\", '
    + '\"' + addresses[i].city + '\" ' + `) ${(i == addresses.length - 1) ? ';' : ','}` + `\n`
}
return `INSERT INTO ${tableName} (${column})\nVALUES\n${values}`;
}

function start() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });


    readline.question(' chose a number?', (num: any) => {
        const addresses = generateAddresses(Number(num));
        const sql = generateAddressInsert('address', ['address_street','address_country', 'address_zipcode', 'address_city' ], addresses);
        fs.writeFile("insertAddress.sql", sql, (err) => {
            if (err) console.log(err);
        });
        readline.close();
    });



}

start();
