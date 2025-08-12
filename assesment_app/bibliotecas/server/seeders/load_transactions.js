import fs from "fs";
import path, { resolve } from "path";
import csv from "csv-parser";
import { pool } from "../connection_database.js";

export async function loadTransactionsToDataBase() {
    const ruteFile = path.resolve('bibliotecas/server/data/transactions.csv');
    const transactions = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(ruteFile)
            .pipe(csv())
            .on('data', (line) => {
                transactions.push([
                    line.transaction_id,
                    line.invoice_id,
                    line.platform_id,
                    line.transaction_date,
                    line.amount,
                    line.amount_pay
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO transactions (transaction_id,invoice_id,platform_id,transaction_date,amount,amount_pay) VALUES ? ';
                    const [result] = await pool.query(sql, [transactions]);

                    console.log(`Were inserted ${result.affectedRows} transactions.`);
                    resolve();
                } catch (error) {
                    console.error('Error inserting transactions', error.message);
                    reject(error);
                }
            })
            .on('error', (error) => {
                console.log('Error reading transactions CSV file', error.message);
                reject(error);
            })
    })
}