<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebApp\HomeController;

Route::get('/', [HomeController::class, 'index']);
