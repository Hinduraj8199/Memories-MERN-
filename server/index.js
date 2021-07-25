import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});
const CONNECTION_URL = `mongodb://hinduraj:hinduraj123@coursera-shard-00-00.belfw.mongodb.net:27017,coursera-shard-00-01.belfw.mongodb.net:27017,coursera-shard-00-02.belfw.mongodb.net:27017/memoories?ssl=true&replicaSet=atlas-te1jey-shard-0&authSource=admin&retryWrites=true&w=majority`;
const port = process.env.PORT || 5000;
// "0.0.0.0", add after port line 33
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () =>
      console.log(`Server Running on Port: http://localhost:${port}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
