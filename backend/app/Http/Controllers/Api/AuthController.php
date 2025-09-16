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
    public function login(RegisterUserRequest $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        try {
            if (Auth::attempt($request->validated())) {
                $user = auth()->user();
                $user->createToken('access_token')->plainTextToken;

                return response()->json([
                    'success' => true,
                    'message' => 'Account created successfully',
                    'user' => $user,
                ]);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid username or password',
                ]);
            }
        } catch (\Exception $e) {
            Log::error("Login Error => " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => "something went wrong",
            ]);
        }
    }

    public function register(RegisterUserRequest $request)
    {

        try {
            User::create($request->validated());
            return response()->json([
                'success' => true,
                'message' => 'Account created successfully',
            ]);
        } catch (\Exception $e) {
            Log::error("Register Error => " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => "something went wrong",
            ]);
        }
    }
}
