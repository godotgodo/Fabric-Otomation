<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public $timestamps = false;
    public $primaryKey = 'admin_id';
    public $table = 'admins';
    protected $fillable = [
        'password',
        'employee_id'
    ];

    public function employee(){
        return $this->belongsTo(Employee::class,'employee_id');
    }
}
