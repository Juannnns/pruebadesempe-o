
# 📌 Financial Data Management System

## Description:
This system solves the problem of managing disorganized financial data from platforms like Nequi and Daviplata, stored in multiple Excel files.

## Features:
 - Normalization (1FN, 2FN, 3FN).
- Relational MySQL database.
 - Buck loading from CSV.
 - CRUD API in express.js.
 - Dashboard in vite 
- Advanced SQL queries 

## 🚀 Technology used 
 - Frontend: Vite@latest
 - Backend: Express.js
 - Database: MySQL
 - Driver: mysql2
 - CSV processing: csv-parser


## 1️⃣ Clone repository 
```
git clone https://github.com/Juannnns/financial-data-system.git
```

## 2️⃣ Install backend dependencies 

```
npm install express mysql2 csv-parser
```

## 3️⃣ Install frontend dependencies 
```
npm install vite@lastest
```


## 📊 Datable normalization 
- 1FN: remove repeating groups and ensure atomic values
-  2FN: remove partial dependencies of composite keys
- 3FN: remove transitive dependencies


## 📥 Buck load from CSV 
The original .xlsx file is converted to .csv and processed with csv-parser to insert it into the database.

## 🖥 CRUD API
 Functions:
 - Create: Add records 
 - Read: retrieve date 
 - Update: modify existing records 
- Delete: remove records 

## 📌 Advance queries (run from Postman):
1. Total paid for customer 
 2. Pending invoices with customer and transaction data
 3. Transactions by platform (Nequi, Daviplata)

## 4️⃣ Start backend
```
node server.js 
```


##5️⃣ Start frontend
```
npm run dev
```

