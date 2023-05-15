<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $primaryKey = 'product_id';
    protected $fillable = [
        'name',
        'description'
    ];

    public function productionLines(){
        return $this->hasMany(ProductionLine::class, 'product_id');
    }
}
