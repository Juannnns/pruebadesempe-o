import fs from "fs";
import path, {resolve} from "path"
import csv from "csv-parser";
import { pool } from "../connection_database.js";

export async function loadPlatformToDataBase() {
    const ruteFile = path.resolve('bibliotecas/server/data/platform.csv');
    const platforms = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(ruteFile)
            .pipe(csv())
            .on('data', (line) => {
                platforms.push([
                    line.platform_id,
                    line.platform_name,
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO platforms (platform_id,platform_name) VALUES ? ';
                    const [result] = await pool.query(sql, [platforms]);

                    console.log(`Were inserted ${result.affectedRows} platform.`);
                    resolve();
                } catch (error) {
                    console.error('Error inserting platform', error.message);
                    reject(error);
                }
            })
            .on('error', (error) => {
                console.log('Error reading platform CSV file', error.message);
                reject(error);
            })
    })
}