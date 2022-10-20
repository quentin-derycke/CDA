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
function generateCategory(nbreCat) {
    let categories = [];
    for (let i = 0; i < nbreCat; i++) {
        categories.push(faker_1.faker.commerce.department());
    }
    return categories;
}
function generateCategoryInsert(tableName, column, categoriesName) {
    let values = '';
    for (let i = 0; i < categoriesName.length; i++) {
        values += '('
            + '\"' + categoriesName[i] + `")${(i == categoriesName.length - 1) ? ';' : ','}` + `\n`;
    }
    return `INSERT INTO ${tableName} (${column}) Values \n${values}`;
}
;
function start() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readline.question(' chose a number?', (num) => {
        const categoriesName = generateCategory(Number(num));
        const sql = generateCategoryInsert('category', ['category_name'], categoriesName);
        fs.writeFile("insertCategories.sql", sql, (err) => {
            if (err)
                console.log(err);
        });
        readline.close();
    });
}
start();
