const axios = require('axios');
const { getConnection } = require('../db/dbConnection');
const { translateVehicle } = require('../utils/translateUtil');

const getVehicles = async () => {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM Vehicles');
  await connection.end();
  return rows;
};

const createVehicle = async (data) => {
  const connection = await getConnection();
  await connection.execute('INSERT INTO Vehicles (nombre, modelo, fabricante, costo_en_creditos, longitud, velocidad_maxima, tripulacion, pasajeros, capacidad_de_carga, consumibles, clase_de_vehiculo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    data.nombre, data.modelo, data.fabricante, data.costo_en_creditos, data.longitud, data.velocidad_maxima, data.tripulacion, data.pasajeros, data.capacidad_de_carga, data.consumibles, data.clase_de_vehiculo
  ]);
  await connection.end();
};

const fetchAndTranslateVehicle = async () => {
  const response = await axios.get('https://swapi.py4e.com/api/vehicles/4/');
  return translateVehicle(response.data);
};

module.exports = {
  getVehicles,
  createVehicle,
  fetchAndTranslateVehicle
};