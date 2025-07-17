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
        Schema::create('hoteles', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->comment('Nombre del hotel');
            $table->enum('tipo', ['Hotel', 'Motel', 'Habitaciones'])->comment('Tipo de establecimiento');
            $table->string('estado')->comment('Estado donde se ubica el hotel');
            $table->string('ciudad')->comment('Ciudad donde se ubica el hotel');
            $table->string('foto')->nullable()->comment('Ruta de la foto del hotel');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hoteles');
    }
};
