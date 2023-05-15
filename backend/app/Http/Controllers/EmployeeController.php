<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EmployeeController extends Controller
{
    //Tüm çalışanları listeler
    public function index(){
        return Employee::all();
    }

    //Belirli bir çalışanı gösterir
    public function show($id){
        $employee = Employee::find($id);
        if ($employee){
            return $employee;
        }
        return ['error' => 'Invalid employee id.'];
    }

    //Yeni Employee Oluşturur
    public function store(Request $req){
        $formFields = $req->validate([
            'name' => 'required',
            'email' => ['required','email',Rule::unique('employees','email')],
            'tc_no' => ['required', Rule::unique('employees','tc_no')],
            'phone_number' => ['required', Rule::unique('employees','phone_number')],
            'salary' => 'required',
            'date_of_start' => 'required'
        ]);
        return Employee::create($formFields);
    }


    public function update(Request $req, $id){
        $formFields = $req->validate([
            'email' => ['email',Rule::unique('employees','email')->ignore($id,'employee_id')],
            'tc_no' => [Rule::unique('employees','tc_no')->ignore($id,'employee_id')],
            'phone_number' => [Rule::unique('employees','phone_number')->ignore($id,'employee_id')],
        ]);
        $employee = Employee::find($id);
        if ($employee){
            $employee->update($req->all());
            return $employee;
        }

        return ['error' => 'Invalid employee id.'];

    }

    public function destroy($id){
        $employee = Employee::find($id);
        if ($employee){
            Employee::destroy($id);
            return ['message' => 'The employee has been successfully deleted.'];
        }
        return ['error' => 'Invalid employee id.'];
    }
}
