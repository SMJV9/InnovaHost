<?php
 
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClienteAuthController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\MotelController;
use App\Http\Controllers\Api\ServicioController;

// Rutas de autenticación para administradores
Route::group([
    'middleware' => 'api',
    'prefix' => 'admin/auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
    Route::post('/me', [AuthController::class, 'me'])->middleware('auth:api');
});

// Rutas de autenticación para clientes
Route::group([
    'middleware' => 'api',
    'prefix' => 'cliente/auth'
], function ($router) {
    Route::post('/registro', [ClienteAuthController::class, 'register']);
    Route::post('/login', [ClienteAuthController::class, 'login']);
    Route::post('/logout', [ClienteAuthController::class, 'logout'])->middleware('auth:cliente');
    Route::post('/refresh', [ClienteAuthController::class, 'refresh'])->middleware('auth:cliente');
    Route::post('/me', [ClienteAuthController::class, 'me'])->middleware('auth:cliente');
});

// Rutas protegidas para administradores
Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'admin'
], function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'dashboard']);
    Route::get('/clientes', [AdminDashboardController::class, 'getClientes']);
    Route::get('/hoteles', [AdminDashboardController::class, 'getHoteles']);
    Route::put('/hoteles/{id}', [AdminDashboardController::class, 'updateHotel']);
    Route::delete('/hoteles/{id}', [AdminDashboardController::class, 'deleteHotel']);
    Route::get('/activity-logs', [AdminDashboardController::class, 'getActivityLogs']);
    
    // Perfil de administrador
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
});

// Rutas protegidas para clientes
Route::group([
    'middleware' => 'auth:cliente',
    'prefix' => 'cliente'
], function () {
    Route::get('/profile', [ClienteAuthController::class, 'profile']);
    Route::put('/profile', [ClienteAuthController::class, 'updateProfile']);
});

// Rutas públicas de hoteles
Route::group([
    'prefix' => 'hoteles'
], function () {
    Route::get('/', [HotelController::class, 'index']);
    Route::get('/destacados', [HotelController::class, 'destacados']);
    Route::get('/buscar', [HotelController::class, 'buscar']);
    Route::get('/ubicaciones', [HotelController::class, 'ubicaciones']);
    Route::get('/{id}', [HotelController::class, 'show']);
});

// Rutas públicas de moteles
Route::group([
    'prefix' => 'moteles'
], function () {
    Route::get('/', [MotelController::class, 'index']);
    Route::get('/destacados', [MotelController::class, 'destacados']);
    Route::get('/buscar', [MotelController::class, 'buscar']);
    Route::get('/ubicaciones', [MotelController::class, 'ubicaciones']);
    Route::get('/{id}', [MotelController::class, 'show']);
});

// Rutas públicas de servicios
Route::group([
    'prefix' => 'servicios'
], function () {
    Route::get('/', [ServicioController::class, 'index']);
    Route::get('/destacados', [ServicioController::class, 'destacados']);
    Route::get('/buscar', [ServicioController::class, 'buscar']);
    Route::get('/categorias', [ServicioController::class, 'categorias']);
    Route::get('/{id}', [ServicioController::class, 'show']);
});

// Mantener compatibilidad con rutas anteriores
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/registro', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
    Route::post('/me', [AuthController::class, 'me'])->middleware('auth:api');
});

Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'user'
], function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
});