const express=require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);
const {Server}=require('socket.io');
const io=new Server(server,{cors:{origin:'*'}});
require('dotenv').config();
const PORT=process.env.PORT;

io.on("connection",(socket)=>{
      socket.on('join',(meetId)=>{
        console.log('joined with'+meetId);
       let size=io.sockets.adapter.rooms.get(meetId)?.size;
       if(!size){
         socket.join(meetId);
       }else if(size==1){
        socket.join(meetId);
        socket.emit('initiate');
      }else{
       socket.emit("full","Meeting at full capacity so cannot connect !");
      }
      });
      socket.on('call',(meetId,signal)=>{
        console.log('connected with'+meetId);
         socket.to(meetId).emit('receiver',signal);
      });
      socket.on('accept',(meetId,signal)=>{
        console.log('connected with'+meetId);
         socket.to(meetId).emit('response',signal);
      });
});
server.listen(PORT,()=>console.log(`server started listening on port ${PORT}`));
