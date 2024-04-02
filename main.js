document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnLiquidar").addEventListener("click", function() {
        //! CALCULAR LIQUIDACIÓN
        function calcularLiquidacionEmpleado(sueldo, añosTrabajados) {
            const antiguedad = añosTrabajados * 0.5;
            const indemnizacion = (sueldo * antiguedad) + sueldo;
            return indemnizacion;
        }

        //! CALCULAR ANTIGUEDAD DE VACACIONES
        function calcularDiasVacaciones(añosTrabajados) {
            if (añosTrabajados <= 5) {
                return 14;
            } else if (añosTrabajados <= 10) {
                return 21;
            } else if (añosTrabajados <= 20) {
                return 28;
            } else {
                return 35;
            }
        }

        //! CALCULAR PARA VERIFICAR SI ES UN NÚMERO VÁLIDO
        function esNumeroValido(valor) {
            return !isNaN(valor) && parseFloat(valor) > 0;
        }

        function cotizadorDespido() {
            let empleados = [];
            let numEmpleados;

            do {
                numEmpleados = parseInt(prompt("Ingrese el número de empleados a calcular:"));
            
                if (isNaN(numEmpleados) || numEmpleados <= 0) {
                    let cancelar = confirm("Por favor ingrese un número válido de empleados.\n-Si desea volver atras presione ACEPTAR\n-Si desea cancelar presione CENCELAR");
                    if (cancelar) {
                        continue
                    } else {;
                        alert("Liquidación cancelada.");
                        break;;
                    }
                } 
            } while (isNaN(numEmpleados) || numEmpleados <= 0 || numEmpleados === null);
            

            for (let i = 0; i < numEmpleados; i++) {
                let nombre = prompt("Ingrese el nombre del empleado " + (i + 1) + ":");
                if (nombre === null) {
                    let cancelar = confirm("¿Desea cancelar la liquidación?");
                    if (cancelar) {
                        alert("Liquidación cancelada.");
                        return;
                    } else {
                        i--;
                        continue;
                    }
                }
                nombre = nombre.toLocaleUpperCase();
                
                let sueldo;
                do {
                    sueldo = prompt("Ingrese el sueldo del empleado " + (i + 1) + ":");
                    if (sueldo === null) {
                        let cancelar = confirm("¿Desea cancelar la liquidación?");
                        if (cancelar) {
                            alert("Liquidación cancelada.");
                            return;
                        } 
                    } else if (!esNumeroValido(sueldo)) {
                        alert("Ingrese un valor numérico válido.");
                    }
                } while (!esNumeroValido(sueldo));
                sueldo = parseFloat(sueldo);

                let añosTrabajados;
                do {
                    añosTrabajados = prompt("Ingrese la cantidad de años trabajados del empleado " + (i + 1) + ":");
                    if (añosTrabajados === null) {
                        let cancelar = confirm("¿Desea cancelar la liquidación?");
                        if (cancelar) {
                            alert("Liquidación cancelada.");
                            return;
                        } 
                    } else if (!esNumeroValido(añosTrabajados)) {
                        alert("Ingrese un valor numérico válido.");
                    }
                } while (!esNumeroValido(añosTrabajados));
                añosTrabajados = parseInt(añosTrabajados);

                empleados.push({nombre, sueldo, añosTrabajados});
            }

            //! CALCULAR LIQUIDACION PARA CADA EMPLEADO
            for (let empleado of empleados) {
                let liquidacionTotal = 0;
                let liquidacionDesglosada = [];

                //? DESPIDO
                let liquidacionDespido = calcularLiquidacionEmpleado(empleado.sueldo, empleado.añosTrabajados);
                liquidacionTotal += liquidacionDespido;
                liquidacionDesglosada.push(`Liquidación por despido: $${liquidacionDespido.toLocaleString("es-AR")} Pesos Argentinos`);

                //? AGUINALDO
                let aguinaldoProporcional = (empleado.sueldo / 12) * empleado.añosTrabajados;
                liquidacionTotal += aguinaldoProporcional;
                liquidacionDesglosada.push(`Aguinaldo proporcional: $${aguinaldoProporcional.toLocaleString("es-AR")} Pesos Argentinos`);

                //? VACACIONES NO GOZADAS
                let diasVacacionesNoGozadas = calcularDiasVacaciones(empleado.añosTrabajados);
                let sueldoDiario = empleado.sueldo / 25;
                let vacacionesNoGozadas = sueldoDiario * diasVacacionesNoGozadas;
                liquidacionTotal += vacacionesNoGozadas;
                liquidacionDesglosada.push(`Vacaciones no gozadas (${diasVacacionesNoGozadas} días): $${vacacionesNoGozadas.toLocaleString("es-AR")} Pesos Argentinos`);

                //? LONGITUD DE SEPARADOR 
                let longitudSeparador = 26 + empleado.nombre.length;

        //! RESULTADOS
                console.log(`-${"-".repeat(longitudSeparador)}-`);
                console.log(`----Liquidaciones final ${empleado.nombre}----`);
                for (let detalle of liquidacionDesglosada) {
                    console.log(detalle);
                }
                console.log(`Total: $${liquidacionTotal.toLocaleString("es-AR")} Pesos Argentinos`);
            }
        }

        cotizadorDespido();
    });
});
