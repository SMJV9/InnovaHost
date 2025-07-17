<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class ClienteAuthController extends Controller
{
    /**
     * Register a new client
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'correo' => 'required|string|email|max:191|unique:clientes,correo',
            'telefono' => 'nullable|string|max:20',
            'direccion' => 'nullable|string|max:500',
            'clave' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $cliente = Cliente::create([
            'nombre' => $request->nombre,
            'correo' => $request->correo,
            'telefono' => $request->telefono,
            'direccion' => $request->direccion,
            'clave' => Hash::make($request->clave),
        ]);

        // Configurar guard para clientes
        config(['auth.defaults.guard' => 'cliente']);
        $token = JWTAuth::fromUser($cliente);

        return response()->json([
            'message' => 'Cliente registrado exitosamente',
            'cliente' => $cliente,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60,
            'user_type' => 'cliente'
        ], 201);
    }

    /**
     * Login client
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'correo' => 'required|email',
            'clave' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $credentials = [
            'correo' => $request->correo,
            'password' => $request->clave
        ];

        // Configurar guard para clientes
        config(['auth.defaults.guard' => 'cliente']);
        
        if (!$token = auth('cliente')->attempt($credentials)) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get client profile
     */
    public function profile()
    {
        return response()->json([
            'cliente' => auth('cliente')->user()
        ]);
    }

    /**
     * Update client profile
     */
    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'correo' => 'required|string|email|max:191|unique:clientes,correo,' . auth('cliente')->id() . ',id_cliente',
            'telefono' => 'nullable|string|max:20',
            'direccion' => 'nullable|string|max:500',
            'clave' => 'nullable|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $cliente = auth('cliente')->user();
        $data = $request->only(['nombre', 'correo', 'telefono', 'direccion']);

        // Solo actualizar contraseña si se proporciona
        if ($request->clave) {
            $data['clave'] = Hash::make($request->clave);
        }

        $cliente->update($data);

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'cliente' => $cliente->fresh()
        ]);
    }

    /**
     * Logout client
     */
    public function logout()
    {
        auth('cliente')->logout();
        return response()->json(['message' => 'Sesión cerrada exitosamente']);
    }

    /**
     * Refresh token
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('cliente')->refresh());
    }

    /**
     * Get current client
     */
    public function me()
    {
        return response()->json(auth('cliente')->user());
    }

    /**
     * Get the token array structure.
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60,
            'cliente' => auth('cliente')->user(),
            'user_type' => 'cliente'
        ]);
    }
}
