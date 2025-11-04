<?php

namespace App\Http\Controllers\WebApp;

use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'API Technical Test - PT IMP 2025']);
    }
}
