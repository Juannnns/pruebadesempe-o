import fs from "fs";
import path, { resolve } from "path";
import csv from "csv-parser";
import { pool } from "../connection_database.js";

export async function loadCustomersToDataBase() {
    const ruteFile = path.resolve('bibliotecas/server/data/customers.csv');
    const customers = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(ruteFile)
            .pipe(csv())
            .on('data', (line) => {
                customers.push([
                    line.customer_id,
                    line.full_name,
                    line.number_id,
                    line.adress,
                    line.phone,
                    line.email
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO customers (customer_id,full_name,number_id,adress,phone,email) VALUES ? ';
                    const [result] = await pool.query(sql, [customers]);

                    console.log(`Were inserted ${result.affectedRows} customers.`);
                    resolve();
                } catch (error) {
                    console.error('Error inserting customers', error.message);
                    reject(error);
                }
            })
            .on('error', (error) => {
                console.log('Error reading customers CSV file', error.message);
                reject(error);
            })
    })
}