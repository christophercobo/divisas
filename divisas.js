// Arreglo de clientes
var clientes = [
    {tipo_documento: 'DNI', numero_documento: '12345678', nombre_completo: 'Juan Perez'},
    {tipo_documento: 'DNI', numero_documento: '98765432', nombre_completo: 'Maria Gomez'},
    {tipo_documento: 'DNI', numero_documento: '87654321', nombre_completo: 'Carlos Sanchez'}
];

// Tipos de documentos permitidos
var tipos_documento = [
    {codigo: 'DNI', nombre: 'Documento de Identidad'},
    {codigo: 'RUC', nombre: 'Registro Único de Contribuyentes'},
    {codigo: 'PAS', nombre: 'Pasaporte'}
];

// Arreglo de tasas de cambio
var tasas = [
    {codigo_moneda: 'USD', nombre_moneda: 'Dólar Americano', tasa_compra: 4050, tasa_venta: 4190},
    {codigo_moneda: 'EUR', nombre_moneda: 'Euro', tasa_compra: 4656, tasa_venta: 4724},
];

// Días hábiles con tildes correctas
var dias_habiles = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];

// Función para cargar listas dinámicamente
function cargarListas() {
    var tipoDocumentoSelect = document.getElementById('tipo_documento');
    var monedaSelect = document.getElementById('moneda');

    tipoDocumentoSelect.innerHTML = '<option value="-1">Seleccione una opción</option>';
    monedaSelect.innerHTML = '<option value="-1">Seleccione una opción</option>';

    tipos_documento.forEach(function(tipo) {
        tipoDocumentoSelect.innerHTML += '<option value="' + tipo.codigo + '">' + tipo.nombre + '</option>';
    });

    tasas.forEach(function(tasa) {
        monedaSelect.innerHTML += '<option value="' + tasa.codigo_moneda + '">' + tasa.nombre_moneda + '</option>';
    });
}

// Función para validar día hábil
function validarDiaHabil() {
    var fecha = new Date();
    var diaSemana = fecha.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase();
    if (!dias_habiles.includes(diaSemana)) {
        alert('Transacción no permitida el día de hoy');
        window.close();
    }
}

// Función para mostrar la hora en tiempo real
function mostrarHora() {
    var fecha = new Date();
    var hora = fecha.getHours().toString().padStart(2, '0');
    var minutos = fecha.getMinutes().toString().padStart(2, '0');
    var segundos = fecha.getSeconds().toString().padStart(2, '0');
    document.getElementById('hora').innerHTML = hora + ':' + minutos + ':' + segundos;
    setTimeout(mostrarHora, 1000);
}

// Función para mostrar nombre del cliente
function mostrarNombreCliente() {
    var tipoDocumento = document.getElementById('tipo_documento').value;
    var numeroDocumento = document.getElementById('numero_documento').value;

    if (tipoDocumento === "-1" || numeroDocumento.trim() === "") {
        document.getElementById('nombre_cliente').value = "";
        return;
    }

    var cliente = clientes.find(function(cliente) {
        return cliente.tipo_documento === tipoDocumento && cliente.numero_documento === numeroDocumento;
    });

    if (cliente) {
        document.getElementById('nombre_cliente').value = cliente.nombre_completo;
    } else {
        document.getElementById('nombre_cliente').value = "";
        alert('Cliente Inexistente');
    }
}

// Función para llenar tasa de compra
function llenarTasaCompra() {
    var moneda = document.getElementById('moneda').value;
    var tasa = tasas.find(function(tasa) {
        return tasa.codigo_moneda === moneda;
    });
    if (tasa) {
        document.getElementById('tasa_compra').value = tasa.tasa_compra;
    }
}

// Función para calcular valor a pagar
function calcularValorPagar() {
    var tasaCompra = parseFloat(document.getElementById('tasa_compra').value);
    var cantidadComprar = parseFloat(document.getElementById('cantidad_comprar').value);
    if (!isNaN(tasaCompra) && !isNaN(cantidadComprar)) {
        var valorPagar = tasaCompra * cantidadComprar;
        document.getElementById('valor_pagar').value = valorPagar.toFixed(2);
    }
}

// Función para llenar fecha del sistema
function llenarFecha() {
    var fecha = new Date();
    document.getElementById('fecha').value = fecha.toLocaleDateString();
}

// Inicializar funciones al cargar la página
window.onload = function() {
    cargarListas();
    validarDiaHabil();
    llenarFecha();
    mostrarHora();
};

// Función para llenar tasa de venta
function llenarTasaVenta() {
    var moneda = document.getElementById('moneda').value;
    var tasa = tasas.find(function(tasa) {
        return tasa.codigo_moneda === moneda;
    });
    if (tasa) {
        document.getElementById('tasa_venta').value = tasa.tasa_venta;
    }
}

// Función para calcular valor a recibir
function calcularValorRecibir() {
    var tasaVenta = parseFloat(document.getElementById('tasa_venta').value);
    var cantidadVender = parseFloat(document.getElementById('cantidad_vender').value);
    if (!isNaN(tasaVenta) && !isNaN(cantidadVender)) {
        var valorRecibir = tasaVenta * cantidadVender;
        document.getElementById('valor_recibir').value = valorRecibir.toFixed(2);
    }
}
