<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductionLine;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductionLineController extends Controller
{
    //TÜM ÜRETİM HATLARINI DÖNDÜREN FONKSİYON
    public function index(){
        return ProductionLine::with('product','machines')->get();
    }

    //Belirli bir üretim hattını gösterir
    public function show($id){
        $productionLine = ProductionLine::with('product')->find($id);
        if ($productionLine){
            return $productionLine;
        }
        return ['error' => 'Invalid production line id.'];
    }

    //Yeni ProductionLine Oluşturur
    public function store(Request $req){
        $formFields = $req->validate([
            'line_name' => 'required',
        ]);
        $formFields = $req->all();
        if ($req->product_id){
            $product = Product::find($req->product_id);
            if ($product){
              $formFields['starting_date'] = Carbon::now();
            }
            else{
                return ['error' => 'There is no such a product like this.'];
            }
        }
        return ProductionLine::create($formFields);
    }

    //Üretim hattı bilgisini düzenler
    public function update(Request $req, $id){
        $formFields = $req->all();
        $productionLine = ProductionLine::find($id);
        if ($req->product_id){
            $product = Product::find($req->product_id);
            if (!$product){
                return ['error' => 'There is no such a product like this.'];
            }
            else{
                $formFields['end_date'] = null;
                $formFields['starting_date'] = Carbon::now();
            }
        }
        if ($productionLine){
            $productionLine->update($formFields);
            return $productionLine;
        }

        return ['error' => 'Invalid production line id.'];

    }

    //Üretim hattı bilgisini siler
    public function destroy($id){
        $productionLine = ProductionLine::find($id);
        if ($productionLine){
            ProductionLine::destroy($id);
            return ['message' => 'The production line has been successfully deleted.'];
        }
        return ['error' => 'Invalid production line id.'];
    }

    public function end($id){
        $line = ProductionLine::find($id);
        if ($line){
            if ($line->end_date || !$line->starting_date){
                return ['error' => 'The production line isn\'t in use.'];
            }else{
                $line->end_date = Carbon::now();
                $line->save();
                return ['message' => 'The production has stopped.'];
            }
        }
        return ['error' => 'There is no such a production line like this.'];
    }
}
