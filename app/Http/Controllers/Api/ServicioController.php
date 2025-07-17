<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ServicioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Servicio::query();

            // Filtros de búsqueda
            if ($request->has('busqueda') && $request->busqueda) {
                $busqueda = $request->busqueda;
                $query->where(function($q) use ($busqueda) {
                    $q->where('nombre', 'LIKE', "%{$busqueda}%")
                      ->orWhere('categoria', 'LIKE', "%{$busqueda}%")
                      ->orWhere('descripcion', 'LIKE', "%{$busqueda}%");
                });
            }

            // Filtro por categoría
            if ($request->has('categoria') && $request->categoria) {
                $query->porCategoria($request->categoria);
            }

            // Filtro por precio
            if ($request->has('precio') && $request->precio) {
                switch ($request->precio) {
                    case 'economico':
                        $query->where('precio', '<', 300);
                        break;
                    case 'medio':
                        $query->whereBetween('precio', [300, 600]);
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

            // Solo servicios disponibles por defecto
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
                    $query->ordenarPorPopularidad();
                    break;
            }

            // Paginación
            $porPagina = $request->get('por_pagina', 12);
            $servicios = $query->paginate($porPagina);

            return response()->json([
                'success' => true,
                'data' => $servicios->items(),
                'pagination' => [
                    'current_page' => $servicios->currentPage(),
                    'last_page' => $servicios->lastPage(),
                    'per_page' => $servicios->perPage(),
                    'total' => $servicios->total(),
                    'from' => $servicios->firstItem(),
                    'to' => $servicios->lastItem(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los servicios',
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
            $servicio = Servicio::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $servicio
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Servicio no encontrado'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el servicio',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get featured services
     */
    public function destacados(): JsonResponse
    {
        try {
            $servicios = Servicio::destacado()
                               ->disponible()
                               ->orderBy('calificacion', 'desc')
                               ->limit(8)
                               ->get();

            return response()->json([
                'success' => true,
                'data' => $servicios
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener servicios destacados',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Search services
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

            $servicios = Servicio::where('nombre', 'LIKE', "%{$termino}%")
                               ->orWhere('categoria', 'LIKE', "%{$termino}%")
                               ->orWhere('descripcion', 'LIKE', "%{$termino}%")
                               ->disponible()
                               ->limit(10)
                               ->get();

            return response()->json([
                'success' => true,
                'data' => $servicios
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
     * Get categories for filters
     */
    public function categorias(): JsonResponse
    {
        try {
            $categorias = Servicio::getCategorias();

            return response()->json([
                'success' => true,
                'data' => $categorias
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener categorías',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Implementar si necesitas crear servicios desde el API
        // Requeriría validaciones y autorización
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Implementar si necesitas actualizar servicios desde el API
        // Requeriría validaciones y autorización
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Implementar si necesitas eliminar servicios desde el API
        // Requeriría autorización
    }
}
