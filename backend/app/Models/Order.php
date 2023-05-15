<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $primaryKey = 'order_id';
    public $table = 'order_of_operations';
    protected $fillable = [
        'machine_id',
        'employee_id',
        'starting_date',
        'end_date',
        'order_description'
    ];

    public function employee(){
        return $this->belongsTo(Employee::class,'employee_id');
    }

    public function machine(){
        return $this->belongsTo(Machine::class,'machine_id');
    }
}
