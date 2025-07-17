<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Motel;

class MotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $moteles = [
            [
                'nombre' => 'Motel Las Palmas',
                'estado' => 'CDMX',
                'ciudad' => 'Ciudad de México',
                'direccion' => 'Av. Insurgentes Sur 1234, Col. Del Valle, Ciudad de México',
                'telefono' => '+52 (55) 1234-5678',
                'email' => 'reservas@laspalmas.com',
                'sitio_web' => 'https://www.laspalmas.com',
                'foto' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
                'precio' => 450.00,
                'calificacion' => 4.2,
                'resenas' => 156,
                'descripcion' => 'Motel cómodo y discreto con habitaciones equipadas y servicios de calidad para tu descanso.',
                'descripcion_larga' => 'Motel cómodo y discreto ubicado en una zona conveniente de la Ciudad de México. Nuestras habitaciones están completamente equipadas con todas las comodidades necesarias para garantizar tu descanso y privacidad. Ofrecemos servicios de calidad con atención personalizada las 24 horas.',
                'checkin' => '14:00',
                'checkout' => '12:00',
                'disponible' => true,
                'destacado' => true,
                'servicios' => ['WiFi gratuito', 'Parking privado', 'TV por cable', 'Aire acondicionado', 'Room service'],
                'caracteristicas' => ['Habitaciones privadas', 'Entrada discreta', 'Seguridad 24/7', 'Limpieza profunda'],
                'imagenes' => [
                    'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                    'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                ]
            ],
            [
                'nombre' => 'Motel Costa Azul',
                'estado' => 'Jalisco',
                'ciudad' => 'Guadalajara',
                'direccion' => 'Av. López Mateos 2456, Guadalajara, Jalisco',
                'telefono' => '+52 (33) 2345-6789',
                'email' => 'info@costaazul.com',
                'sitio_web' => 'https://www.costaazul.com',
                'foto' => 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
                'precio' => 380.00,
                'calificacion' => 3.9,
                'resenas' => 89,
                'descripcion' => 'Motel con ubicación conveniente y habitaciones limpias para una estancia cómoda.',
                'descripcion_larga' => 'Motel Costa Azul ofrece una ubicación conveniente en Guadalajara con habitaciones limpias y cómodas. Perfecto para viajeros que buscan una estancia práctica y asequible con los servicios esenciales.',
                'checkin' => '15:00',
                'checkout' => '11:00',
                'disponible' => true,
                'destacado' => false,
                'servicios' => ['WiFi', 'Estacionamiento', 'TV', 'Baño privado'],
                'caracteristicas' => ['Habitaciones amplias', 'Entrada independiente', 'Limpieza diaria'],
                'imagenes' => [
                    'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                ]
            ],
            [
                'nombre' => 'Motel El Oasis',
                'estado' => 'Nuevo León',
                'ciudad' => 'Monterrey',
                'direccion' => 'Av. Constitución 789, Monterrey, Nuevo León',
                'telefono' => '+52 (81) 3456-7890',
                'email' => 'reservas@eloasis.com',
                'sitio_web' => 'https://www.eloasis.com',
                'foto' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
                'precio' => 520.00,
                'calificacion' => 4.5,
                'resenas' => 234,
                'descripcion' => 'Motel de lujo con habitaciones temáticas y servicios premium para una experiencia única.',
                'descripcion_larga' => 'El Oasis es un motel de lujo en Monterrey que ofrece habitaciones temáticas únicas con servicios premium. Cada habitación está diseñada para brindar una experiencia inolvidable con jacuzzi, amenidades de lujo y atención personalizada.',
                'checkin' => '14:00',
                'checkout' => '13:00',
                'disponible' => true,
                'destacado' => true,
                'servicios' => ['WiFi premium', 'Jacuzzi', 'TV smart', 'Minibar', 'Room service', 'Spa'],
                'caracteristicas' => ['Habitaciones temáticas', 'Jacuzzi privado', 'Amenidades de lujo', 'Servicio VIP'],
                'imagenes' => [
                    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                    'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                ]
            ],
            [
                'nombre' => 'Motel Villa Hermosa',
                'estado' => 'Puebla',
                'ciudad' => 'Puebla',
                'direccion' => 'Blvd. 5 de Mayo 321, Puebla, Puebla',
                'telefono' => '+52 (222) 4567-8901',
                'email' => 'contacto@villahermosa.com',
                'sitio_web' => 'https://www.villahermosa.com',
                'foto' => 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
                'precio' => 320.00,
                'calificacion' => 3.7,
                'resenas' => 67,
                'descripcion' => 'Motel económico con las comodidades básicas necesarias para tu descanso.',
                'descripcion_larga' => 'Villa Hermosa es un motel económico que ofrece todas las comodidades básicas necesarias para un descanso confortable. Ideal para viajeros con presupuesto ajustado que no quieren sacrificar la limpieza y comodidad.',
                'checkin' => '15:00',
                'checkout' => '12:00',
                'disponible' => false,
                'destacado' => false,
                'servicios' => ['WiFi', 'Parking', 'TV'],
                'caracteristicas' => ['Habitaciones básicas', 'Precio económico', 'Ubicación central'],
                'imagenes' => [
                    'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                ]
            ],
            [
                'nombre' => 'Motel Estrella del Norte',
                'estado' => 'Baja California',
                'ciudad' => 'Tijuana',
                'direccion' => 'Av. Revolución 567, Tijuana, Baja California',
                'telefono' => '+52 (664) 5678-9012',
                'email' => 'info@estrelladelnorte.com',
                'sitio_web' => 'https://www.estrelladelnorte.com',
                'foto' => 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
                'precio' => 480.00,
                'calificacion' => 4.1,
                'resenas' => 198,
                'descripcion' => 'Motel moderno con excelente ubicación y servicios de calidad internacional.',
                'descripcion_larga' => 'Estrella del Norte es un motel moderno ubicado estratégicamente en Tijuana. Ofrecemos servicios de calidad internacional con habitaciones completamente renovadas y amenidades modernas para huéspedes exigentes.',
                'checkin' => '14:00',
                'checkout' => '12:00',
                'disponible' => true,
                'destacado' => true,
                'servicios' => ['WiFi de alta velocidad', 'Parking seguro', 'TV satelital', 'Aire acondicionado', 'Minibar'],
                'caracteristicas' => ['Habitaciones modernas', 'Tecnología actualizada', 'Ubicación estratégica', 'Servicios internacionales'],
                'imagenes' => [
                    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                    'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                ]
            ],
            [
                'nombre' => 'Motel Paraíso Tropical',
                'estado' => 'Quintana Roo',
                'ciudad' => 'Cancún',
                'direccion' => 'Av. Tulum 890, Cancún, Quintana Roo',
                'telefono' => '+52 (998) 6789-0123',
                'email' => 'reservas@paraisotropical.com',
                'sitio_web' => 'https://www.paraisotropical.com',
                'foto' => 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
                'precio' => 650.00,
                'calificacion' => 4.6,
                'resenas' => 312,
                'descripcion' => 'Motel temático cerca de la playa con decoración tropical y servicios premium.',
                'descripcion_larga' => 'Paraíso Tropical es un motel temático ubicado cerca de las hermosas playas de Cancún. Con decoración tropical auténtica y servicios premium, ofrecemos una experiencia única que combina la comodidad de un motel con el ambiente paradisíaco del Caribe mexicano.',
                'checkin' => '15:00',
                'checkout' => '11:00',
                'disponible' => true,
                'destacado' => true,
                'servicios' => ['WiFi premium', 'Piscina privada', 'TV smart', 'Minibar tropical', 'Room service', 'Jacuzzi'],
                'caracteristicas' => ['Decoración tropical', 'Cerca de la playa', 'Ambiente paradisíaco', 'Servicios premium'],
                'imagenes' => [
                    'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                ]
            ]
        ];

        foreach ($moteles as $motelData) {
            Motel::create($motelData);
        }
    }
}
