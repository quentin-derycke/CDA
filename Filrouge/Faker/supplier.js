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
function generateSupplier(nbreSupplier) {
    let suppliers = [];
    for (let i = 0; i < nbreSupplier; i++) {
        suppliers.push(faker_1.faker.company.name());
    }
    return suppliers;
}
function generateSupplierInsert(tableName, column, suppliersName) {
    let values = '';
    for (let i = 0; i < suppliersName.length; i++) {
        values += '('
            + '\"' + suppliersName[i] + `")${(i == suppliersName.length - 1) ? ';' : ','}` + `\n`;
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
        const suppliersName = generateSupplier(Number(num));
        const sql = generateSupplierInsert('supplier', ['supplier_name'], suppliersName);
        fs.writeFile("insertSuppliers.sql", sql, (err) => {
            if (err)
                console.log(err);
        });
        readline.close();
    });
}
start();
