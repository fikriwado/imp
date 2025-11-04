<?php

namespace App\Services;

use App\Models\User;
use App\Exceptions\HttpException;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function login($request)
    {
        $authenticate = Auth::attempt($request->only('email', 'password'));

        if (!$authenticate) {
            throw new HttpException('Invalid credentials', 401);
        }

        $user = Auth::user();

        return $user->createToken('auth_token')->plainTextToken;
    }

    public function register($request)
    {
        return User::create(array_merge($request->all(), ['password' => bcrypt($request->password)]));
    }

    public function logout($request)
    {
        $request->user()->currentAccessToken()->delete();
    }
}
