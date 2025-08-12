import { loadCustomersToDataBase } from "./load_customers.js";
import { loadInvoicesToDataBase } from "./load_invocies.js";
import { loadPlatformToDataBase } from "./load_platform.js";
import { loadTransactionsToDataBase } from "./load_transactions.js";

(async () => {
    try {
        console.log('Starting seeders...');

        await loadCustomersToDataBase()
        await loadPlatformToDataBase()
        await loadInvoicesToDataBase()
        await loadTransactionsToDataBase()

        console.log('All seeders executed correctly.')
    } catch (error) {
        console.error('Error executing seeders', error.message);
    } finally {
        process.exit();
    }
})()