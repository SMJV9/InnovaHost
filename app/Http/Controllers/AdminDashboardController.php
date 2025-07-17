<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Cliente;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    /**
     * Get dashboard statistics
     */
    public function dashboard()
    {
        try {
            $stats = [
                'total_clientes' => Cliente::count(),
                'total_hoteles' => Hotel::count(),
                'total_administradores' => User::count(),
                'clientes_recientes' => Cliente::orderBy('created_at', 'desc')->take(5)->get(),
                'hoteles_por_estado' => Hotel::select('estado', DB::raw('count(*) as total'))
                    ->groupBy('estado')
                    ->orderBy('total', 'desc')
                    ->get(),
                'resumen_mensual' => [
                    'clientes_nuevos' => Cliente::whereMonth('created_at', now()->month)->count(),
                    'hoteles_nuevos' => Hotel::whereMonth('created_at', now()->month)->count(),
                ]
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener estadísticas del dashboard',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all clients with pagination
     */
    public function getClientes(Request $request)
    {
        try {
            $perPage = $request->get('per_page', 15);
            $search = $request->get('search');

            $query = Cliente::query();

            if ($search) {
                $query->where(function($q) use ($search) {
                    $q->where('nombre', 'like', "%{$search}%")
                      ->orWhere('correo', 'like', "%{$search}%")
                      ->orWhere('telefono', 'like', "%{$search}%");
                });
            }

            $clientes = $query->orderBy('created_at', 'desc')->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $clientes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener clientes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all hotels with pagination
     */
    public function getHoteles(Request $request)
    {
        try {
            $perPage = $request->get('per_page', 15);
            $search = $request->get('search');

            $query = Hotel::query();

            if ($search) {
                $query->where(function($q) use ($search) {
                    $q->where('nombre', 'like', "%{$search}%")
                      ->orWhere('ciudad', 'like', "%{$search}%")
                      ->orWhere('estado', 'like', "%{$search}%");
                });
            }

            $hoteles = $query->orderBy('created_at', 'desc')->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $hoteles
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener hoteles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update hotel information
     */
    public function updateHotel(Request $request, $id)
    {
        try {
            $hotel = Hotel::findOrFail($id);

            $request->validate([
                'nombre' => 'required|string|max:255',
                'tipo' => 'required|string|max:100',
                'estado' => 'required|string|max:100',
                'ciudad' => 'required|string|max:100',
                'direccion' => 'nullable|string|max:500',
                'telefono' => 'nullable|string|max:20',
                'email' => 'nullable|email|max:255',
                'precio' => 'nullable|numeric|min:0',
                'calificacion' => 'nullable|numeric|min:0|max:5',
            ]);

            $hotel->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Hotel actualizado correctamente',
                'data' => $hotel
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar hotel',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete hotel
     */
    public function deleteHotel($id)
    {
        try {
            $hotel = Hotel::findOrFail($id);
            $hotel->delete();

            return response()->json([
                'success' => true,
                'message' => 'Hotel eliminado correctamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar hotel',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get activity logs (recent changes)
     */
    public function getActivityLogs()
    {
        try {
            $activities = [
                [
                    'type' => 'cliente_registro',
                    'description' => 'Nuevos clientes registrados',
                    'count' => Cliente::whereDate('created_at', today())->count(),
                    'date' => today()->format('Y-m-d')
                ],
                [
                    'type' => 'hotel_update',
                    'description' => 'Hoteles actualizados',
                    'count' => Hotel::whereDate('updated_at', today())->count(),
                    'date' => today()->format('Y-m-d')
                ]
            ];

            return response()->json([
                'success' => true,
                'data' => $activities
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener logs de actividad',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
