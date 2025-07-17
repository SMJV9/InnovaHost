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
        Schema::create('moteles', function (Blueprint $table) {
            $table->id();
            
            // Información básica
            $table->string('nombre')->comment('Nombre del motel');
            $table->string('estado')->comment('Estado donde se ubica el motel');
            $table->string('ciudad')->comment('Ciudad donde se ubica el motel');
            $table->string('direccion')->nullable()->comment('Dirección completa del motel');
            $table->string('telefono')->nullable()->comment('Teléfono de contacto');
            $table->string('email')->nullable()->comment('Email de contacto');
            $table->string('sitio_web')->nullable()->comment('Sitio web del motel');
            $table->string('foto')->nullable()->comment('Ruta de la foto principal del motel');
            
            // Información comercial
            $table->decimal('precio', 8, 2)->comment('Precio por noche');
            $table->decimal('calificacion', 3, 2)->default(0.00)->comment('Calificación del motel (0.00 a 5.00)');
            $table->integer('resenas')->default(0)->comment('Número de reseñas');
            $table->text('descripcion')->nullable()->comment('Descripción del motel');
            $table->text('descripcion_larga')->nullable()->comment('Descripción detallada del motel');
            
            // Políticas del motel
            $table->time('checkin')->default('15:00')->comment('Hora de check-in');
            $table->time('checkout')->default('12:00')->comment('Hora de check-out');
            
            // Estado y características
            $table->boolean('disponible')->default(true)->comment('Si el motel está disponible para reservas');
            $table->boolean('destacado')->default(false)->comment('Si el motel es destacado');
            $table->json('servicios')->nullable()->comment('Servicios del motel en formato JSON');
            $table->json('caracteristicas')->nullable()->comment('Características de las habitaciones en formato JSON');
            $table->json('imagenes')->nullable()->comment('URLs de imágenes adicionales en formato JSON');
            
            $table->timestamps();
            
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
        Schema::dropIfExists('moteles');
    }
};
