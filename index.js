import  Express  from "express";
import mongoose from "mongoose";
import Cors from "cors";
import userRoutes from "./routes/users.js"
import featuresRoutes from "./routes/features.js"
import contactRoutes from "./routes/contact.js"

const app = Express();
app.use(Express.json({limit:"30mb",extended:true}))
app.use(Express.urlencoded({limit:"30mb",extended:true}))
app.use(Cors());

app.get('/',(req,res) => {
    res.send("This is a Expense Tracker Server ")
})
 
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://admin:<password>@stackoverflow.zcpbdqm.mongodb.net/StackOverflow?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology:true})
.then(() => app.listen(5000,() => console.log("successfully Connected")))
.catch((err) => console.log(err.message))
