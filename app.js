const fs = require("fs");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

let allFiles = [];
app.use("/get",(req, res)=>{ 

    fs.readdir("createdFiles", (err, files)=>{
         allFiles = [...files];   
    })
    console.log("allfiles : ",allFiles);
    res.send(allFiles);
})


app.use("/post",(req, res)=>{
 
        var d = new Date();
        var date = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();

        var timestamp = `${date}${month}${year}-${hours}${minutes}${seconds}`;
        var path = `createdFiles/${timestamp}.txt`;

        var file = fs.writeFile(path, timestamp, err =>{
            if(err){
                console.log(err);
                return
            }
        });
        res.end(`File ${timestamp}.txt created`)
   
})



app.listen(PORT, ()=>{
    console.log("app listening at http://localhost:3001");
})