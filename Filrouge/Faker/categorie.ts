import { faker } from "@faker-js/faker";
import * as fs from 'fs';



function generateCategory(nbreCat : number) : string[] {
    let categories : string[] = [];
    for (let i = 0; i < nbreCat; i++) {
        categories.push(faker.commerce.department());
    }
    return categories; 

}
function generateCategoryInsert( tableName: string, column: string[], categoriesName: string[]) : string {
    
   
    
    
    let values: string = '';
    for (let i = 0 ; i < categoriesName.length; i++ )
    {
        values += '('
        + '\"' +categoriesName[i]+ `")${ (i == categoriesName.length - 1) ? ';' : ',' }` + `\n` 

    }
return `INSERT INTO ${tableName} (${column}) Values \n${values}`;
};


function start() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });


    readline.question(' chose a number?', (num: any) => {
        const categoriesName = generateCategory(Number(num));
        const sql = generateCategoryInsert('category', ['category_name'], categoriesName);
        fs.writeFile("insertCategories.sql", sql, (err) => {
            if (err) console.log(err);
        });
        readline.close();
    });



}

start();