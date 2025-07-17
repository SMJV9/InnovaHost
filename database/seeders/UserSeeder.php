<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Crear usuario administrador si no existe
        User::firstOrCreate(
            ['email' => 'admin@hotel.com'],
            [
                'name' => 'Super Administrador',
                'password' => Hash::make('admin123'),
                'role' => 'super_admin',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'manager@hotel.com'],
            [
                'name' => 'Manager Hotel',
                'password' => Hash::make('manager123'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // Crear algunos clientes de prueba
        \App\Models\Cliente::firstOrCreate(
            ['correo' => 'cliente1@ejemplo.com'],
            [
                'nombre' => 'Juan Pérez',
                'telefono' => '+52 123 456 7890',
                'direccion' => 'Calle Principal 123, Ciudad',
                'clave' => Hash::make('cliente123'),
            ]
        );

        \App\Models\Cliente::firstOrCreate(
            ['correo' => 'cliente2@ejemplo.com'],
            [
                'nombre' => 'María García',
                'telefono' => '+52 987 654 3210',
                'direccion' => 'Avenida Central 456, Ciudad',
                'clave' => Hash::make('cliente123'),
            ]
        );
    }
}
