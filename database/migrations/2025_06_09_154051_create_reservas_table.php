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
        Schema::create('reservas', function (Blueprint $table) {
            $table->id('id_reserva');
            $table->foreignId('id_cliente')->constrained('clientes')->onDelete('cascade');
            $table->foreignId('id_habitacion')->constrained('habitaciones')->onDelete('cascade');
            $table->foreignId('id_servicio')->nullable()->constrained('servicios')->onDelete('set null');
            $table->foreignId('id_pago')->nullable()->constrained('pagos')->onDelete('set null');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->string('estado')->default('pendiente'); // pendiente, confirmada, cancelada
            $table->dateTime('fecha_reserva')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
