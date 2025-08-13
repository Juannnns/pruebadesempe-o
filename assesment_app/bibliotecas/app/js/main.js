const API_URL = "http://localhost:3000/transacciones";
const tablaTransacciones = document.getElementById("tablaTransacciones");
const formularioTransaccion = document.getElementById("formularioTransaccion");

// Function to handle API requests
async function manejarPeticion(url, opciones = {}) {
    try {
        const respuesta = await fetch(url, opciones);
        if (!respuesta.ok) {
            throw new Error(`HTTP Error! status: ${respuesta.status}`);
        }
        return await respuesta.json();
    } catch (error) {
        console.error("API error:", error);
        alert(`Error: ${error.message}`);
        throw error;
    }
}

// Load all transactions
async function cargarTransacciones() {
    try {
        const datos = await manejarPeticion(API_URL);
        
        tablaTransacciones.innerHTML = "";
        datos.forEach(transaccion => {
            tablaTransacciones.innerHTML += `
                <tr>
                    <td>${transaccion.id_transaccion}</td>
                    <td>${transaccion.id_usuario || 'N/A'}</td>
                    <td>${transaccion.numero_factura || 'N/A'}</td>
                    <td>$${transaccion.monto.toLocaleString()}</td>
                    <td>${transaccion.fecha_hora ? transaccion.fecha_hora.split("T")[0] : ''}</td>
                    <td class="${transaccion.estado === 'Fallida' ? 'text-danger' : transaccion.estado === 'Completada' ? 'text-success' : ''}">
                        ${transaccion.estado}
                    </td>
                    <td>${transaccion.plataforma}</td>
                    <td>$${transaccion.monto_pagado.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarTransaccion('${transaccion.id_transaccion}')">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarTransaccion('${transaccion.id_transaccion}')">Delete</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error loading transactions:", error);
    }
}

// Load pending transactions
window.cargarTransaccionesPendientes = async () => {
    try {
        const datos = await manejarPeticion(`${API_URL}/pendientes`);
        
        tablaTransacciones.innerHTML = "";
        datos.forEach(transaccion => {
            tablaTransacciones.innerHTML += `
                <tr>
                    <td>${transaccion.id_transaccion}</td>
                    <td>${transaccion.nombre_completo}</td>
                    <td>${transaccion.numero_factura}</td>
                    <td>$${transaccion.monto.toLocaleString()}</td>
                    <td>${transaccion.fecha_hora.split("T")[0]}</td>
                    <td class="text-warning">${transaccion.estado}</td>
                    <td>${transaccion.plataforma}</td>
                    <td>$${transaccion.monto_pagado.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarTransaccion('${transaccion.id_transaccion}')">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarTransaccion('${transaccion.id_transaccion}')">Delete</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error loading pending transactions:", error);
    }
};

// Load failed transactions
window.cargarTransaccionesFallidas = async () => {
    try {
        const datos = await manejarPeticion(`${API_URL}/fallidas`);
        
        tablaTransacciones.innerHTML = "";
        datos.forEach(transaccion => {
            tablaTransacciones.innerHTML += `
                <tr>
                    <td>${transaccion.id_transaccion}</td>
                    <td>${transaccion.nombre_completo}</td>
                    <td>${transaccion.numero_factura}</td>
                    <td>$${transaccion.monto.toLocaleString()}</td>
                    <td>${transaccion.fecha_hora.split("T")[0]}</td>
                    <td class="text-danger">${transaccion.estado}</td>
                    <td>${transaccion.plataforma}</td>
                    <td>$${transaccion.monto_pagado.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarTransaccion('${transaccion.id_transaccion}')">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarTransaccion('${transaccion.id_transaccion}')">Delete</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error loading failed transactions:", error);
    }
};

// Search transactions by user
window.buscarTransaccionesUsuario = async () => {
    const idUsuario = document.getElementById("id_usuario_busqueda").value;
    if (!idUsuario) {
        alert("Please enter a user ID");
        return;
    }

    try {
        const datos = await manejarPeticion(`${API_URL}/usuario/${idUsuario}`);
        
        tablaTransacciones.innerHTML = "";
        datos.forEach(transaccion => {
            tablaTransacciones.innerHTML += `
                <tr>
                    <td>${transaccion.id_transaccion}</td>
                    <td>${transaccion.nombre_completo}</td>
                    <td>${transaccion.numero_factura}</td>
                    <td>$${transaccion.monto.toLocaleString()}</td>
                    <td>${transaccion.fecha_hora.split("T")[0]}</td>
                    <td class="${transaccion.estado === 'Fallida' ? 'text-danger' : transaccion.estado === 'Completada' ? 'text-success' : ''}">
                        ${transaccion.estado}
                    </td>
                    <td>${transaccion.plataforma}</td>
                    <td>$${transaccion.monto_pagado.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarTransaccion('${transaccion.id_transaccion}')">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarTransaccion('${transaccion.id_transaccion}')">Delete</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error searching transactions by user:", error);
    }
};

// Save/Update transaction
formularioTransaccion.addEventListener("submit", async (e) => {
    e.preventDefault();

    const transaccion = {
        id_usuario: document.getElementById("id_usuario").value,
        numero_factura: document.getElementById("numero_factura").value,
        fecha_hora: document.getElementById("fecha_hora").value,
        monto: document.getElementById("monto").value,
        estado: document.getElementById("estado").value,
        tipo: document.getElementById("tipo").value,
        plataforma: document.getElementById("plataforma").value,
        monto_pagado: document.getElementById("monto_pagado").value
    };

    const idTransaccion = document.getElementById("id_transaccion").value;

    try {
        if (idTransaccion) {
            // Update
            await manejarPeticion(`${API_URL}/${idTransaccion}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transaccion)
            });
            alert("Transaction successfully updated");
        } else {
            // Create
            await manejarPeticion(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transaccion)
            });
            alert("Transaction successfully created");
        }
        
        formularioTransaccion.reset();
        cargarTransacciones();
    } catch (error) {
        console.error("Error saving transaction:", error);
    }
});

// Edit transaction
window.editarTransaccion = async (id) => {
    try {
        const transaccion = await manejarPeticion(`${API_URL}/${id}`);
        
        document.getElementById("id_transaccion").value = transaccion.id_transaccion;
        document.getElementById("id_usuario").value = transaccion.id_usuario;
        document.getElementById("numero_factura").value = transaccion.numero_factura;
        document.getElementById("monto").value = transaccion.monto;
        document.getElementById("fecha_hora").value = 
            transaccion.fecha_hora ? transaccion.fecha_hora.split("T")[0] + "T" + transaccion.fecha_hora.split("T")[1].substring(0,5) : "";
        document.getElementById("estado").value = transaccion.estado;
        document.getElementById("tipo").value = transaccion.tipo;
        document.getElementById("plataforma").value = transaccion.plataforma;
        document.getElementById("monto_pagado").value = transaccion.monto_pagado;
    } catch (error) {
        console.error("Error editing transaction:", error);
    }
};

// Delete transaction
window.eliminarTransaccion = async (id) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
        try {
            await manejarPeticion(`${API_URL}/${id}`, { method: "DELETE" });
            cargarTransacciones();
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    }
};

// Initialize
cargarTransacciones();