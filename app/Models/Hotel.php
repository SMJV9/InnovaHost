<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hotel extends Model
{
    use HasFactory;

    /**
     * Nombre de la tabla en la base de datos
     */
    protected $table = 'hoteles';

    /**
     * Los atributos que son asignables en masa
     */
    protected $fillable = [
        'nombre',
        'tipo',
        'estado',
        'ciudad',
        'direccion',
        'telefono',
        'email',
        'sitio_web',
        'foto',
        'precio',
        'calificacion',
        'resenas',
        'descripcion',
        'descripcion_larga',
        'checkin',
        'checkout',
        'disponible',
        'destacado',
        'servicios',
        'caracteristicas',
        'imagenes'
    ];

    /**
     * Los atributos que deben ser casteados a tipos nativos
     */
    protected $casts = [
        'precio' => 'decimal:2',
        'calificacion' => 'decimal:2',
        'resenas' => 'integer',
        'disponible' => 'boolean',
        'destacado' => 'boolean',
        'servicios' => 'array',
        'caracteristicas' => 'array',
        'imagenes' => 'array',
        'checkin' => 'datetime:H:i',
        'checkout' => 'datetime:H:i',
    ];

    /**
     * Scope para hoteles disponibles
     */
    public function scopeDisponible($query)
    {
        return $query->where('disponible', true);
    }

    /**
     * Scope para hoteles destacados
     */
    public function scopeDestacado($query)
    {
        return $query->where('destacado', true);
    }

    /**
     * Scope para filtrar por estado
     */
    public function scopePorEstado($query, $estado)
    {
        return $query->where('estado', $estado);
    }

    /**
     * Scope para filtrar por ciudad
     */
    public function scopePorCiudad($query, $ciudad)
    {
        return $query->where('ciudad', $ciudad);
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
     * Accessor para obtener la primera imagen
     */
    public function getPrimeraImagenAttribute()
    {
        if ($this->imagenes && is_array($this->imagenes) && count($this->imagenes) > 0) {
            return $this->imagenes[0];
        }
        return $this->foto; // Fallback a la foto principal
    }

    /**
     * Accessor para obtener la ubicación completa
     */
    public function getUbicacionCompletaAttribute()
    {
        return $this->ciudad . ', ' . $this->estado;
    }

    /**
     * Accessor para obtener el precio formateado
     */
    public function getPrecioFormateadoAttribute()
    {
        return '$' . number_format($this->precio, 0, '.', ',');
    }
}
