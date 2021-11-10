import React from "react";
import { Image } from "react-native";


const imageMap = {
    "1000Hornero.png": require("../../../../../assets/billetes/1000Hornero.png"),
    "500Yaguarete.png": require("../../../../../assets/billetes/500Yaguarete.png"),
    "200.png": require("../../../../../assets/billetes/200.png"),
    "100Eva.png": require("../../../../../assets/billetes/100Eva.png"),
    "100RocaV1.png": require("../../../../../assets/billetes/100RocaV1.png"),
    "100Taruca.png": require("../../../../../assets/billetes/100Taruca.png"),
    "50Condor.png": require("../../../../../assets/billetes/50Condor.png"),
    "50Malvinas.png": require("../../../../../assets/billetes/50Malvinas.png"),
    "50Sarmiento.png": require("../../../../../assets/billetes/50Sarmiento.png"),
    "20Guanaco.png": require("../../../../../assets/billetes/20Guanaco.png"),
    "20Rosas.png": require("../../../../../assets/billetes/20Rosas.png"),
    "10BelgranoNuevo.png": require("../../../../../assets/billetes/10BelgranoNuevo.png"),
    "10BelgranoViejo.png": require("../../../../../assets/billetes/10BelgranoViejo.png"),
    "10Calden.png": require("../../../../../assets/monedas/10Calden.png"),
    "5Arrayan.png": require("../../../../../assets/monedas/5Arrayan.png"),
    "2Independencia.png": require("../../../../../assets/monedas/2Independencia.png"),
    "2PaloBorracho.png": require("../../../../../assets/monedas/2PaloBorracho.png"),
    "2Sol.png": require("../../../../../assets/monedas/2Sol.png"),
    "1Jacaranda.png": require("../../../../../assets/monedas/1Jacaranda.png"),
    "1Sol.png": require("../../../../../assets/monedas/1Sol.png"),
    "50Centavos.png": require("../../../../../assets/monedas/50Centavos.png"),
    "25CentavosDorada.png": require("../../../../../assets/monedas/25CentavosDorada.png"),
    "25CentavosPlateada.png": require("../../../../../assets/monedas/25CentavosPlateada.png"),
    "10Centavos.png": require("../../../../../assets/monedas/10Centavos.png"),
    "5CentavosBronce.png": require("../../../../../assets/monedas/5CentavosBronce.png"),
    "5CentavosPlata.png": require("../../../../../assets/monedas/5CentavosPlata.png")
}

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//         justifyContent: "space-around",
//         alignItems: "center",
//         margin: "10 0"
//       },
//     wrapper: {
//         flexDirection: "row",
//       },
//     iconsWrapper: {
//         flexDirection: "row",
//         height: 20
//       },
// });

export default function ItemMoney(props){
    const { image } = props

    return(
            <Image source={imageMap[image]}/>
    )
}