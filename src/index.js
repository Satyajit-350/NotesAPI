const express = require("express"); //import express
//create a application object using express
const app = express()
const userRouter = require("./routes/userRoutes");
const notesRouter = require("./routes/notesRoutes");
const quotesRouter = require("./routes/quotesRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path")

const mongoose = require("mongoose");
const audioNotesRouter = require("./routes/audioNotesRoutes");

dotenv.config();

app.use(express.json());

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use((req,res,next) =>{
    console.log("HTTP Method - "+ req.method +" , URL - "+ req.url);
    next();
})

app.use("/users",userRouter) //here we will access the userRouter like this -> /users/signin or /users/signup
app.use("/note",notesRouter)
app.use("/quote",quotesRouter)
app.use("/audioNote",audioNotesRouter)

//defie methods like get,put,post etc
//here "/"" means root and (req,res) means request,response
app.get("/",(req,res) =>{
    res.send("Hello!! this is a Notes API Project");
})

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://satyajitAdmin:Satyjit%40350@cluster1.n79f2ro.mongodb.net/notes_db?retryWrites=true&w=majority")
.then(()=>{//after conncetion then function will be called 

    //so here after connection we will start our app
    //this app obj is server application to start the application some request will come and serve them 
    //to serve the request we need a port number 
    //listen(port,callback)
    app.listen(PORT, ()=>{
        console.log("Server started on port number "+PORT);
    })

})
.catch((error) =>{//error handleing
    console.log(error)
})

