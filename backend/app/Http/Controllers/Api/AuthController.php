<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        try {
            if (Auth::attempt($request->only('email', 'password'))) {
                $user = auth()->user();
                $user['token'] = $user->createToken('access_token')->plainTextToken;

                return response()->json([
                    'success' => true,
                    'message' => 'Login successfully successfully',
                    'user' => $user,
                ], 200);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid username or password',
                ], 422);
            }
        } catch (\Exception $e) {
            Log::error("Login Error => " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => "something went wrong",
            ], 500);
        }
    }

    public function register(RegisterUserRequest $request)
    {

        try {
            User::create($request->validated());
            return response()->json([
                'success' => true,
                'message' => 'Account created successfully',
            ], 200);
        } catch (\Exception $e) {
            Log::error("Register Error => " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => "something went wrong",
            ], 500);
        }
    }

    public function checkCredentials(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            if (Auth::attempt($request->only('email', 'password'))) {
                $user = auth()->user();

                return response()->json([
                    'success' => true,
                    'message' => 'Account created successfully',
                    'user' => $user,
                ], 200);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid username or password',
                ], 422);
            }
        } catch (\Exception $e) {
            Log::error("Login Error => " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => "something went wrong",
            ], 500);
        }
    }
}
