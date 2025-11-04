<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('post', PostController::class);
});

require __DIR__ . '/auth.php';
