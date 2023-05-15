<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyProduction extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $primaryKey = 'daily_id';
    public $table = 'daily_production';
    protected $fillable = [
        'date',
        'total_production',
        'line_id'
    ];

    public function productionLine(){
        return $this->belongsTo(ProductionLine::class, 'line_id');
    }
}
