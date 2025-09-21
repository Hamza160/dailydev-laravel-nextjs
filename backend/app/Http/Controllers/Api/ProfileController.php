<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    public function updateImage(Request $request)
    {
        $request->validate([
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        try{

            $filename = $request->file('profile_image')->store('ProfileImages');
            $request->user()->update([
                'profile_image' => $filename
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Profile Updated Successfully',
                'profile_image' => $filename
            ]);

        }catch (\Exception $e){
            Log::error("Profile Image error => " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => "something went wrong. please try again later.",
            ], 500);
        }
    }
}
