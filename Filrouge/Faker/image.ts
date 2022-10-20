import { faker } from "@faker-js/faker";
import * as fs from 'fs';


interface Iimg {
    name: string,
    path: string
}

function generateImg(): Iimg {
    let img : Iimg = {


        path : faker.image.imageUrl(),
        name : faker.lorem.word(1)
    }
return img;
}


function generateImgs(nbreImg: number): Iimg[] {
    let imgs : Iimg[] = [];
    for (let i = 0; i < nbreImg; i++) {
        imgs.push(generateImg());
    }
    return imgs;
}

function generateImgsInsert(tableName: string, columnsName: string[], imgs: Iimg[]): string {
    let column: string = '';
    for (let i = 0; i < columnsName.length; i++) {
        column += columnsName[i];
        if (i == columnsName.length - 1) continue;
        column += ', '
    }

    let values: string = '';
    for (let i = 0; i < imgs.length; i++ ) {
        values += '('
      
        + '\"' + imgs[i].name + '\",'
          + '\"' + imgs[i].path + `) ${(i == imgs.length - 1) ? ';' : ','}` + `\n`
    }
    return `INSERT INTO ${tableName} (${column})\nVALUES\n${values}`;
}


function start() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });


    readline.question(' chose a number?', (num: any) => {
        const imgs = generateImgs(Number(num));
        const sql = generateImgsInsert('image', ['image_title', 'image_path'], imgs);
        fs.writeFile("insertImgs.sql", sql, (err) => {
            if (err) console.log(err);
        });
        readline.close();
    });



}

start();
