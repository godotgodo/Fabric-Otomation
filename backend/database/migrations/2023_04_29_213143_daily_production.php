<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daily_production', function (Blueprint $table) {
            $table->id('daily_id');
            $table->date('date');
            $table->integer('total_production');
            $table->foreignIdFor(\App\Models\ProductionLine::class, 'line_id')->constrained('production_lines','line_id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('daily_production');
    }
};
