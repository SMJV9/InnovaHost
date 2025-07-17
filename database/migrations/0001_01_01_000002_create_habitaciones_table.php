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
        Schema::create('habitaciones', function (Blueprint $table) {
            $table->id('id_habitacion');
            $table->integer('numero')->index();
            $table->string('tipo');
            $table->string('descripcion')->nullable();
            $table->string('estado')->default('disponible'); // disponible, ocupado, en_mantenimiento
            $table->decimal('precio_noche', 10, 2);
        
        });

     
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habitaciones');
    }
};
