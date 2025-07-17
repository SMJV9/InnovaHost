<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('hoteles', function (Blueprint $table) {
            // Información básica adicional
            $table->decimal('precio', 8, 2)->after('foto')->comment('Precio por noche');
            $table->decimal('calificacion', 3, 2)->default(0.00)->after('precio')->comment('Calificación del hotel (0.00 a 5.00)');
            $table->integer('resenas')->default(0)->after('calificacion')->comment('Número de reseñas');
            $table->text('descripcion')->nullable()->after('resenas')->comment('Descripción del hotel');
            $table->text('descripcion_larga')->nullable()->after('descripcion')->comment('Descripción detallada del hotel');
            
            // Información de contacto
            $table->string('direccion')->nullable()->after('ciudad')->comment('Dirección completa del hotel');
            $table->string('telefono')->nullable()->after('direccion')->comment('Teléfono de contacto');
            $table->string('email')->nullable()->after('telefono')->comment('Email de contacto');
            $table->string('sitio_web')->nullable()->after('email')->comment('Sitio web del hotel');
            
            // Políticas del hotel
            $table->time('checkin')->default('15:00')->after('descripcion_larga')->comment('Hora de check-in');
            $table->time('checkout')->default('12:00')->after('checkin')->comment('Hora de check-out');
            
            // Estado y características
            $table->boolean('disponible')->default(true)->after('checkout')->comment('Si el hotel está disponible para reservas');
            $table->boolean('destacado')->default(false)->after('disponible')->comment('Si el hotel es destacado');
            $table->json('servicios')->nullable()->after('destacado')->comment('Servicios del hotel en formato JSON');
            $table->json('caracteristicas')->nullable()->after('servicios')->comment('Características de las habitaciones en formato JSON');
            $table->json('imagenes')->nullable()->after('caracteristicas')->comment('URLs de imágenes adicionales en formato JSON');
            
            // Índices para mejorar las consultas
            $table->index('estado');
            $table->index('ciudad');
            $table->index(['disponible', 'destacado']);
            $table->index('precio');
            $table->index('calificacion');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hoteles', function (Blueprint $table) {
            // Eliminar índices primero
            $table->dropIndex(['estado']);
            $table->dropIndex(['ciudad']);
            $table->dropIndex(['disponible', 'destacado']);
            $table->dropIndex(['precio']);
            $table->dropIndex(['calificacion']);
            
            // Eliminar columnas
            $table->dropColumn([
                'precio',
                'calificacion', 
                'resenas',
                'descripcion',
                'descripcion_larga',
                'direccion',
                'telefono',
                'email',
                'sitio_web',
                'checkin',
                'checkout',
                'disponible',
                'destacado',
                'servicios',
                'caracteristicas',
                'imagenes'
            ]);
        });
    }
};
