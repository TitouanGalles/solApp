const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bs58 = require('bs58');
const nacl = require('tweetnacl');
const { PublicKey } = require('@solana/web3.js');

const app = express();

// Middleware
app.use(bodyParser.json());

// Sert les fichiers statiques depuis le dossier actuel (même que server.js)
app.use(express.static(__dirname));

// Route POST pour vérifier la signature
app.post('/sign-message', (req, res) => {
  const { walletAddress, message, signature } = req.body;

  try {
    const publicKey = new PublicKey(walletAddress);
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = bs58.decode(signature);

    const isValid = nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      publicKey.toBytes()
    );

    if (isValid) {
      res.json({ success: true, message: "Authentification réussie ✅" });
    } else {
      res.status(401).json({ success: false, message: "Signature invalide ❌" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la vérification",
      error: error.message
    });
  }
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('✅ Serveur démarré sur http://localhost:3000');
});
