<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DailyProductionController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductionLineController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::group(['middleware' => ['auth:sanctum']], function(){

    // ÜRÜN ROUTELARI
    Route::get('/products',[ProductController::class, 'index']);
    Route::get('/products/{id}',[ProductController::class, 'show']);
    Route::post('/products/store',[ProductController::class, 'store']);
    Route::put('/products/{id}/update',[ProductController::class, 'update']);
    Route::delete('/products/{id}',[ProductController::class, 'destroy']);

//ÜRETİM HATTI ROUTERLARI
    Route::get('/productionlines',[ProductionLineController::class, 'index']);
    Route::get('/productionlines/{id}',[ProductionLineController::class, 'show']);
    Route::post('/productionlines/store',[ProductionLineController::class, 'store']);
    Route::put('/productionlines/{id}/update',[ProductionLineController::class, 'update']);
    Route::delete('/productionlines/{id}',[ProductionLineController::class, 'destroy']);
    Route::put('/productionlines/{id}/end',[ProductionLineController::class, 'end']);

//GÜNLÜK ÜRETİM ROUTERLARI
    Route::get('/dailyproductions',[DailyProductionController::class, 'index']);
    Route::post('/dailyproductions/report',[DailyProductionController::class, 'report']);
    Route::post('/dailyproductions/store',[DailyProductionController::class, 'store']);

//MAKİNE ROUTERLARI
    Route::get('/machines',[MachineController::class, 'index']);
    Route::get('/machines/{id}',[MachineController::class, 'show']);
    Route::post('/machines/store',[MachineController::class, 'store']);
    Route::put('/machines/{id}/update',[MachineController::class, 'update']);
    Route::delete('/machines/{id}',[MachineController::class, 'destroy']);
    Route::put('/machines/{id}/maintenance',[MachineController::class, 'maintenance']);

//ÇALIŞAN ROUTERLARI
    Route::get('/employees',[EmployeeController::class, 'index']);
    Route::get('/employees/{id}',[EmployeeController::class, 'show']);
    Route::post('/employees/store',[EmployeeController::class, 'store']);
    Route::put('/employees/{id}/update',[EmployeeController::class, 'update']);
    Route::delete('/employees/{id}',[EmployeeController::class, 'destroy']);

//ORDER ROUTERLARI
    Route::get('/orders',[OrderController::class, 'index']);
    Route::get('/orders/{id}',[OrderController::class, 'show']);
    Route::post('/orders/store',[OrderController::class, 'store']);
    Route::put('/orders/{id}/update',[OrderController::class, 'update']);
    Route::delete('/orders/{id}',[OrderController::class, 'destroy']);
    Route::put('/orders/{id}/end',[OrderController::class, 'end']);

    //ADMİN ROUTERLARI
    Route::post('/admins/logout', [AdminController::class, 'logout']);
});

//ADMIN ROUTERLARI
Route::post('/admins/register', [AdminController::class, 'register']);
Route::post('/admins/login', [AdminController::class, 'login']);

