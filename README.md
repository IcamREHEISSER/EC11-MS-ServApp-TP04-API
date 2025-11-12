Lisez-moi — API Node.js de collecte de données via WebSocket
🧩 Description

Cette application Node.js se connecte à deux sources WebSocket distinctes.
Chaque source envoie régulièrement des données JSON contenant des informations de production.
L’application reçoit ces données en temps réel et les enregistre automatiquement dans une base de données distante.

Exemple de message JSON reçu :
{
  "timestamp": "10/11/2025 14:22:05",
  "source_id": 1,
  "product_id": 42,
  "percentage": 99.57
}

Structure de la base :
Champ	Type	Description
timestamp	DATETIME	Date/heure de production de la donnée
source_id	TINYINT	Identifiant de la source WebSocket (1 ou 2)
product_id	INT	Identifiant du produit concerné
percentage	DECIMAL(5,2)	Indice qualité, entre 98.00 et 100.00


⚙️ Installation
1️⃣ Prérequis

Node.js ≥ 18

npm (inclus avec Node.js)

Une base de données MySQL accessible à distance

2️⃣ Installation du projet
git clone <url_du_dépôt>
cd api-websocket
npm install

🔧 Configuration

Crée un fichier .env à la racine du projet (non versionné sur GitHub) :

DB_HOST=adresse_serveur
DB_USER=utilisateur
DB_PASSWORD=mot_de_passe
DB_NAME=nom_base
WS_URL_1=wss://source1.example.com
WS_URL_2=wss://source2.example.com

🗄️ Création de la table SQL

Exécute la commande suivante sur ta base MySQL :

CREATE TABLE production_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  timestamp DATETIME NOT NULL,
  source_id TINYINT NOT NULL,
  product_id INT NOT NULL,
  percentage DECIMAL(5,2) NOT NULL
);

🚀 Lancement du serveur
node index.js


Tu verras apparaître :

✅ Connecté à la source 1
✅ Connecté à la source 2
🚀 API disponible sur http://localhost:3000


L’application :

écoute les deux WebSockets (URL définies dans .env),

insère les données reçues dans la base distante,

et expose un petit endpoint REST de lecture :

Exemple d’endpoint :
GET /api/data


➡️ Retourne les 50 dernières entrées de la base.

🧠 Structure du projet
api-websocket/
 ├── index.js           # Point d’entrée principal (API Express)
 ├── websocket.js       # Gestion des connexions WebSocket
 ├── db.js              # Connexion à la base MySQL
 ├── .env               # Variables d’environnement (non versionné)
 ├── package.json       # Dépendances et scripts
 └── Lisez-moi.txt      # Documentation du projet

🧰 Dépendances principales
Module	Rôle
express	Fournit l’API REST
ws	Client WebSocket pour les sources
mysql2	Connexion à la base MySQL
dotenv	Gestion sécurisée des variables d’environnement
💡 Personnalisation

Le nombre de sources peut être augmenté facilement dans index.js.

Le format des données reçues peut être adapté dans websocket.js.

Le port de l’API peut être changé via la variable PORT dans le code.

🧾 Licence

Projet libre d’utilisation à des fins pédagogiques et de démonstration.
Aucune garantie de fiabilité ni de disponibilité des données.