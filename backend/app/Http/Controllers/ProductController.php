<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //Tüm productları listeler
    public function index(){
        return Product::all();
    }

    //Belirli bir ürünü gösterir
    public function show($id){
        $product = Product::find($id);
        if ($product){
            return $product;
        }
        return ['error' => 'Invalid product id.'];
    }

    //Yeni Product Oluşturur
    public function store(Request $req){
        $formFields = $req->validate([
            'name' => 'required',
            'description' => 'required'
        ]);
        return Product::create($formFields);
    }

    //Ürün bilgisini düzenler
    public function update(Request $req, $id){
        $formFields = $req->all();
        $product = Product::find($id);
        if ($product){
            $product->update($formFields);
            return $product;
        }

        return ['error' => 'Invalid product id.'];

    }

    //Ürün bilgisini siler
    public function destroy($id){
        $product = Product::find($id);
        if ($product){
            $productionlines = $product->productionlines;
            foreach ($productionlines as $line) {
                if ($line->starting_date){
                    $line->end_date = Carbon::now();
                    $line->save();
                }
            }
            Product::destroy($id);
            return ['message' => 'The product has been successfully deleted.'];
        }
        return ['error' => 'Invalid product id.'];
    }
}
