// let money = [{
//     "id": 13,
//     "quantity": 14,
//     "moneyId": 1,
//     "userId": 1,
//     "image": "1000Hornero.png",
//     "amount": 1000,
//     "isCoins": 0
// }, {
//     "id": 12,
//     "quantity": 9,
//     "moneyId": 12,
//     "userId": 1,
//     "image": "500Yaguarete.png",
//     "amount": 500,
//     "isCoins": 0
// }, {
//     "id": 11,
//     "quantity": 10,
//     "moneyId": 11,
//     "userId": 1,
//     "image": "200.png",
//     "amount": 200,
//     "isCoins": 0
// }, {
//     "id": 10,
//     "quantity": 5,
//     "moneyId": 10,
//     "userId": 1,
//     "image": "100Taruca.png",
//     "amount": 100,
//     "isCoins": 0
// }, {
//     "id": 10,
//     "quantity": 0,
//     "moneyId": 10,
//     "userId": 1,
//     "image": "5pe.png",
//     "amount": 5,
//     "isCoins": 0
// }, {
//     "id": 10,
//     "quantity": 0,
//     "moneyId": 10,
//     "userId": 1,
//     "image": "5pe_moneda.png",
//     "amount": 5,
//     "isCoins": 1
// }
//     , {
//         "id": 10,
//         "quantity": 10,
//         "moneyId": 10,
//         "userId": 1,
//         "image": "1pe.png",
//         "amount": 0.10,
//         "isCoins": 0
//     }];

function copyMoney(moneyEntry, quantity) {
    let copy = {...moneyEntry};
    copy.quantity = quantity;
    return copy;
}

function getTotales(billetes) {
    return billetes.reduce((acum, current) => {
        let cantBilletes = acum.cantBilletes + (current.isCoins ? 0 : (1 * current.quantity));
        let cantMonedas = acum.cantMonedas + (current.isCoins ? (1 * current.quantity) : 0);
        return {
            amount: acum.amount + current.amount * current.quantity,
            cantBilletes: cantBilletes,
            cantMonedas: cantMonedas,
        };
    }, {amount: 0, cantBilletes: 0, cantMonedas: 0});
}

function pagarConRecursivo(amount, myMoney) {

    if (amount === 0)
        return [];

    let totalEnBilletera = myMoney.reduce((acum, current) => {
        return acum + current.amount * current.quantity;
    }, 0);

    if (totalEnBilletera < amount)
        return [];

    let resultados = [];

    for (let index of myMoney.entries()) {
        // your code goes here
        const moneyEntry = myMoney[index];
        if (moneyEntry.quantity === 0)
            continue;

        if (moneyEntry.amount >= amount) {
            resultados.push({
                billetes: [copyMoney(moneyEntry, 1)],
                vuelto: moneyEntry.amount - amount
            });
        } else {

            //Lo que hay que pagar no entra en el billete

            let veces = Math.trunc(amount / moneyEntry.amount);

            if (veces >= 1) {
                let cantidadBilletes = Math.min(veces, moneyEntry.quantity)

                let vuelto = amount - (moneyEntry.amount * cantidadBilletes);
                vuelto = +vuelto.toFixed(2); //Se queda solo 2 decimales, elimina los ceros a la derecha

                if (vuelto > 0 && moneyEntry.quantity > veces) {
                    let auxBilletes = [copyMoney(moneyEntry, cantidadBilletes + 1)];
                    let newResultado = {
                        billetes: auxBilletes,
                        vuelto: moneyEntry.amount * (cantidadBilletes + 1) - amount,
                        totales: getTotales(auxBilletes)
                    };
                    resultados.push(newResultado);
                }

                if (vuelto === 0) {
                    let auxBilletes = [copyMoney(moneyEntry, cantidadBilletes)];
                    let newResultado = {
                        billetes: auxBilletes,
                        vuelto: moneyEntry.amount * cantidadBilletes - amount,
                        totales: getTotales(auxBilletes)
                    };
                    resultados.push(newResultado);
                } else {

                    let ret = pagarConRecursivo(amount - moneyEntry.amount * cantidadBilletes, myMoney.slice(index + 1));
                    //Ret tiene un monton de resultados posibles, cada resultado se le agrega al resultado parcial actual

                    for (const unRet of ret) {
                        let billetes = [copyMoney(moneyEntry, cantidadBilletes), ...(unRet.billetes || [])];
                        let totales = getTotales(billetes);
                        let newResultado = {
                            billetes: billetes,
                            vuelto: totales.amount - amount,
                            totales: totales
                        };
                        resultados.push(newResultado);

                    }
                }


            }


        }
    }


    return resultados;
}

function sortResultados(resultados) {
     resultados.sort((a,b)=> {
        if (a.vuelto < b.vuelto)
            return -1;
         if (a.vuelto > b.vuelto)
             return 1;

         if (a.totales.cantBilletes < b.totales.cantBilletes)
             return -1
         if (a.totales.cantBilletes > b.totales.cantBilletes)
             return 1
         return 0
     })

    return resultados;
}

function pagarCon(amount, myMoney ) {
    let res = pagarConRecursivo(amount, myMoney);
    sortResultados(res)
    return res;
}

//let resultado = pagarCon(1000.1, money);
//console.log(JSON.stringify(resultado, null, 2));
//pagarConRecursivo(10, money);

export default pagarCon;