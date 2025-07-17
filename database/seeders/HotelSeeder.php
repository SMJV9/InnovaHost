<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Hotel;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hoteles = [
            [
                'nombre' => 'El Dorado',
                'tipo' => 'Hotel',
                'estado' => 'Sonora',
                'ciudad' => 'Hermosillo',
                'direccion' => 'Av. Principal 123, Centro, Hermosillo, Sonora',
                'telefono' => '+52 (662) 123-4567',
                'email' => 'reservas@eldorado.com',
                'sitio_web' => 'https://www.eldorado.com',
                'foto' => 'https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'precio' => 1500.00,
                'calificacion' => 4.5,
                'resenas' => 245,
                'descripcion' => 'Hotel de lujo con vista panorámica de la ciudad, spa completo y restaurante gourmet.',
                'descripcion_larga' => 'Hotel de lujo con vista panorámica de la ciudad, spa completo y restaurante gourmet. Ubicado en el corazón de Hermosillo, ofrece la perfecta combinación de elegancia y comodidad para huéspedes exigentes. Nuestras instalaciones de clase mundial incluyen un spa de servicio completo, restaurante gourmet, centro de fitness y piscina climatizada.',
                'checkin' => '15:00',
                'checkout' => '12:00',
                'disponible' => true,
                'destacado' => true,
                'servicios' => ['WiFi gratuito', 'Piscina', 'Spa', 'Restaurante', 'Gimnasio', 'Estacionamiento', 'Room service', 'Bar', 'Centro de negocios'],
                'caracteristicas' => ['Vista panorámica de la ciudad', 'Habitaciones con aire acondicionado', 'TV de pantalla plana', 'Minibar', 'Caja fuerte', 'Servicio de lavandería', 'Conserje 24/7'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'El Nora',
                'tipo' => 'Hotel',
                'estado' => 'Sonora',
                'ciudad' => 'Sonoyta',
                'direccion' => 'Calle Revolución 456, Sonoyta, Sonora',
                'telefono' => '+52 (638) 234-5678',
                'email' => 'info@elnora.com',
                'foto' => 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'precio' => 850.00,
                'calificacion' => 4.2,
                'resenas' => 178,
                'descripcion' => 'Hotel boutique con ambiente acogedor, perfecto para escapadas de fin de semana.',
                'descripcion_larga' => 'Hotel boutique con ambiente acogedor, perfecto para escapadas de fin de semana. Ofrecemos una experiencia íntima y personalizada en el corazón de Sonoyta. Nuestro diseño combina elementos tradicionales mexicanos con comodidades modernas.',
                'checkin' => '15:00',
                'checkout' => '12:00',
                'disponible' => true,
                'destacado' => false,
                'servicios' => ['WiFi gratuito', 'Desayuno incluido', 'Estacionamiento', 'Aire acondicionado', 'Servicio de limpieza'],
                'caracteristicas' => ['Habitaciones con aire acondicionado', 'TV por cable', 'Baño privado', 'Escritorio', 'Closet amplio'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'Esmeralda',
                'tipo' => 'Hotel',
                'estado' => 'Sonora',
                'ciudad' => 'Puerto Peñasco',
                'direccion' => 'Malecón Kino 789, Puerto Peñasco, Sonora',
                'telefono' => '+52 (638) 345-6789',
                'email' => 'reservas@esmeralda.com',
                'sitio_web' => 'https://www.esmeralda.com',
                'foto' => 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'precio' => 2200.00,
                'calificacion' => 4.8,
                'resenas' => 892,
                'descripcion' => 'Resort frente al mar con actividades acuáticas y entretenimiento nocturno.',
                'descripcion_larga' => 'Resort frente al mar con actividades acuáticas y entretenimiento nocturno. Ubicado directamente sobre la playa de Puerto Peñasco, ofrecemos una experiencia completa de resort con múltiples restaurantes, bares, spa y una amplia gama de actividades acuáticas.',
                'checkin' => '15:00',
                'checkout' => '12:00',
                'disponible' => true,
                'destacado' => true,
                'servicios' => ['WiFi gratuito', 'Piscina', 'Playa privada', 'Restaurante', 'Bar', 'Spa', 'Actividades acuáticas', 'Entretenimiento nocturno', 'Gimnasio'],
                'caracteristicas' => ['Vista al mar', 'Balcón privado', 'Aire acondicionado', 'TV de pantalla plana', 'Minibar', 'Caja fuerte', 'Baño de lujo'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'Lucerna',
                'tipo' => 'Hotel',
                'estado' => 'Sonora',
                'ciudad' => 'Puerto Peñasco',
                'direccion' => 'Blvd. Benito Juárez 321, Puerto Peñasco, Sonora',
                'telefono' => '+52 (638) 456-7890',
                'email' => 'info@lucerna.com',
                'foto' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'precio' => 1800.00,
                'calificacion' => 4.6,
                'resenas' => 456,
                'descripcion' => 'Hotel de negocios con instalaciones modernas y centro de convenciones.',
                'descripcion_larga' => 'Hotel de negocios con instalaciones modernas y centro de convenciones. Perfecto para viajeros de negocios y eventos corporativos, cuenta con salas de juntas equipadas, centro de negocios y servicios de alta calidad.',
                'checkin' => '15:00',
                'checkout' => '12:00',
                'disponible' => true,
                'destacado' => false,
                'servicios' => ['WiFi gratuito', 'Centro de negocios', 'Restaurante', 'Gimnasio', 'Estacionamiento', 'Sala de juntas', 'Servicio de lavandería'],
                'caracteristicas' => ['Escritorio ejecutivo', 'Aire acondicionado', 'TV de pantalla plana', 'Teléfono directo', 'Minibar', 'Caja fuerte'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'City Express',
                'tipo' => 'Hotel',
                'estado' => 'Sonora',
                'ciudad' => 'Hermosillo',
                'direccion' => 'Blvd. Luis Encinas 654, Hermosillo, Sonora',
                'telefono' => '+52 (662) 567-8901',
                'email' => 'reservas@cityexpress.com',
                'foto' => 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'precio' => 1200.00,
                'calificacion' => 4.3,
                'resenas' => 634,
                'descripcion' => 'Hotel moderno en el centro de la ciudad, ideal para viajeros de negocios.',
                'descripcion_larga' => 'Hotel moderno en el centro de la ciudad, ideal para viajeros de negocios. Ubicación estratégica con fácil acceso a centros comerciales, oficinas gubernamentales y atractivos turísticos.',
                'checkin' => '15:00',
                'checkout' => '12:00',
                'disponible' => true,
                'destacado' => false,
                'servicios' => ['WiFi gratuito', 'Desayuno incluido', 'Centro de negocios', 'Gimnasio', 'Estacionamiento', 'Servicio de lavandería'],
                'caracteristicas' => ['Aire acondicionado', 'TV por cable', 'Escritorio', 'Teléfono', 'Baño privado', 'Closet'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'San Sebastian',
                'tipo' => 'Hotel',
                'estado' => 'Sonora',
                'ciudad' => 'Hermosillo',
                'direccion' => 'Calle Hidalgo 987, Centro, Hermosillo, Sonora',
                'telefono' => '+52 (662) 678-9012',
                'email' => 'info@sansebastian.com',
                'foto' => 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'precio' => 950.00,
                'calificacion' => 4.1,
                'resenas' => 289,
                'descripcion' => 'Hotel familiar con ambiente tradicional y excelente servicio personalizado.',
                'descripcion_larga' => 'Hotel familiar con ambiente tradicional y excelente servicio personalizado. Perfecto para familias que buscan comodidad y hospitalidad en un ambiente acogedor con toques tradicionales mexicanos.',
                'checkin' => '15:00',
                'checkout' => '12:00',
                'disponible' => true,
                'destacado' => false,
                'servicios' => ['WiFi gratuito', 'Restaurante', 'Piscina', 'Estacionamiento', 'Jardín', 'Área de juegos'],
                'caracteristicas' => ['Habitaciones familiares', 'Aire acondicionado', 'TV por cable', 'Baño privado', 'Balcón', 'Vista al jardín'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'Sleep Inn',
                'tipo' => 'Hotel',
                'estado' => 'Baja California',
                'ciudad' => 'Mexicali',
                'direccion' => 'Av. Reforma 147, Mexicali, Baja California',
                'telefono' => '+52 (686) 789-0123',
                'email' => 'reservas@sleepinn.com',
                'foto' => 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'precio' => 750.00,
                'calificacion' => 4.0,
                'resenas' => 156,
                'descripcion' => 'Hotel económico con todas las comodidades básicas para una estancia confortable.',
                'descripcion_larga' => 'Hotel económico con todas las comodidades básicas para una estancia confortable. Ideal para viajeros que buscan una opción económica sin sacrificar la comodidad y limpieza.',
                'checkin' => '15:00',
                'checkout' => '12:00',
                'disponible' => false,
                'destacado' => false,
                'servicios' => ['WiFi gratuito', 'Desayuno incluido', 'Estacionamiento', 'Aire acondicionado', 'Recepción 24h'],
                'caracteristicas' => ['Aire acondicionado', 'TV por cable', 'Baño privado', 'Escritorio pequeño', 'Closet'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'Grand Plaza',
                'tipo' => 'Hotel',
                'estado' => 'Baja California',
                'ciudad' => 'Tijuana',
                'direccion' => 'Av. Revolución 258, Zona Centro, Tijuana, Baja California',
                'telefono' => '+52 (664) 890-1234',
                'email' => 'info@grandplaza.com',
                'sitio_web' => 'https://www.grandplaza.com',
                'foto' => 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'precio' => 1600.00,
                'calificacion' => 4.4,
                'resenas' => 378,
                'descripcion' => 'Hotel de lujo en el corazón de la ciudad con vistas espectaculares.',
                'descripcion_larga' => 'Hotel de lujo en el corazón de la ciudad con vistas espectaculares. Ubicado en la vibrante Avenida Revolución, ofrece fácil acceso a las mejores atracciones, restaurantes y vida nocturna de Tijuana.',
                'checkin' => '15:00',
                'checkout' => '12:00',
                'disponible' => true,
                'destacado' => true,
                'servicios' => ['WiFi gratuito', 'Piscina', 'Spa', 'Restaurante', 'Bar', 'Gimnasio', 'Estacionamiento', 'Conserje', 'Room service'],
                'caracteristicas' => ['Vista a la ciudad', 'Suite ejecutiva', 'Aire acondicionado', 'TV de pantalla plana', 'Minibar', 'Caja fuerte', 'Balcón'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ]
            ]
        ];

        foreach ($hoteles as $hotel) {
            Hotel::create($hotel);
        }
    }
}
