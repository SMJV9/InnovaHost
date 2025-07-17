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
        Schema::table('servicios', function (Blueprint $table) {
            // Agregar nuevas columnas
            $table->string('categoria')->after('nombre')->comment('Categoría del servicio');
            $table->string('duracion')->nullable()->after('precio')->comment('Duración del servicio');
            $table->text('descripcion_larga')->nullable()->after('descripcion')->comment('Descripción detallada del servicio');
            $table->string('imagen')->nullable()->after('descripcion_larga')->comment('Ruta de la imagen principal del servicio');
            $table->decimal('calificacion', 3, 2)->default(0.00)->after('imagen')->comment('Calificación del servicio (0.00 a 5.00)');
            $table->integer('popularidad')->default(0)->after('calificacion')->comment('Índice de popularidad del servicio');
            $table->string('horarios')->nullable()->after('popularidad')->comment('Horarios de disponibilidad');
            $table->boolean('disponible')->default(true)->after('horarios')->comment('Si el servicio está disponible');
            $table->boolean('destacado')->default(false)->after('disponible')->comment('Si el servicio es destacado');
            $table->json('incluye')->nullable()->after('destacado')->comment('Lo que incluye el servicio en formato JSON');
            $table->json('caracteristicas')->nullable()->after('incluye')->comment('Características adicionales del servicio en formato JSON');
            $table->json('imagenes')->nullable()->after('caracteristicas')->comment('URLs de imágenes adicionales en formato JSON');
            
            // Agregar índices
            $table->index('categoria');
            $table->index(['disponible', 'destacado']);
            $table->index('calificacion');
            $table->index('popularidad');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('servicios', function (Blueprint $table) {
            // Eliminar índices
            $table->dropIndex(['categoria']);
            $table->dropIndex(['disponible', 'destacado']);
            $table->dropIndex(['calificacion']);
            $table->dropIndex(['popularidad']);
            
            // Eliminar columnas agregadas
            $table->dropColumn([
                'categoria',
                'duracion',
                'descripcion_larga',
                'imagen',
                'calificacion',
                'popularidad',
                'horarios',
                'disponible',
                'destacado',
                'incluye',
                'caracteristicas',
                'imagenes'
            ]);
        });
    }
};
