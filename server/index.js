import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from "cors";
import postRoutes from "./routes/posts.js"

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))


app.use(cors());

const CONNECTION_URL = `mongodb+srv://m001-student:m001-mongodb-basics@coursera.belfw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.port || 5000;


app.use("/posts",postRoutes)


mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);
