<?php

namespace App\Http\Controllers;

use App\Models\DailyProduction;
use App\Models\ProductionLine;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DailyProductionController extends Controller
{

    //$daily->date = Carbon::now()->toDate()->format('Y-m-d'); DATE FORMATI

    public function index(){
       return DailyProduction::with('productionLine')->get();
    }

    // GÜNLÜK ÜRETİMLERİN AYLIK YILLIK HAFTALIK VE SON BİR GÜNLÜK VERİLERİNİ GERİ DÖNDÜRÜR.
    public function report(Request $req){
        $formFields = $req->validate([
            'line_id' => ['required','numeric'],
            'option' => ['required', 'numeric']
        ]);
        $line = ProductionLine::find($req->line_id);
        if ($line){
            //OPTION 1 SON BİR GÜNÜ OPTION 2 SON BİR HAFTAYI OPTION 3 SON BİR AYI OPTION 4 SON BİR YILI TEMSİL EDER.
            $today = Carbon::now()->toDate()->format('Y-m-d');
            if ($req->option == 1){

                $result = DailyProduction::where('line_id', '=', $line->line_id)
                    ->where('date', '=', $today)->get();
                return $result;

            }else if($req->option == 2){

                $target = Carbon::now()->addDays(-7)->toDate()->format('Y-m-d');
                $result = DailyProduction::where('line_id', '=', $line->line_id)
                                         ->where('date', '<=', $today)
                                         ->where('date', '>', $target)->get();
                return $result;

            }else if($req->option == 3){

                $target = Carbon::now()->addDays(-30)->toDate()->format('Y-m-d');
                $result = DailyProduction::where('line_id', '=', $line->line_id)
                    ->where('date', '<=', $today)
                    ->where('date', '>', $target)->get();
                return $result;

            }else if($req->option == 4){

                $target = Carbon::now()->addDays(-365)->toDate()->format('Y-m-d');
                $result = DailyProduction::where('line_id', '=', $line->line_id)
                    ->where('date', '<=', $today)
                    ->where('date', '>', $target)->get();
                return $result;

            }else{
                return ['error'=>'Please enter a valid option.'];
            }
        }
        return ['error'=>'There is no such a line like this.'];
    }

    public function store(Request $req){
        $formFields = $req->validate([
            'line_id' => 'required',
            'total_production' => 'required'
        ]);
        $formFields = $req->all();
        $productionLine = ProductionLine::find($req->line_id);
        if ($productionLine){
            $formFields['date'] = Carbon::now()->toDate()->format('Y-m-d');
            return DailyProduction::create($formFields);
        }

            return ['error' => 'There is no such a product like this.'];
    }
}
