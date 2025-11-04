<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(6);
        $userId = User::inRandomOrder()->value('id') ?? User::factory()->create()->id;
        $status = $this->faker->randomElement(['draft', 'published', 'archived']);

        return [
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'content' => $this->faker->paragraphs(5, true),
            'thumbnail' => 'https://fakeimg.movexa.id/640x480',
            'status' => $status,
            'published_at' => $status === 'published' ? $this->faker->dateTimeBetween('-1 years', 'now') : null,
            'user_id' => $userId,
        ];
    }
}
