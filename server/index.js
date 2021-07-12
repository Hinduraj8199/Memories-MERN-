import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const CONNECTION_URL = `mongodb://hinduraj:hinduraj123@coursera-shard-00-00.belfw.mongodb.net:27017,coursera-shard-00-01.belfw.mongodb.net:27017,coursera-shard-00-02.belfw.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-te1jey-shard-0&authSource=admin&retryWrites=true&w=majority`;
const PORT = process.env.port || 5000;

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
