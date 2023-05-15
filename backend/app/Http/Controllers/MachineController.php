<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use App\Models\ProductionLine;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MachineController extends Controller
{
    //Tüm makineleri listeler
    public function index(){
      return Machine::with('productionLine')->get();
    }

    //Belirli bir makineyi gösterir
    public function show($id){
        $machine = Machine::with('productionLine')->find($id);
        if ($machine){
            return $machine;
        }
        return ['error' => 'Invalid Machine id.'];
    }

    //Yeni makine Oluşturur
    public function store(Request $req){
        $formFields = $req->validate([
            'machine_name' => 'required',
        ]);
        if ($req->line_id){
            $line = ProductionLine::find($req->line_id);
            if (!$line){
                return ['error' => 'There is no such a line like this.'];
            }
            $formFields['line_id'] = $req->line_id;
        }
        return Machine::create($formFields);
    }

    //Makine bilgisini düzenler
    public function update(Request $req, $id){
        $formFields = $req->all();
        $machine = Machine::find($id);
        if ($req->line_id){
            $line = ProductionLine::find($req->line_id);
            if (!$line){
                return ['error' => 'There is no such a line like this.'];
            }
        }

        if ($machine){
            $machine->update($formFields);
            return $machine;
        }

        return ['error' => 'Invalid Machine id.'];

    }

    //Makine bilgisini siler
    public function destroy($id){
        $machine = Machine::find($id);
        if ($machine){
            Machine::destroy($id);
            return ['message' => 'The Machine has been successfully deleted.'];
        }
        return ['error' => 'Invalid Machine id.'];
    }

    //Makinenin bakım bilgisini düzenler.
    public function maintenance($id){
        $machine = Machine::find($id);
        if ($machine){
            $machine->maintenance_date = Carbon::now();
            $machine->save();
            return ['message' => 'Done.'];
        }
        return ['error' => 'Invalid Machine id.'];
    }
}
