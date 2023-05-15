<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $primaryKey = 'machine_id';
    public $table = 'machines';
    protected $fillable = [
        'machine_name',
        'maintenance_date',
        'line_id'
    ];

    public function productionLine(){
        return $this->belongsTo(ProductionLine::class,'line_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'machine_id');
    }
}
