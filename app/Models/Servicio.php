<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Servicio extends Model
{
    use HasFactory;

    /**
     * Nombre de la tabla en la base de datos
     */
    protected $table = 'servicios';

    /**
     * La clave primaria asociada con la tabla
     */
    protected $primaryKey = 'id_servicio';

    /**
     * Los atributos que son asignables en masa
     */
    protected $fillable = [
        'nombre',
        'categoria',
        'precio',
        'duracion',
        'descripcion',
        'descripcion_larga',
        'imagen',
        'calificacion',
        'popularidad',
        'horarios',
        'disponible',
        'destacado',
        'incluye',
        'caracteristicas',
        'imagenes'
    ];

    /**
     * Los atributos que deben ser casteados a tipos nativos
     */
    protected $casts = [
        'precio' => 'decimal:2',
        'calificacion' => 'decimal:2',
        'popularidad' => 'integer',
        'disponible' => 'boolean',
        'destacado' => 'boolean',
        'incluye' => 'array',
        'caracteristicas' => 'array',
        'imagenes' => 'array',
    ];

    /**
     * Scope para servicios disponibles
     */
    public function scopeDisponible($query)
    {
        return $query->where('disponible', true);
    }

    /**
     * Scope para servicios destacados
     */
    public function scopeDestacado($query)
    {
        return $query->where('destacado', true);
    }

    /**
     * Scope para filtrar por categoría
     */
    public function scopePorCategoria($query, $categoria)
    {
        return $query->where('categoria', $categoria);
    }

    /**
     * Scope para filtrar por rango de precios
     */
    public function scopePorRangoPrecio($query, $min, $max)
    {
        return $query->whereBetween('precio', [$min, $max]);
    }

    /**
     * Scope para filtrar por calificación mínima
     */
    public function scopeConCalificacionMinima($query, $calificacion)
    {
        return $query->where('calificacion', '>=', $calificacion);
    }

    /**
     * Scope para ordenar por popularidad
     */
    public function scopeOrdenarPorPopularidad($query)
    {
        return $query->orderBy('popularidad', 'desc');
    }

    /**
     * Accessor para obtener la primera imagen
     */
    public function getPrimeraImagenAttribute()
    {
        if ($this->imagenes && is_array($this->imagenes) && count($this->imagenes) > 0) {
            return $this->imagenes[0];
        }
        return $this->imagen; // Fallback a la imagen principal
    }

    /**
     * Accessor para obtener el precio formateado
     */
    public function getPrecioFormateadoAttribute()
    {
        return '$' . number_format($this->precio, 0, '.', ',');
    }

    /**
     * Accessor para obtener todas las categorías únicas
     */
    public static function getCategorias()
    {
        return self::select('categoria')
                   ->distinct()
                   ->orderBy('categoria')
                   ->pluck('categoria');
    }
}
