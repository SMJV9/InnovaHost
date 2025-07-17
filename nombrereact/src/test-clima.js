// Test simple del servicio de clima
import climaService from '../servicios/climaService.js';

console.log('Testing climaService...');

// Prueba con datos demo
climaService.obtenerClimaPorCiudad('Ciudad de México').then(result => {
    console.log('Test result for Ciudad de México:', result);
}).catch(error => {
    console.error('Test error:', error);
});

// Prueba con Cancún
climaService.obtenerClimaPorCiudad('Cancún').then(result => {
    console.log('Test result for Cancún:', result);
}).catch(error => {
    console.error('Test error:', error);
});
