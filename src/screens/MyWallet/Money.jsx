import React, { Fragment } from "react";
import { Image, Text } from "react-native";

export default function Money({ src, name }){


    return(
        <Fragment>
            <Text style={{
                position: "absolute",
                zIndex: 10,
                transform: [{translateX: 120}],
                fontWeight: "bold",
                color: "#ffff0f",
                fontSize: 20,
                textShadowColor: "black",
                textShadowOffset: {width: 10, height: 2},
                textShadowRadius: 30,
            }}
            >{name}</Text>
            <Image width={20} height={20} source={src}/>
        </Fragment>
    )
}