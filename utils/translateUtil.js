const translateVehicle = (vehicle) => {
    return {
      nombre: vehicle.name,
      modelo: vehicle.model,
      fabricante: vehicle.manufacturer,
      costo_en_creditos: vehicle.cost_in_credits,
      longitud: vehicle.length,
      velocidad_maxima: vehicle.max_atmosphering_speed,
      tripulacion: vehicle.crew,
      pasajeros: vehicle.passengers,
      capacidad_de_carga: vehicle.cargo_capacity,
      consumibles: vehicle.consumables,
      clase_de_vehiculo: vehicle.vehicle_class
    };
  };
  
  module.exports = { translateVehicle };