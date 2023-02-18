import  Express  from "express";
import mongoose from "mongoose";
import Cors from "cors";
import userRoutes from "./routes/users.js"
import questionRoutes from "./routes/Questions.js"
import answerRoutes from "./routes/Answers.js"
import chatbotRoutes from './routes/Chatbot.js'
const app = Express();
app.use(Express.json({limit:"30mb",extended:true}))
app.use(Express.urlencoded({limit:"30mb",extended:true}))
app.use(Cors());

app.get('/',(req,res) => {
    res.send("This is a Expense Tracker Server ")
})
 
app.use('/user',userRoutes);
app.use('/questions',questionRoutes);
app.use('/answer',answerRoutes)
app.use('/chatbot',chatbotRoutes)

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://admin:admin@stackoverflow.zcpbdqm.mongodb.net/StackOverflow?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology:true})
.then(() => app.listen(5000,() => console.log("successfully Connected")))
.catch((err) => console.log(err.message))
