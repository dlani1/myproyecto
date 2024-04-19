import React from "react";
import { FiSend } from "react-icons/fi";
import { useState, useEffect } from "react";
import './ChatWebSocket.css';

function ChatWebSocket(){
    const[mensaje, setMensaje] = useState('');
    const[mensajes, setMensajes] = useState([]);
    const[socket, setSocket] = useState(null);
    useEffect(()=>{
        const newSocket = new WebSocket('ws://localhost:8085');
        newSocket.onmessage = (event) => {
            event.data.text().then((text)=>{
                console.log(text);//temporal
                setMensajes(
                    (prevMensajes)=>
                    [...prevMensajes, text]);
            });

        };
        newSocket.onclose = () =>{
            console.log('desconectado');
        };
        setSocket(newSocket);
        return ()=>{
            newSocket.close();
      }
    },[]);
    const  mandarMensaje = ()=>{
        if(socket && mensaje.trim()){
            //concatenar el arreglo con 3 puntos, sin los 3 puntos seria un arreglo
            setMensajes ((anterioresM)=> [...anterioresM, mensaje]);
            socket.send(mensaje);
            setMensaje('');
        }        
    }
    return(
        <div className="chat">
            <div className="chat-header">
                Titulo
            </div>
            {/*bucle que muestre mensajes */}
            <div className="chat-message">
                {mensajes.map((mensajeInterno, index)=>(
                    <div key={index}>{mensajeInterno}</div>
                ))}
            </div>
            <div className="chat-sender">
               
                <input className="chat-send" 
                value={mensaje} 
                onChange={(evento)=>{
                    setMensaje(evento.target.value)
                }} 
                onKeyDown={(evento)=>{
                if(evento.key == 'Enter'){
                    mandarMensaje();
                }
            }}></input>
                <FiSend/>
            </div>

        </div>
    );
}
export default ChatWebSocket;