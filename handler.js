const vehicleController = require('./controllers/vehicleController');
const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

app.get('/vehicles', async (req, res) => {
  const response = await vehicleController.getVehicle();
  res.status(response.statusCode).json(JSON.parse(response.body));
});

app.post('/vehicles', async (req, res) => {
  const response = await vehicleController.createVehicle({ body: JSON.stringify(req.body) });
  res.status(response.statusCode).json(JSON.parse(response.body));
});

app.get('/vehicles/translate', async (req, res) => {
  const response = await vehicleController.fetchAndTranslateVehicle();
  res.status(response.statusCode).json(JSON.parse(response.body));
});

module.exports.handler = serverless(app);