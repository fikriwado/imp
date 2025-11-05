<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('post', PostController::class);
    Route::get('/user', [UserController::class, 'index']);
});

require __DIR__ . '/auth.php';
