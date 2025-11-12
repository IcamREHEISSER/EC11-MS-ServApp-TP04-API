const WebSocket = require("ws");
const db = require("./db");
require("dotenv").config();

// Serveurs WebSocket de diffusion
const wsOut1 = new WebSocket.Server({ port: process.env.WS_OUT_1_PORT });
const wsOut2 = new WebSocket.Server({ port: process.env.WS_OUT_2_PORT });

console.log(`✅ WS sortie 1: ws://localhost:${process.env.WS_OUT_1_PORT}`);
console.log(`✅ WS sortie 2: ws://localhost:${process.env.WS_OUT_2_PORT}`);

// Connexion aux sources
const source1 = new WebSocket(process.env.WS_SOURCE_1);
const source2 = new WebSocket(process.env.WS_SOURCE_2);

const handleMessage = async (data, sourceId, wsServer) => {

  try {
    const json = JSON.parse(data);
    const { timestamp, product_id, percentage } = json;
    console.log(json);

    // Rediffusion en temps réel aux clients connectés
    wsServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(json));
      }
    });

    // Enregistrement DB
    await db.query(
      "INSERT INTO production_data (timestamp, source_id, product_id, percentage) VALUES (?, ?, ?, ?)",
      [timestamp, sourceId, product_id, percentage]
    );

  } catch (err) {
    console.error("Erreur traitement WS:", err.message);
  }
};

// Gestion des événements source 1
source1.on("open", () => console.log("🔗 Connecté à la source 1"));
source1.on("message", data => handleMessage(data, 1, wsOut1));

// Gestion des événements source 2
source2.on("open", () => console.log("🔗 Connecté à la source 2"));
source2.on("message", data => handleMessage(data, 2, wsOut2));


wsOut1.on("connection", () => console.log("Utilisateur connecté sur la sortie 1"));
wsOut2.on("connection", () => console.log("Utilisateur connecté sur la sortie 2"));