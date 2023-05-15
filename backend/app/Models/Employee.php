<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $primaryKey = 'employee_id';
    public $table = 'employees';
    protected $fillable = [
        'name',
        'email',
        'tc_no',
        'phone_number',
        'salary',
        'date_of_start'
    ];

    protected $appends = ['completedJobs'];

    public function getCompletedJobsAttribute()
    {
        $completedJobs = $this->orders()
            ->where('starting_date', '>=', Carbon::now()->subDays(30))
            ->where('end_date', '!=',null)
            ->get();

        return $completedJobs;
    }

    public function admin()
    {
        return $this->hasOne(Admin::class, 'employee_id');
    }
    public function orders()
    {
        return $this->hasMany(Order::class, 'employee_id');
    }
}
