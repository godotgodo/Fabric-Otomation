<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionLine extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $primaryKey = 'line_id';
    public $table = 'production_lines';
    protected $fillable = [
        'line_name',
        'starting_date',
        'end_date',
        'product_id'
    ];

    public function product(){
        return $this->belongsTo(Product::class, 'product_id');
    }
    public function dailyProductions(){
        return $this->hasMany(DailyProduction::class, 'line_id');
    }
    public function machines(){
        return $this->hasMany(Machine::class, 'line_id');
    }

}
