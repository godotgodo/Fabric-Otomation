<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Machine;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //TÜM İŞ EMİRLERİNİ DÖNDÜREN FONKSİYON
    public function index(){
        return Order::with('employee','machine')->get();
    }

    //Belirli bir emri gösterir
    public function show($id){
        $order = Order::with('employee','machine')->find($id);
        if ($order){
            return $order;
        }
        return ['error' => 'Invalid order id.'];
    }

    //Yeni Emir Oluşturur
    public function store(Request $req){
        $formFields = $req->validate([
            'order_description' => 'required',
            'machine_id' => 'required',
            'employee_id' => 'required',
        ]);
        $machine = Machine::find($req->machine_id);
        $employee = Employee::find($req->employee_id);
            if ($machine && $employee){
                $formFields['starting_date'] = Carbon::now();
            }
            else{
                return ['error' => 'There is no such a machine or employee like this.'];
            }
        return Order::create($formFields);
    }

    //Emir bilgisini düzenler
    public function update(Request $req, $id){
        $formFields = $req->all();
        $order = Order::find($id);
        if ($req->machine_id){
            $machine = Machine::find($req->machine_id);
            if (!$machine){
                return ['error' => 'There is no such a machine like this.'];
            }
        }

        if ($req->employee_id){
            $employee = Employee::find($req->employee_id);
            if (!$employee){
                return ['error' => 'There is no such an employee like this.'];
            }
        }

        if ($order){
            $order->update($formFields);
            return $order;
        }

        return ['error' => 'Invalid order id.'];

    }

    //Üretim hattı bilgisini siler
    public function destroy($id){
        $order = Order::find($id);
        if ($order){
            Order::destroy($id);
            return ['message' => 'The order has been successfully deleted.'];
        }
        return ['error' => 'Invalid order id.'];
    }

    public function end($id){
        $order = Order::find($id);
        if ($order){
            if ($order->end_date){
                return ['error' => 'This order has already been finished.'];
            }else{
                $order->end_date = Carbon::now();
                $order->save();
                return ['message' => 'The order has done.'];
            }
        }
        return ['error' => 'There is no such an order like this.'];
    }

}
