import React from "react";
import { Image } from "react-native";

import _1000Hornero from "../../../../../assets/billetes/1000Hornero.png";
import _500Yaguarete from "../../../../../assets/billetes/500Yaguarete.png";
import _200 from "../../../../../assets/billetes/200.png";
import _100Eva from "../../../../../assets/billetes/100Eva.png";
import _100RocaV1 from "../../../../../assets/billetes/100RocaV1.png";
import _100Taruca from "../../../../../assets/billetes/100Taruca.png";
import _50Condor from "../../../../../assets/billetes/50Condor.png";
import _50Malvinas from "../../../../../assets/billetes/50Malvinas.png";
import _50Sarmiento from "../../../../../assets/billetes/50Sarmiento.png";
import _20Guanaco from "../../../../../assets/billetes/20Guanaco.png";
import _20Rosas from "../../../../../assets/billetes/20Rosas.png";
import _10BelgranoNuevo from "../../../../../assets/billetes/10BelgranoNuevo.png";
import _10BelgranoViejo from "../../../../../assets/billetes/10BelgranoViejo.png";
import _10Calden from "../../../../../assets/monedas/10Calden.png";
import _5Arrayan from "../../../../../assets/monedas/5Arrayan.png";
import _2Independencia from "../../../../../assets/monedas/2Independencia.png";
import _2PaloBorracho from "../../../../../assets/monedas/2PaloBorracho.png";
import _2Sol from "../../../../../assets/monedas/2Sol.png";
import _1Jacaranda from "../../../../../assets/monedas/1Jacaranda.png";
import _1Sol from "../../../../../assets/monedas/1Sol.png";
import _50Centavos from "../../../../../assets/monedas/50Centavos.png";
import _25CentavosDorada from "../../../../../assets/monedas/25CentavosDorada.png";
import _25CentavosPlateada from "../../../../../assets/monedas/25CentavosPlateada.png";
import _10Centavos from "../../../../../assets/monedas/10Centavos.png";
import _5CentavosBronce from "../../../../../assets/monedas/5CentavosBronce.png";
import _5CentavosPlata from "../../../../../assets/monedas/5CentavosPlata.png";

const imageMap = {
    "1000Hornero.png": _1000Hornero,
    "500Yaguarete.png": _500Yaguarete,
    "200.png": _200,
    "100Eva.png": _100Eva,
    "100RocaV1.png": _100RocaV1,
    "100Taruca.png": _100Taruca,
    "50Condor.png": _50Condor,
    "50Malvinas.png": _50Malvinas,
    "50Sarmiento.png": _50Sarmiento,
    "20Guanaco.png": _20Guanaco,
    "20Rosas.png": _20Rosas,
    "10BelgranoNuevo.png": _10BelgranoNuevo,
    "10BelgranoViejo.png": _10BelgranoViejo,
    "10Calden.png": _10Calden,
    "5Arrayan.png": _5Arrayan,
    "2Independencia.png": _2Independencia,
    "2PaloBorracho.png": _2PaloBorracho,
    "2Sol.png": _2Sol,
    "1Jacaranda.png": _1Jacaranda,
    "1Sol.png": _1Sol,
    "50Centavos.png": _50Centavos,
    "25CentavosDorada.png": _25CentavosDorada,
    "25CentavosPlateada.png": _25CentavosPlateada,
    "10Centavos.png": _10Centavos,
    "5CentavosBronce.png": _5CentavosBronce,
    "5CentavosPlata.png": _5CentavosPlata
}


export default function ItemMoney(props){
    const { image, style } = props

    return(
            <Image source={imageMap[image]} style={{...style}} />
    )
}