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
        Schema::create('empleados', function (Blueprint $table) {
            $table->id('id_empleado');
            $table->foreignId('id_rol')->constrained('rol')->onDelete('cascade');
            $table->string('nombre',191);
            $table->string('correo', 191)->unique();
            $table->timestamp('correo_verified_at')->nullable();
            $table->string('telefono')->nullable();
            $table->string('cuenta')->nullable();
            $table->string('clave');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};
