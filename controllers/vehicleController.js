const vehicleService = require('../services/vehicleService');

const getVehicle = async (event) => {
  try {
    const vehicles = await vehicleService.getVehicles();
    return {
      statusCode: 200,
      body: JSON.stringify(vehicles)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al obtener los vehículos', error: error.message })
    };
  }
};

const createVehicle = async (event) => {
  try {
    const data = JSON.parse(event.body);
    if (!data.nombre || !data.modelo || !data.fabricante) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Bad Request: nombre, modelo y fabricante son requeridos' })
      };
    }
    await vehicleService.createVehicle(data);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Vehicle created successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al crear el vehículo', error: error.message })
    };
  }
};

const fetchAndTranslateVehicle = async () => {
  try {
    const translatedVehicle = await vehicleService.fetchAndTranslateVehicle();
    return {
      statusCode: 200,
      body: JSON.stringify(translatedVehicle)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al traducir el vehículo', error: error.message })
    };
  }
};

module.exports = {
  getVehicle,
  createVehicle,
  fetchAndTranslateVehicle
};