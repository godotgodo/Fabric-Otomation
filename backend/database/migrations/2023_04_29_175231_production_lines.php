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
        Schema::create('production_lines', function (Blueprint $table) {
            $table->id('line_id');
            $table->string('line_name');
            $table->timestamp('starting_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->foreignIdFor(\App\Models\Product::class, 'product_id')->nullable()->constrained('products','product_id')->onDelete('set null');
        });
    }
    // ALTER TABLE tablo_adı
    //ADD FOREIGN KEY (dış_anahtar_kolonu) REFERENCES diğer_tablo(adı)
    //ON DELETE SET NULL;

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('production_lines');
    }
};
