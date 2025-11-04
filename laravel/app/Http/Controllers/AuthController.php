<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        try {
            $login = $this->authService->login($request);
            return setResponse('Login successfully', $login, 200);
        } catch (\App\Exceptions\HttpException $e) {
            return setResponse($e->getMessage(), null, $e->getStatus());
        } catch (\Exception $e) {
            return setResponse($e->getMessage(), null, 500);
        }
    }

    public function register(RegisterRequest $request)
    {
        try {
            $register = $this->authService->register($request);
            return setResponse('Registered successfully', $register, 200);
        } catch (\Exception $e) {
            return setResponse($e->getMessage(), null, 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $this->authService->logout($request);
            return setResponse('Logged out successfully', [], 200);
        } catch (\Exception $e) {
            return setResponse($e->getMessage(), null, 500);
        }
    }
}
