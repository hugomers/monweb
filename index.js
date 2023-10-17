const express = require("express")
const http = require("http");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());

app.post("/", function (req, res) {
    var requito = JSON.stringify(req.body, 0, 2);
    var requi = req.body;
    if (requi.hasOwnProperty('challenge')) {
        console.log(requi);
        res.status(200).send(requi);
        res.end();
    } else {
        var tablero = requi.event.boardId;
        if (tablero == 4855583231) {//tablero de las aperturas de caja
            // console.log("este es el de la apertura de cajas");
            // console.log(requito);
            var sucursal = requi.event.columnValues.selecci_n__nica.label.text;
            switch (sucursal) {
                case "SAN PABLO 1":
                    url = "http://192.168.100.250:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "SAN PABLO 2":
                    url = "http://192.168.60.253:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "SAN PABLO 3":
                    url = "http://192.168.62.250:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "SAN PABLO C":
                    url = "http://192.168.60.249:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "SOTANO":
                    url = "http://192.168.110.253:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "CORREO 1":
                    url = "http://192.168.30.253:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "CORREO 2":
                    url = "http://192.168.50.253:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "RAMON CORONA 1":
                    url = "http://192.168.10.211:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "RAMON CORONA 2":
                    url = "http://192.168.10.212:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "BOLIVIA":
                    url = "http://192.168.70.253:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "BRASIL 1":
                    url = "http://192.168.80.252:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "BRASIL 2":
                    url = "http://192.168.80.249:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "BRASIL 3":
                    url = "http://192.168.82.253:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "APARTADO 1":
                    url = "http://192.168.20.253:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "APARTADO 2":
                    url = "http://192.168.20.201:1619/storetools/public/api/Cashier/opencashier";
                    break;
                case "PUEBLA":
                    url = "http://192.168.90.253:1619/storetools/public/api/Cashier/opencashier";
                    break;
            }
            var caja = requi.event.columnValues.selecci_n__nica8.label.text;
            var nombre = requi.event.columnValues.selecci_n_m_ltiple.chosenValues[0].name;
            var movimiento = requi.event.columnValues.selecci_n__nica2.label.text;
            var cajero = requi.event.columnValues.men__desplegable.chosenValues[0].name;
            var firmg = requi.event.columnValues.firma;
            var firmadm = requi.event.columnValues.firma0;
            var firmaadm = firmadm == undefined ? "SIN FIRMA" : "CON FIRMA";
            var firmag = firmg == undefined ? "SIN FIRMA" : "CON FIRMA";
            if (firmaadm == "CON FIRMA" || firmag == "CON FIRMA") {
                if (movimiento == "MAL DEVOLUCION") {
                    var tcko = requi.event.columnValues.texto_corto3.value;
                    var tckd = requi.event.columnValues.texto_corto4.value;
                    var obs = requi.event.columnValues.texto_corto9.value;
                    var requerimento = {
                        "sucursal": sucursal,
                        "caja": caja,
                        "solicitante": nombre,
                        "tipo_mov": movimiento,
                        "obs": obs,
                        "tcko": tcko,
                        "tckd": tckd,
                        "firma": firmag,
                        "cajero": cajero
                    };
                    invoiceurl(url, requerimento, sucursal);
                } else if (movimiento == "RETIRADA MAL") {
                    var retirada = requi.event.columnValues.n_mero.value;//codigo de retirada
                    var observacion = requi.event.columnValues.texto_largo.text;//observacion de el formulario
                    var condicion = requi.event.columnValues.selecci_n__nica81.label.text;//modifica o eliminar
                    if (condicion == "MODIFICAR") {
                        var monton = requi.event.columnValues.n_mero6.value;//monto nuevo de la retirada
                    } else {
                        var monton = 0;
                    }
                    var requerimento = {
                        "retirada": retirada,
                        "observacion": observacion,
                        "condicion": condicion,
                        "montonuevo": monton,
                        "caja": caja,
                        "sucursal": sucursal,
                        "solicitante": nombre,
                        "tipo_mov": movimiento,
                        "cajero": cajero
                    }
                    invoiceurl(url, requerimento, sucursal);
                } else if (movimiento == "DESCUADRE") {
                    var requerimento = {
                        "caja": caja,
                        "sucursal": sucursal,
                        "solicitante": nombre,
                        "tipo_mov": movimiento,
                        "cajero": cajero
                    }
                    invoiceurl(url, requerimento, sucursal);
                } else {

                }
            } else {
                console.log("NO HAY FIRMAS");
                var requerimento = {
                    "mensaje": "no hay firmas"
                }
                invoiceurl(url, requerimento, sucursal);

            }

        } else if (tablero == 2275639723) {//tablero de cifras control
            var columns = requi.event.columnValues;
            var envio = columns.texto.value;
            var quien = columns.men__desplegable.chosenValues[0].name;
            var msg = "Recibiste una cifra de " + quien + " con la descripcion " + envio;
            var numero = "+525573461022";
            sendmsg(msg, numero);
            // console.log("este es el de las cifras control");
        } else if (tablero == 4403681072) {// tablero justificaciones
            console.log("este es el de justificaciones");
        } else if (tablero == 4738541896) {//tablero check list inicio de operaciones
            var idmon = requi.event.pulseId;
            var sucursal = null;
            var url = "http://192.168.10.61:1619/Assist/public/api/Monday/cheklistiop";
            var requerimento = {
                "id": idmon
            };
            // console.log(requerimento);
            invoiceurl(url, requerimento, sucursal)

            console.log("este es el de checklist inicio de operaciones");
        } else if (tablero == 4738652916) {//check list final de operaciones
            var idmon = requi.event.pulseId;
            var sucursal = null;
            var url = "http://192.168.10.61:1619/Assist/public/api/Monday/cheklistfinop";
            var requerimento = {
                "id": idmon
            };
            // console.log(requerimento);
            invoiceurl(url, requerimento, sucursal)
            console.log("este es el de checklist final de operaciones");
        } else if (tablero == 4760726454) {//check list administrativos
            console.log("este es el de checklist administrativos");
        } else if (tablero == 4775379200) {//checke list auditoria
            console.log("este es el de auditoria");
        } else if (tablero == 4813574060) {//encusta clima laboral
            console.log("este es el de encuestaclimalaboral");
        } else if (tablero == 1520861792) {//lista personal cambio
            console.log("este es el de la lista personal camios")
        } else if (tablero == 4933901663) {// actas administrativas
            // console.log(requito);
            console.log("este es el de actas administrativas bro");
            var url = "http://192.168.10.61:1619/Assist/public/api/resources/actadmin"
            var columns = requi.event.columnValues;
            var sucursal = columns.sucursal5.label.text;
            var miembro = columns.selecci_n_m_ltiple.chosenValues[0].name;
            var puesto = columns.puesto6.label.text;
            var motivo = columns.texto_largo.text;
            var consmie = columns.texto_largo1 == undefined ? null : columns.texto_largo1.text;
            var contes = columns.texto_largo4 == undefined ? null : columns.texto_largo4.text;
            var conclusion = columns.texto_largo2.text;
            // var fecha = requi.event.triggerTime;
            var fecha = columns.fecha.date;
            var hora = columns.texto_corto2.value;
            var requerimento = {
                "sucursal": sucursal,
                "miembro": miembro,
                "puesto": puesto,
                "motivo": motivo,
                "consmie": consmie,
                "contes": contes,
                "fecha": fecha,
                "conclusion": conclusion,
                "hora": hora
            }
            // console.log(requerimento);
            invoiceurl(url, requerimento, sucursal);
        } else if (tablero == 5315761570) {
            var tipo = requi.event.type;
            if (tipo === "create_pulse") {
                var columns = requi.event.columnValues;
                var origen = columns.sucursal_origen3.label.text;
                var numor = null;
                switch (origen) {
                    case "Apartado Uno":
                        numor = '+525539110690';
                        break;
                    case "Apartado Dos":
                        numor = '+525624870112';
                        break;
                    case "Bolivia":
                        numor = '+525540139765';
                        break;
                    case "Brasil Uno":
                        numor = '+525539063473';
                        break;
                    case "Brasil Dos":
                        numor = '5562287490';
                        break;
                    case "Brasil Tres":
                        numor = '5215537045056@c.us';
                        break;
                    case "Correo Uno":
                        numor = '5215539945073@c.us';
                        break;
                    case "Correo Dos":
                        numor = '5215535652858@c.us';
                        break;
                    case "Ecommerce":
                        numor = '5215539054416@c.us';
                        break;
                    case "Sucursal Puebla":
                        numor = '5215541282698@c.us';
                        break;
                    case "Ramon Corona Uno":
                        numor = '5215554699569@c.us';
                        break;
                    case "Ramon Corona Dos":
                        numor = '5215554699569@c.us';
                        break;
                    case "Sótano":
                        numor = '5215543918004@c.us';
                        break;
                    case "San Pablo Uno":
                        numor = '5215534507385@c.us';
                        break;
                    case "San Pablo Dos":
                        numor = '5537148456';
                        break;
                    case "San Pablo Tres":
                        numor = '5215532605854@c.us';
                        break;
                    case "San Pablo C":
                        numor = '5215535538498@c.us';
                        break;
                }
                var destino = columns.sucursal_destino8.label.text;
                var observacion = columns.texto2.value;
                var devolucion = columns.texto.value;
                var msgor = "El traspaso de la devolucion " + devolucion + " esta en revision favor de esperar la confirmacion :)";
                var msg1 = "La sucursal " + origen + " solicito un traspaso hacia la sucursal " + destino + " de la devolucion " + devolucion + " con la nota " + observacion;
                sendmsg(msgor, numor);
                sendmsg(msg1, "120363188714783436@g.us");
            } else if (tipo === "update_column_value") {
                var dat = [];
                console.log("Loactulicebro");
                var idmod = requi.event.pulseId;
                var url = "http://192.168.10.61:1619/Assist/public/api/Products/trapasDev";
                let query = "query { boards (ids: " + tablero + ") { items (ids: " + idmod + ") { column_values {  text }}}}";

                fetch("https://api.monday.com/v2", {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIwMTgwNzYyMCwidWlkIjoyMDY1ODc3OSwiaWFkIjoiMjAyMi0xMS0yOVQxODoyMToxMS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODM5Njc1MywicmduIjoidXNlMSJ9.nLLLRUTqG86usf18jqEYHIzf62rYA8Lee2coEEyTxlI'
                    },
                    body: JSON.stringify({
                        query: query
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        dat = res.data.boards[0].items[0].column_values
                        var origen = dat[3].text;
                        var destino = dat[4].text;
                        var devolucion = dat[6].text;
                        var observacion = dat[5].text;
                        var requerimento = {
                            origen: origen,
                            destino: destino,
                            devolucion: devolucion,
                            observacion: observacion
                        };
                        console.log(requerimento);

                        invoiceurl(url, requerimento, origen).then(repon => {
                            var respuesta = JSON.parse(repon);
                            console.log(respuesta);
                            var numeroAbono = respuesta.Movimientos.Abono;
                            var numeroFactura = respuesta.Movimientos.FacturaSalida;
                            var numeroEntrada = respuesta.Movimientos.FacturaEntrada;
                            var abono = "mutation {change_simple_column_value (board_id: "+tablero+", item_id: "+idmod+", column_id: \"texto23\", value: \""+numeroAbono+"\") {id}}";
                            var factura ="mutation {change_simple_column_value (board_id: "+tablero+", item_id: "+idmod+", column_id: \"texto1\", value: \""+numeroFactura+"\") {id}}";
                            var recibida = "mutation {change_simple_column_value (board_id: "+tablero+", item_id: "+idmod+", column_id: \"texto7\", value: \""+numeroEntrada+"\") {id}}";
                            var realizado = "mutation {change_simple_column_value (board_id: "+tablero+", item_id: "+idmod+", column_id: \"estado6\", value: \"Realizado\") {id}}"
                            apimon(abono);
                            apimon(factura);
                            apimon(recibida);
                            apimon(realizado);
                        })
                            .catch(error => {
                                console.log(error);
                            });

                    });

            }


        } else if (tablero == 5329441165){
            console.log("ES EL DE LAS FACTURAS RECIBIDAS")
            var idmod = requi.event.pulseId;
            var columns = requi.event.columnValues;
            var factura = columns.texto.value;
            var requerimento = {
                factura: factura
            };
            var url = 'http://192.168.10.61:1619/Assist/public/api/Products/invoiceReceived'
            invoiceurl(url,requerimento,'CEDIS').then(res =>{
                var respuesta = JSON.parse(res);
                console.log(respuesta);
                var frec = respuesta.Movimientos.FacturaEntrada;
                
                var recibida = "mutation {change_simple_column_value (board_id: "+tablero+", item_id: "+idmod+", column_id: \"texto4\", value: \""+frec+"\") {id}}";
                var realizado = "mutation {change_simple_column_value (board_id: "+tablero+", item_id: "+idmod+", column_id: \"status\", value: \"Realizado\") {id}}"
                apimon(recibida);
                apimon(realizado);
            })
            
            
        }else {
            console.log("el tablero que recibi " + tablero)
        }
        res.end();
    }

})

function invoiceurl(url, data, sucursal) {
    var requerimentoJSON = JSON.stringify(data);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requerimentoJSON
    })
        .then(response => response.text())
        .then(data => {
            console.log("respuesta " + data + " " + sucursal);
            return data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
}


function sendmsg(msg, number) {
    var request = require("request");
    var options = {
        method: 'POST',
        url: 'https://api.ultramsg.com/instance9800/messages/chat',
        headers: { 'content-type': ' application/x-www-form-urlencoded' },
        form: {
            "token": "7lxqd2rwots9u4lv",
            "to": number,
            "body": msg
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    });
}

function apimon(query){
     return fetch("https://api.monday.com/v2", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIwMTgwNzYyMCwidWlkIjoyMDY1ODc3OSwiaWFkIjoiMjAyMi0xMS0yOVQxODoyMToxMS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODM5Njc1MywicmduIjoidXNlMSJ9.nLLLRUTqG86usf18jqEYHIzf62rYA8Lee2coEEyTxlI'
        },
        body: JSON.stringify({
            'query': query
        })
    })
        .then(res => res.json())
        .then(res => {
            console.log(JSON.stringify(res, null, 2))
            return res;
        });
}



server.listen(process.env.PORT || 3000, function () {
    console.log('Express server listening on port 3000.');
})