<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class Cliente extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $table = 'clientes';
    protected $primaryKey = 'id_cliente';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'nombre',
        'correo',
        'telefono',
        'direccion',
        'clave',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'clave',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'correo_verified_at' => 'datetime',
            'clave' => 'hashed',
        ];
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     */
    public function getJWTCustomClaims()
    {
        return [
            'user_type' => 'cliente',
            'id' => $this->id_cliente,
            'name' => $this->nombre,
            'email' => $this->correo
        ];
    }

    /**
     * Get the password for authentication.
     */
    public function getAuthPassword()
    {
        return $this->clave;
    }

    /**
     * Get the email for authentication.
     */
    public function getEmailForPasswordReset()
    {
        return $this->correo;
    }

    /**
     * Relación con reservas
     */
    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'id_cliente', 'id_cliente');
    }
}
