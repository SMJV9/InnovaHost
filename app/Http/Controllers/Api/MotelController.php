<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Motel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Motel::query();

            // Filtros de búsqueda
            if ($request->has('busqueda') && $request->busqueda) {
                $busqueda = $request->busqueda;
                $query->where(function($q) use ($busqueda) {
                    $q->where('nombre', 'LIKE', "%{$busqueda}%")
                      ->orWhere('ciudad', 'LIKE', "%{$busqueda}%")
                      ->orWhere('estado', 'LIKE', "%{$busqueda}%");
                });
            }

            // Filtro por estado
            if ($request->has('estado') && $request->estado) {
                $query->porEstado($request->estado);
            }

            // Filtro por ciudad
            if ($request->has('ciudad') && $request->ciudad) {
                $query->porCiudad($request->ciudad);
            }

            // Filtro por precio
            if ($request->has('precio') && $request->precio) {
                switch ($request->precio) {
                    case 'economico':
                        $query->where('precio', '<', 400);
                        break;
                    case 'medio':
                        $query->whereBetween('precio', [400, 600]);
                        break;
                    case 'alto':
                        $query->where('precio', '>', 600);
                        break;
                }
            }

            // Filtro por calificación
            if ($request->has('calificacion') && $request->calificacion) {
                $query->conCalificacionMinima($request->calificacion);
            }

            // Filtro por disponibilidad
            if ($request->has('disponible') && $request->disponible !== null) {
                $query->where('disponible', $request->boolean('disponible'));
            }

            // Solo moteles disponibles por defecto
            if (!$request->has('incluir_no_disponibles')) {
                $query->disponible();
            }

            // Ordenamiento
            $orden = $request->get('orden', 'popularidad');
            switch ($orden) {
                case 'precio-asc':
                    $query->orderBy('precio', 'asc');
                    break;
                case 'precio-desc':
                    $query->orderBy('precio', 'desc');
                    break;
                case 'calificacion':
                    $query->orderBy('calificacion', 'desc');
                    break;
                case 'nombre':
                    $query->orderBy('nombre', 'asc');
                    break;
                case 'popularidad':
                default:
                    $query->orderBy('resenas', 'desc');
                    break;
            }

            // Paginación
            $porPagina = $request->get('por_pagina', 12);
            $moteles = $query->paginate($porPagina);

            return response()->json([
                'success' => true,
                'data' => $moteles->items(),
                'pagination' => [
                    'current_page' => $moteles->currentPage(),
                    'last_page' => $moteles->lastPage(),
                    'per_page' => $moteles->perPage(),
                    'total' => $moteles->total(),
                    'from' => $moteles->firstItem(),
                    'to' => $moteles->lastItem(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los moteles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        try {
            $motel = Motel::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $motel
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Motel no encontrado'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el motel',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get featured motels
     */
    public function destacados(): JsonResponse
    {
        try {
            $moteles = Motel::destacado()
                           ->disponible()
                           ->orderBy('calificacion', 'desc')
                           ->limit(8)
                           ->get();

            return response()->json([
                'success' => true,
                'data' => $moteles
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener moteles destacados',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Search motels
     */
    public function buscar(Request $request): JsonResponse
    {
        try {
            $termino = $request->get('q', '');
            
            if (empty($termino)) {
                return response()->json([
                    'success' => true,
                    'data' => []
                ]);
            }

            $moteles = Motel::where('nombre', 'LIKE', "%{$termino}%")
                           ->orWhere('ciudad', 'LIKE', "%{$termino}%")
                           ->orWhere('estado', 'LIKE', "%{$termino}%")
                           ->disponible()
                           ->limit(10)
                           ->get();

            return response()->json([
                'success' => true,
                'data' => $moteles
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error en la búsqueda',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get states and cities for filters
     */
    public function ubicaciones(): JsonResponse
    {
        try {
            $estados = Motel::select('estado')
                           ->distinct()
                           ->orderBy('estado')
                           ->pluck('estado');

            $ciudades = Motel::select('ciudad', 'estado')
                            ->distinct()
                            ->orderBy('estado')
                            ->orderBy('ciudad')
                            ->get()
                            ->groupBy('estado');

            return response()->json([
                'success' => true,
                'data' => [
                    'estados' => $estados,
                    'ciudades' => $ciudades
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener ubicaciones',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Implementar si necesitas crear moteles desde el API
        // Requeriría validaciones y autorización
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Implementar si necesitas actualizar moteles desde el API
        // Requeriría validaciones y autorización
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Implementar si necesitas eliminar moteles desde el API
        // Requeriría autorización
    }
}
