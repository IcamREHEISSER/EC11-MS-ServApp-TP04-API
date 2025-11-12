const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");
require("./websocket"); // démarre la gestion WS

dotenv.config();
const app = express();

app.use(express.json());

// Endpoint pour lire les 50 dernières entrées
app.get("/api/data", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM production_data ORDER BY id DESC LIMIT 50"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.API_PORT || 3000;
app.listen(port, () =>
  console.log(`🚀 API REST disponible sur http://localhost:${port}`)
);