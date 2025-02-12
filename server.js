// Inkluderar Express, Cors och Mongoose.
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Laddar in .env-fil.
require("dotenv").config();

// Initialiserar Express.
const app = express();

// Väljer port.
const port = 3000;

// Middleware. Aktiverar hantering av JSON-data och Cors.
app.use(express.json());
app.use(cors());

// Ansluter till MongoDB.
mongoose.connect("mongodb://localhost:27017/moment2").then(() => {
    console.log("Connected to the MongoDB-database");
// Felmeddelande.
}).catch((error) => {
    console.log("Error connecting to the MongoDB-database: " + error);
});

// Skapar todo-schema för struktur.
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ["Ej påbörjad", "Pågående", "Avklarad"],
        default: "Ej påbörjad"
    },
});

// Inkluderar schemat i databasen.
const Todo = mongoose.model("Todo", todoSchema);


// ROUTING.

// Hämtar in API:et.
app.get("/api", async (req, res) => {

    res.json({ message: "Welcome to the todo-API!" });
});

// Hämtar lagrade todos.
app.get("/todo", async (req, res) => {
    try {
        let result = await Todo.find({});

        // Kontroll av innehåll och meddelande om collection är tom.
        if (result.length === 0) {
            return res.status(404).json({ message: "No todos found" });

            // Om todos finns, skrivs dessa ut.
        } else {
            return res.json(result);
        }
    // Felmeddelande.
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong: " + error });
    }
});

// Skapar/lagrar todo.
app.post("/todo", async (req, res) => {
    try {
        let result = await Todo.create(req.body);

        // Response vid lyckad input-inmatning.
        return res.json({
            message: "Todo added successfully",
            newTodo: result
        });
    // Felmeddelande.
    } catch (error) {
        return res.status(400).json({ error: "Something went wrong: " + error });
    }
});

// Uppdaterar specifik todo.
app.put("/todo/:id", async (req, res) => {
    try {
        const todoId = req.params.id;
        const updatedTodo = req.body;

        let result = await Todo.findByIdAndUpdate(todoId, updatedTodo, { new: true });

        // Kontroll av innehåll och meddelande om angivet id saknas.
        if (!result) {
            return res.status(404).json({ message: "No todo with this id was found" });
        } else {
            // Response vid lyckad uppdatering.
            return res.json({
                message: "Todo updated successfully",
                updatedTodo: result
            });
        }
    // Felmeddelande.
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong: " + error });
    }
});

// Raderar specifik todo.
app.delete("/todo/:id", async (req, res) => {

    // Raderar med findByIdAndDelete(), kontrollerar innehåll och skriver ut uppdaterad post. 
    try {
        const todoId = req.params.id;

        let result = await Todo.findByIdAndDelete(todoId);

        // Kontroll av innehåll och meddelande om angivet id saknas.
        if (!result) {
            return res.status(404).json({ message: "No todo with this id was found" });
        } else {
            // Response vid lyckad radering.
            return res.json({
                message: "Todo deleted successfully",
                deletedTodo: result
            });
        }
    // Felmeddelande.
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong: " + error });
    }
});

// Startar Express-servern.
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
