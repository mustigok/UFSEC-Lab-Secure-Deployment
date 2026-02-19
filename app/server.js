const express = require('express');
const app = express();
const cors = require('cors');

// insecure: allows all origins
app.use(cors());
app.use(cors({ origin: "https://labdeploy-webapp-<yourname>.azurewebsites.net" }));

// insecure: uses a default password if env var missing
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

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
