import { faker } from "@faker-js/faker";
import * as fs from 'fs';


function generateSupplier(nbreSupplier : number) : string[] {
    let suppliers : string[] = [];
    for (let i = 0; i < nbreSupplier; i++) {
        suppliers.push(faker.company.name());
    }
    return suppliers; 

}


function generateSupplierInsert( tableName: string, column: string[], suppliersName: string[]) : string {
    
   
    
    
    let values: string = '';
    for (let i = 0 ; i < suppliersName.length; i++ )
    {
        values += '('
        + '\"' +suppliersName[i]+ `")${ (i == suppliersName.length - 1) ? ';' : ',' }` + `\n` 

    }
return `INSERT INTO ${tableName} (${column}) Values \n${values}`;
};


function start() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });


    readline.question(' chose a number?', (num: any) => {
        const suppliersName = generateSupplier(Number(num));
        const sql = generateSupplierInsert('supplier', ['supplier_name'], suppliersName);
        fs.writeFile("insertSuppliers.sql", sql, (err) => {
            if (err) console.log(err);
        });
        readline.close();
    });



}

start();