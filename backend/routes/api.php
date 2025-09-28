<?php

use App\Events\TestEvent;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProfileController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/check-credentials', [AuthController::class, 'checkCredentials']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/update/profile', [ProfileController::class, 'updateImage']);
    Route::apiResource('/post', PostController::class);
});

Route::post("/test/channel", function (Request $request) {
    $post = Post::with('user')->first();

    TestEvent::dispatch($post);

    return response()->json(['message' => 'Data Send to Client']);
});


Broadcast::routes(["middleware" => ["auth:sanctum"]]);
