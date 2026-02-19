const express = require('express');
const app = express();
const cors = require('cors');

// insecure: allows all origins
app.use(cors());
app.use(cors({ origin: "https://labdeploy-webapp-<yourname>.azurewebsites.net" }));

// insecure: uses a default password if env var missing
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
 
const credential = new DefaultAzureCredential();
const vaultName = process.env.KEYVAULT_NAME;
const url = `https://${vaultName}.vault.azure.net`;
const client = new SecretClient(url, credential);
 
async function getAdminPassword() {
const secret = await client.getSecret("ADMIN-PASSWORD");
return secret.value;
}

app.get('/admin', (req, res) => {
 if (!process.env.ADMIN_PASSWORD) {
return res.status(500).send("Admin password missing — please configure ADMIN_PASSWORD.");
}
  const pw = req.query.pw;
  if (pw === ADMIN_PASSWORD) {
    res.send('Welcome admin');
  } else {
    res.status(401).send('Unauthorized');
  }
});

// verbose error (debug) enabled in production
app.get('/', (req, res) => {
res.send('App is running securely 🎉');
});

app.listen(process.env.PORT || 8080);
