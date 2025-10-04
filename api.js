import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import * as CC from "./controller/contactsApiController.js";
import * as GC from "./controller/groupsApiController.js";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Conectado com MongoDB:"))
    .catch((error) => {
      console.log(`Erro ao tentar conectar com MongoDB:\n${error}`);
    });
};

connectDB();

// POST

app.post("/contact", CC.postNewContact);

// GET

app.get("/contacts", CC.getAllContacts);

app.get("/contacts/initial/:letter", CC.getContactsByInitial);

app.get("/contact/:id", CC.getContactById);

app.get("/contacts/search", CC.queryContactsByName);

app.get("/contacts/group/:group", CC.getContactsByGroup);

app.get("/contacts/favorites", CC.getFavoritesContacts);

app.get("/groups", GC.getAllGroups);

// PUT

app.put("/contact/:id", CC.putContactById);

// PATCH

app.patch("/contact/:id", CC.patchContactById);

// DELETE

app.delete("/contact/:id", CC.deleteContactById);
