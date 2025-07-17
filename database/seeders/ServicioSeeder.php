<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Servicio;

class ServicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $servicios = [
            [
                'nombre' => 'Spa & Wellness',
                'categoria' => 'Relajación',
                'precio' => 850.00,
                'duracion' => '90 minutos',
                'descripcion' => 'Experiencia completa de relajación con masajes terapéuticos, sauna y tratamientos faciales en un ambiente de lujo.',
                'descripcion_larga' => 'Sumérgete en una experiencia completa de relajación y bienestar en nuestro exclusivo spa. Disfruta de masajes terapéuticos realizados por especialistas certificados, relájate en nuestra sauna finlandesa, rejuvenece tu piel con tratamientos faciales premium y deleita tus sentidos con sesiones de aromaterapia. Todo en un ambiente de lujo diseñado para tu total descanso y renovación.',
                'imagen' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'calificacion' => 4.8,
                'popularidad' => 245,
                'horarios' => '9:00 AM - 9:00 PM',
                'disponible' => true,
                'destacado' => true,
                'incluye' => ['Masaje relajante', 'Sauna', 'Jacuzzi', 'Tratamiento facial', 'Aromterapia'],
                'caracteristicas' => ['Especialistas certificados', 'Productos premium', 'Ambiente de lujo', 'Relajación total'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'Restaurante Gourmet',
                'categoria' => 'Gastronomía',
                'precio' => 450.00,
                'duracion' => '2 horas',
                'descripcion' => 'Experiencia culinaria única con menú degustación de cocina internacional y maridaje de vinos.',
                'descripcion_larga' => 'Vive una experiencia culinaria única en nuestro restaurante gourmet. Disfruta de un exquisito menú degustación de 5 platillos que fusiona lo mejor de la cocina internacional con ingredientes locales frescos. Cada platillo viene acompañado de un maridaje de vinos cuidadosamente seleccionado por nuestro sommelier, todo servido en un ambiente romántico con chef privado.',
                'imagen' => 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'calificacion' => 4.7,
                'popularidad' => 198,
                'horarios' => '6:00 PM - 11:00 PM',
                'disponible' => true,
                'destacado' => true,
                'incluye' => ['Menú degustación 5 platos', 'Maridaje de vinos', 'Chef privado', 'Ambiente romántico'],
                'caracteristicas' => ['Cocina internacional', 'Ingredientes frescos', 'Sommelier experto', 'Servicio personalizado'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'Centro de Fitness',
                'categoria' => 'Deporte',
                'precio' => 200.00,
                'duracion' => 'Acceso diario',
                'descripcion' => 'Gimnasio completamente equipado con entrenador personal disponible y clases grupales.',
                'descripcion_larga' => 'Mantén tu rutina de ejercicio en nuestro moderno centro de fitness, completamente equipado con la última tecnología en equipamiento deportivo. Incluye acceso a entrenador personal certificado, participación en clases grupales variadas y uso libre de nuestra piscina olímpica. Perfecto para mantener tu estado físico durante tu estancia.',
                'imagen' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'calificacion' => 4.3,
                'popularidad' => 156,
                'horarios' => '5:00 AM - 11:00 PM',
                'disponible' => true,
                'destacado' => false,
                'incluye' => ['Acceso a gimnasio', 'Entrenador personal', 'Clases grupales', 'Piscina olímpica'],
                'caracteristicas' => ['Equipamiento moderno', 'Entrenadores certificados', 'Horario extendido', 'Instalaciones completas'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'Servicio de Concierge',
                'categoria' => 'Asistencia',
                'precio' => 300.00,
                'duracion' => '24 horas',
                'descripcion' => 'Asistencia personalizada para reservas, tours, transporte y cualquier necesidad durante su estancia.',
                'descripcion_larga' => 'Nuestro servicio de concierge está disponible las 24 horas para hacer tu estancia perfecta. Te ayudamos con reservas de espectáculos y restaurantes, organizamos tours personalizados según tus intereses, coordinamos transporte privado y cualquier otra necesidad especial que tengas. Tu satisfacción es nuestra prioridad.',
                'imagen' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'calificacion' => 4.5,
                'popularidad' => 134,
                'horarios' => '24 horas',
                'disponible' => true,
                'destacado' => false,
                'incluye' => ['Reservas de espectáculos', 'Tours personalizados', 'Transporte privado', 'Asistencia 24/7'],
                'caracteristicas' => ['Servicio personalizado', 'Disponibilidad total', 'Experiencia local', 'Atención premium'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'Piscina VIP',
                'categoria' => 'Recreación',
                'precio' => 180.00,
                'duracion' => '4 horas',
                'descripcion' => 'Acceso exclusivo a piscina privada con servicio de bar y área de descanso premium.',
                'descripcion_larga' => 'Disfruta de 4 horas de acceso exclusivo a nuestra piscina VIP privada. El servicio incluye área de descanso premium con camastros de lujo, servicio de bar con bebidas y snacks, música ambiente personalizada y total privacidad. Perfecto para relajarte y disfrutar de un ambiente exclusivo.',
                'imagen' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'calificacion' => 4.6,
                'popularidad' => 189,
                'horarios' => '10:00 AM - 8:00 PM',
                'disponible' => true,
                'destacado' => true,
                'incluye' => ['Piscina privada', 'Servicio de bar', 'Camastros premium', 'Música ambiente'],
                'caracteristicas' => ['Acceso exclusivo', 'Privacidad total', 'Servicio premium', 'Ambiente relajante'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'Sala de Conferencias',
                'categoria' => 'Negocios',
                'precio' => 650.00,
                'duracion' => '8 horas',
                'descripcion' => 'Espacio profesional equipado con tecnología de punta para reuniones y eventos corporativos.',
                'descripcion_larga' => 'Nuestra sala de conferencias profesional está equipada con la más avanzada tecnología para tus reuniones de negocios. Incluye proyector 4K, sistema de sonido profesional, WiFi premium de alta velocidad y servicio de catering personalizado. El espacio perfecto para impresionar a clientes y cerrar importantes acuerdos de negocio.',
                'imagen' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'calificacion' => 4.2,
                'popularidad' => 87,
                'horarios' => '8:00 AM - 6:00 PM',
                'disponible' => false,
                'destacado' => false,
                'incluye' => ['Proyector 4K', 'Sistema de sonido', 'WiFi premium', 'Servicio de catering'],
                'caracteristicas' => ['Tecnología avanzada', 'Ambiente profesional', 'Capacidad amplia', 'Servicio completo'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'Servicio de Habitación Premium',
                'categoria' => 'Hospitalidad',
                'precio' => 120.00,
                'duracion' => 'Según solicitud',
                'descripcion' => 'Servicio de habitación 24/7 con menú gourmet y atención personalizada.',
                'descripcion_larga' => 'Disfruta de nuestro servicio de habitación premium disponible las 24 horas. Incluye un extenso menú gourmet preparado por nuestros chefs, selección de bebidas premium, atención personalizada y entrega rápida. Todo lo que necesites llegará a tu habitación con la más alta calidad y presentación.',
                'imagen' => 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'calificacion' => 4.4,
                'popularidad' => 167,
                'horarios' => '24 horas',
                'disponible' => true,
                'destacado' => false,
                'incluye' => ['Menú gourmet', 'Servicio 24/7', 'Atención personalizada', 'Bebidas premium'],
                'caracteristicas' => ['Disponibilidad total', 'Calidad gourmet', 'Servicio rápido', 'Atención premium'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'nombre' => 'Tour Gastronómico',
                'categoria' => 'Turismo',
                'precio' => 380.00,
                'duracion' => '5 horas',
                'descripcion' => 'Recorrido por los mejores restaurantes locales con degustaciones y experiencias culturales.',
                'descripcion_larga' => 'Embárcate en un fascinante tour gastronómico de 5 horas que te llevará por los mejores restaurantes y sitios culinarios locales. Acompañado de un guía especializado en gastronomía local, disfrutarás de degustaciones únicas, aprenderás sobre la cultura culinaria de la región y vivirás una auténtica experiencia cultural. Incluye transporte y todas las degustaciones.',
                'imagen' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'calificacion' => 4.7,
                'popularidad' => 213,
                'horarios' => '11:00 AM - 4:00 PM',
                'disponible' => true,
                'destacado' => true,
                'incluye' => ['Guía especializado', 'Degustaciones', 'Transporte incluido', 'Experiencia cultural'],
                'caracteristicas' => ['Experiencia auténtica', 'Gastronomía local', 'Guía experto', 'Cultura gastronómica'],
                'imagenes' => [
                    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
                ]
            ]
        ];

        foreach ($servicios as $servicioData) {
            Servicio::create($servicioData);
        }
    }
}
