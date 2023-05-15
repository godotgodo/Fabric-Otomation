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
        Schema::create('order_of_operations', function (Blueprint $table) {
            $table->id('order_id');
            $table->timestamp('starting_date');
            $table->timestamp('end_date')->nullable();
            $table->string('order_description');
            $table->foreignIdFor(\App\Models\Machine::class, 'machine_id')->constrained('machines','machine_id')->onDelete('cascade');
            $table->foreignIdFor(\App\Models\Machine::class, 'employee_id')->constrained('employees','employee_id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_of_operations');
    }
};
