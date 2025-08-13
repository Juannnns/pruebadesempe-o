import cors from "cors"
import express from "express"
import { pool } from "./connection_database.js"

// Configuration
const app = express()
app.use(cors()) 
app.use(express.json())

// Get all users
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting users' });
  }
});

// Create a user
app.post('/usuarios', async (req, res) => {
  const { nombre_completo, identificacion, direccion, telefono, correo } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre_completo, identificacion, direccion, telefono, correo) VALUES (?, ?, ?, ?, ?)',
      [nombre_completo, identificacion, direccion, telefono, correo]
    );
    res.json({ id_usuario: result.insertId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Get all invoices
app.get('/facturas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM facturas');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting invoices' });
  }
});

// Create an invoice
app.post('/facturas', async (req, res) => {
  const { numero_factura, periodo_facturacion, monto_facturado } = req.body;
  try {
    await pool.query(
      'INSERT INTO facturas (numero_factura, periodo_facturacion, monto_facturado) VALUES (?, ?, ?)',
      [numero_factura, periodo_facturacion, monto_facturado]
    );
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating invoice' });
  }
});

// Get all transactions
app.get('/transacciones', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM transacciones');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting transactions' });
  }
});

// Create a transaction
app.post('/transacciones', async (req, res) => {
  const { id_transaccion, id_usuario, numero_factura, fecha_hora, monto, estado, tipo, plataforma, monto_pagado } = req.body;
  try {
    await pool.query(
      `INSERT INTO transacciones 
      (id_transaccion, id_usuario, numero_factura, fecha_hora, monto, estado, tipo, plataforma, monto_pagado) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_transaccion, id_usuario, numero_factura, fecha_hora, monto, estado, tipo, plataforma, monto_pagado]
    );
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating transaction' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});