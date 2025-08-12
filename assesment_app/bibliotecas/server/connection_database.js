import mysql from "mysql2/promise"

export const pool = mysql.createPool({
    host: "bcvwxrmap9ixcuvnnxf9-mysql.services.clever-cloud.com",
    database: "bcvwxrmap9ixcuvnnxf9",
    port: "3306",
    user: "udvpiucytvucquv0",
    password: "95JuNxWuo6vIbw6f8s4J",
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
})

async function probarConexion() {
    try {
        const connection = await pool.getConnection();
        console.log('Connection to database successful.');
        connection.release();
    } catch (error) {
        console.error('Error connecting to database:', error.message);
    }
}
probarConexion()