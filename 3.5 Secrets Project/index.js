import express from"express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath((import.meta.url)));
const app = express();
const port = 3000;
var userIsAuthorised = false;

app.use(bodyParser.urlencoded({extended : true}));

function passwordCheck (req,res,next){
    const password = req.body["password"];
    if (password == "IloveU"){
        userIsAuthorised = true;
    }
    next();
}
 app.use(passwordCheck);
app.get("/",(req,res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/Check",(req,res) => {
    if(userIsAuthorised){
        res.sendFile(__dirname + "/public/secret.html");
    }else {
        res.sendFile( __dirname + "/public/index.html");
    }

});

app.listen(port,() =>{
    console.log(`server is running at ${port}`);
});

//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
