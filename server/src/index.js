import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";
import { fileURLToPath } from 'url';
import path ,{dirname} from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());

// serve up production assets
app.use(express.static(path.resolve(__dirname, '../../client', 'build')));

mongoose.connect(
  "mongodb+srv://bookstore_user:eF798IfudihrLePS@bookstore.ck0kqvf.mongodb.net/recipe_db?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/api/auth", userRouter);
app.use("/api/recipes", recipesRouter);

// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client', 'build', 'index.html'));
});

app.listen(3001, () => console.log("Server started"));
