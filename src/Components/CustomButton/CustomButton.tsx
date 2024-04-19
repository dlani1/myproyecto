import React from "react";
import { useState } from "react";
import './CustomButton.css';


//genera una etiqueta <CustomButton/> es como nuestro ion-Button
interface valores{
    texto:string,
    posicion:number
}
let movimientos: number[]=[];
let tableroData: string[]=['','','',
                            '','','',
                            '','',''];

function CustomButton({texto, posicion}:valores){
    const [contador, setContador] = useState(0);
   
    const sumar = () =>{
        setContador(variable=>{
            return variable+1;
        });
    };
    const [estadoGato, setEstadoGato] = useState('-');
    
    const funciones = (n:number)=>{
        cambiarEstado(n);
        agregarMovimiento(n);
     };
     const agregarMovimiento = (n:number)=>{
        movimientos.push(n);
        console.log(movimientos);

     };
    const cambiarEstado = (posicion:number) =>{
    setEstadoGato(estado=>{
       const nuevoEstado = estado=='-'? 'x': estado=='x'?'o':'-';
    tableroData[posicion] = nuevoEstado;
       return nuevoEstado;
    });
    };

    return (
        <div onClick={()=>{funciones(posicion)}}  className="mi-button">
            {estadoGato}
        </div>
    );
}
export default CustomButton;