const vehicleService = require('../services/vehicleService');

const getVehicle = async (event) => {
  const vehicles = await vehicleService.getVehicles();
  return {
    statusCode: 200,
    body: JSON.stringify(vehicles)
  };
};

const createVehicle = async (event) => {
  const data = JSON.parse(event.body);
  await vehicleService.createVehicle(data);
  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Vehicle created successfully' })
  };
};

const fetchAndTranslateVehicle = async () => {
  const translatedVehicle = await vehicleService.fetchAndTranslateVehicle();
  return {
    statusCode: 200,
    body: JSON.stringify(translatedVehicle)
  };
};

module.exports = {
  getVehicle,
  createVehicle,
  fetchAndTranslateVehicle
};