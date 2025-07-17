// Servicio para obtener información del clima
const API_KEY = 'tu_api_key_aqui'; // Reemplaza con tu API key de OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class ClimaService {
    // Obtener clima actual por ciudad
    async obtenerClimaPorCiudad(ciudad) {
        try {
            // Para desarrollo, retornamos datos simulados
            // En producción, descomenta las líneas de abajo y agrega tu API key
            
            /*
            const response = await fetch(
                `${BASE_URL}/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
            );
            
            if (!response.ok) {
                throw new Error('Error al obtener datos del clima');
            }
            
            const data = await response.json();
            return {
                temperatura: Math.round(data.main.temp),
                descripcion: data.weather[0].description,
                icono: data.weather[0].icon,
                humedad: data.main.humidity,
                viento: data.wind.speed
            };
            */

            // Datos simulados para desarrollo
            const temp = Math.floor(Math.random() * 15) + 20; // Entre 20-35°C
            return {
                temperatura: temp,
                sensacionTermica: temp + Math.floor(Math.random() * 6) - 3, // Diferencia de -3 a +3°C
                descripcion: this.obtenerDescripcionAleatoria(),
                icono: this.obtenerIconoAleatorio(),
                humedad: Math.floor(Math.random() * 30) + 50, // Entre 50-80%
                viento: Math.floor(Math.random() * 10) + 5, // Entre 5-15 km/h
                vientoVelocidad: Math.floor(Math.random() * 10) + 5 // Alias para compatibilidad
            };
        } catch (error) {
            console.error('Error obteniendo clima:', error);
            return {
                temperatura: 25,
                sensacionTermica: 27,
                descripcion: 'Información no disponible',
                icono: '01d',
                humedad: 60,
                viento: 10,
                vientoVelocidad: 10
            };
        }
    }

    // Obtener pronóstico de 5 días
    async obtenerPronostico(ciudad) {
        try {
            // Para desarrollo, retornamos datos simulados
            // En producción, descomenta las líneas de abajo
            
            /*
            const response = await fetch(
                `${BASE_URL}/forecast?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
            );
            
            if (!response.ok) {
                throw new Error('Error al obtener pronóstico');
            }
            
            const data = await response.json();
            return data.list.slice(0, 5).map(item => ({
                fecha: new Date(item.dt * 1000).toLocaleDateString(),
                temperatura: Math.round(item.main.temp),
                descripcion: item.weather[0].description,
                icono: item.weather[0].icon
            }));
            */

            // Datos simulados para desarrollo
            const diasSemana = ['Hoy', 'Mañana', 'Miércoles', 'Jueves', 'Viernes'];
            return diasSemana.map((dia, index) => ({
                fecha: dia,
                temperatura: Math.floor(Math.random() * 15) + 20,
                descripcion: this.obtenerDescripcionAleatoria(),
                icono: this.obtenerIconoAleatorio()
            }));
        } catch (error) {
            console.error('Error obteniendo pronóstico:', error);
            return [];
        }
    }

    // Métodos auxiliares para datos simulados
    obtenerDescripcionAleatoria() {
        const descripciones = [
            'Soleado',
            'Parcialmente nublado',
            'Nublado',
            'Lluvia ligera',
            'Despejado',
            'Pocas nubes'
        ];
        return descripciones[Math.floor(Math.random() * descripciones.length)];
    }

    obtenerIconoAleatorio() {
        const iconos = ['01d', '02d', '03d', '04d', '09d', '10d'];
        return iconos[Math.floor(Math.random() * iconos.length)];
    }

    // Obtener URL del icono del clima
    obtenerUrlIcono(icono) {
        return `https://openweathermap.org/img/wn/${icono}@2x.png`;
    }
}

// Crear instancia del servicio
const climaService = new ClimaService();

export default climaService;
