<?php

namespace Database\Factories;

use App\Models\DailyProduction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DailyProduction>
 */
class DailyProductionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = DailyProduction::class;

    public function definition()
    {
        return [
            'line_id' => 5,
            'total_production'=>$this->faker->numberBetween(1,500),
            'date'=>$this->faker->unique()->dateBetween('-1 year','now')
        ];
    }


}
