const vehicleService = require('../services/vehicleService');
const { getConnection } = require('../db/dbConnection');
const axios = require('axios');
jest.mock('axios');
jest.mock('../db/dbConnection');

describe('Vehicle Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should_fetch_all_vehicles', async () => {
    const mockVehicles = [{ nombre: 'Sand Crawler' }];
    getConnection.mockResolvedValue({
      execute: jest.fn().mockResolvedValue([mockVehicles]),
      end: jest.fn()
    });

    const vehicles = await vehicleService.getVehicles();
    expect(vehicles).toEqual(mockVehicles);
  });

  test('should_create_vehicle', async () => {
    const mockData = {
      nombre: 'Sand Crawler',
      modelo: 'Digger Crawler',
      fabricante: 'Corellia Mining Corporation',
      costo_en_creditos: '150000',
      longitud: '36.8',
      velocidad_maxima: '30',
      tripulacion: '46',
      pasajeros: '30',
      capacidad_de_carga: '50000',
      consumibles: '2 months',
      clase_de_vehiculo: 'wheeled'
    };

    const mockExecute = jest.fn();
    getConnection.mockResolvedValue({
      execute: mockExecute,
      end: jest.fn()
    });

    await vehicleService.createVehicle(mockData);
    expect(mockExecute).toHaveBeenCalledWith(
      'INSERT INTO vehicles (nombre, modelo, fabricante, costo_en_creditos, longitud, velocidad_maxima, tripulacion, pasajeros, capacidad_de_carga, consumibles, clase_de_vehiculo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        mockData.nombre, mockData.modelo, mockData.fabricante, mockData.costo_en_creditos, mockData.longitud, mockData.velocidad_maxima, mockData.tripulacion, mockData.pasajeros, mockData.capacidad_de_carga, mockData.consumibles, mockData.clase_de_vehiculo
      ]
    );
  });

  test('should_fetch_and_translate_vehicle_from_swapi', async () => {
    const mockVehicle = {
      name: 'Sand Crawler',
      model: 'Digger Crawler',
      manufacturer: 'Corellia Mining Corporation',
      cost_in_credits: '150000',
      length: '36.8',
      max_atmosphering_speed: '30',
      crew: '46',
      passengers: '30',
      cargo_capacity: '50000',
      consumables: '2 months',
      vehicle_class: 'wheeled'
    };

    axios.get.mockResolvedValue({ data: mockVehicle });

    const translatedVehicle = await vehicleService.fetchAndTranslateVehicle();
    expect(translatedVehicle).toEqual({
      nombre: 'Sand Crawler',
      modelo: 'Digger Crawler',
      fabricante: 'Corellia Mining Corporation',
      costo_en_creditos: '150000',
      longitud: '36.8',
      velocidad_maxima: '30',
      tripulacion: '46',
      pasajeros: '30',
      capacidad_de_carga: '50000',
      consumibles: '2 months',
      clase_de_vehiculo: 'wheeled'
    });
  });
});