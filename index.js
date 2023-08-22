const express = require("express")
const http  = require("http");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());

app.post("/", function(req, res){
    var requito = JSON.stringify(req.body,0 ,2);
    var requi = req.body;
    if(requi.hasOwnProperty('challenge')){
        console.log(requi);
        res.status(200).send(requi);
        res.end();
    }else{
        var tablero = requi.event.boardId;
        if(tablero == 4855583231){//tablero de las aperturas de caja
            // console.log("este es el de la apertura de cajas");
            // console.log(requito);
            var sucursal = requi.event.columnValues.selecci_n__nica.label.text;
            switch(sucursal){
                case "SAN PABLO 1":
                    url= "http://192.168.100.250:1619/storetools/public/api/Cashier/opencashier";
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
            if(firmaadm == "CON FIRMA" || firmag == "CON FIRMA"){ 
                if(movimiento == "MAL DEVOLUCION"){
                    var tcko = requi.event.columnValues.texto_corto3.value;
                    var tckd = requi.event.columnValues.texto_corto4.value;
                    var obs = requi.event.columnValues.texto_corto9.value;
                    var  requerimento = {
                        "sucursal" : sucursal,
                        "caja" : caja,
                        "solicitante" : nombre,
                        "tipo_mov" : movimiento,
                        "obs" : obs,
                        "tcko" : tcko,
                        "tckd" : tckd,
                        "firma": firmag,
                        "cajero":cajero
                    };
                    invoiceurl(url,requerimento,sucursal);
                }else if(movimiento == "RETIRADA MAL"){
                    var retirada = requi.event.columnValues.n_mero.value;//codigo de retirada
                    var observacion  = requi.event.columnValues.texto_largo.text;//observacion de el formulario
                    var condicion = requi.event.columnValues.selecci_n__nica81.label.text;//modifica o eliminar
                    if(condicion == "MODIFICAR"){
                        var monton = requi.event.columnValues.n_mero6.value;//monto nuevo de la retirada
                    }else{
                        var monton = 0;
                    }
                    var requerimento = {
                        "retirada": retirada,
                        "observacion": observacion,
                        "condicion":condicion,
                        "montonuevo":monton,
                        "caja":caja,
                        "sucursal":sucursal,
                        "solicitante":nombre,
                        "tipo_mov":movimiento,
                        "cajero":cajero
                    }
                    invoiceurl(url,requerimento,sucursal);
                }else if(movimiento == "DESCUADRE"){
                    var requerimento = {
                        "caja":caja,
                        "sucursal":sucursal,
                        "solicitante":nombre,
                        "tipo_mov":movimiento,
                        "cajero":cajero
                    }
                    invoiceurl(url,requerimento,sucursal);
                }else{
        
                }
            }else{
                console.log("NO HAY FIRMAS");
                var requerimento = {
                    "mensaje":"no hay firmas"
                }
                invoiceurl(url,requerimento,sucursal);
                
            }
        
        }else if (tablero == 2275639723){//tablero de cifras control
            var columns = requi.event.columnValues;
            var envio = columns.texto.value;
            var quien = columns.men__desplegable.chosenValues[0].name;
            var msg = "Recibiste una cifra de " + quien + " con la descripcion " + envio;
            var request = require("request");
            var options = {
            method: 'POST',
            url: 'https://api.ultramsg.com/instance9800/messages/chat',
            headers: {'content-type': ' application/x-www-form-urlencoded'},
            form: {
                "token": "7lxqd2rwots9u4lv",
                "to": "+525573461022",
                "body": msg
            }
            };
            request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            });
            // console.log("este es el de las cifras control");
        }else if(tablero == 4403681072 ){// tablero justificaciones
            console.log("este es el de justificaciones");
        }else if(tablero == 4738541896 ){//tablero check list inicio de operaciones
            var idmon = requi.event.pulseId;
            var sucursal = null;
            var url = "http://192.168.12.173:1619/Assist/public/api/Monday/cheklistiop";
            var requerimento = {
                "id":idmon
            };
            // console.log(requerimento);
            invoiceurl(url,requerimento,sucursal)

            console.log("este es el de checklist inicio de operaciones");
        }else if(tablero == 4738652916 ){//check list final de operaciones
            var idmon = requi.event.pulseId;
            var sucursal = null;
            var url = "http://192.168.12.173:1619/Assist/public/api/Monday/cheklistfinop";
            var requerimento = {
                "id":idmon
            };
            // console.log(requerimento);
            invoiceurl(url,requerimento,sucursal)
            console.log("este es el de checklist final de operaciones");
        }else if(tablero == 4760726454 ){//check list administrativos
            console.log("este es el de checklist administrativos");
        }else if(tablero == 4775379200 ){//checke list auditoria
            console.log("este es el de auditoria");
        }else if(tablero == 4813574060){//encusta clima laboral
            console.log("este es el de encuestaclimalaboral");
        }else if(tablero == 1520861792){//lista personal cambio
            console.log("este es el de la lista personal camios")
        }else if(tablero == 4933901663){// actas administrativas
            // console.log(requito);
            console.log("este es el de actas administrativas bro");
            var url = "http://192.168.12.173:1619/Assist/public/api/resources/actadmin"
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
                "sucursal":sucursal,
                "miembro":miembro,
                "puesto":puesto,
                "motivo":motivo,
                "consmie":consmie,
                "contes":contes,
                "fecha":fecha,
                "conclusion":conclusion,
                "hora":hora
            }
            // console.log(requerimento);
            invoiceurl(url,requerimento,sucursal);
        }else{
            console.log("el tablero que recibi "+ tablero)
        }
        res.end();
    }

})

function invoiceurl(url,data,sucursal){
    var requerimentoJSON = JSON.stringify(data);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requerimentoJSON
    })
    .then(response => response.text())
    .then(data => {
        console.log("respuesta " + data + " " + sucursal);
    })
    .catch(error => {
        console.log(error);
    });
}


server.listen(process.env.PORT || 3000, function(){
    console.log('Express server listening on port 3000.');
})