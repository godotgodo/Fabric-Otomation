<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Laravel\Sanctum\PersonalAccessToken;

class AdminController extends Controller
{
    public function register(Request $request)
    {
        $formFields = $request->validate([
            'password' => 'required',
            'employee_id' => ['required', Rule::unique('admins','employee_id')]
        ]);

        $formFields['password'] = bcrypt($request->password);

        $employee=Employee::find($request->employee_id);
        if (!$employee) {
            return ['error'=>'There is no such an employee like that'];
        }

        $admin = Admin::create($formFields);

        $token = $admin->createToken('token')->plainTextToken;

        $response = ['admin' => $admin, 'employee'=>$admin->employee, 'token' => $token];

        return response($response, 201);
    }

    public function logout(Request $req)
    {
        $hashed = explode(" ", $req->header('Authorization'))[1];
        $token = PersonalAccessToken::findToken($hashed);
        $admin = Admin::where('admin_id', $token->tokenable_id)->first();
        $admin->tokens()->delete();
        return ['message' => 'Logged out.'];
    }

    public function login(Request $request)
    {
        $formFields = $request->validate([
            'email' => ['required', 'email'],
            'password' => 'required'
        ]);

        $test = Employee::where('email', $request->email)->first()->admin;
        $admin = Admin::find($test->admin_id);

        if(!$admin || !Hash::check($request->password, $admin->password))
        {
            return response(['error' => 'Bad credentials'], 401);
        }

        $token = $admin->createToken('token')->plainTextToken;

        $response = ['admin' => $admin->employee, 'token' => $token];

        return response($response, 201);
    }
}
