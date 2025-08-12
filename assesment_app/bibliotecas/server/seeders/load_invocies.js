import fs from "fs";
import path, { resolve } from "path";
import csv from "csv-parser";
import { pool } from "../connection_database.js";

export async function loadInvoicesToDataBase() {
    const ruteFile = path.resolve('bibliotecas/server/data/invoices.csv');
    const invoices = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(ruteFile)
            .pipe(csv())
            .on('data', (line) => {
                invoices.push([
                    line.invoice_id,
                    line.customer_id,
                    line.status_,
                    line.type_,
                    line.number_invoice,
                    line.invoice_date,
                    line.invoiced_amount
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO invoices (invoice_id,customer_id,status_,type_,number_invoice,invoice_date,invoiced_amount) VALUES ? ';
                    const [result] = await pool.query(sql, [invoices]);

                    console.log(`Were inserted ${result.affectedRows} invoices.`);
                    resolve();
                } catch (error) {
                    console.error('Error inserting invoices', error.message);
                    reject(error);
                }
            })
            .on('error', (error) => {
                console.log('Error reading invoices CSV file', error.message);
                reject(error);
            })
    })
}