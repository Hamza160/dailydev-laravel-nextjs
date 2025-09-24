<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::query()->with('user')->latest()->paginate(20);
        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $payload = $request->validated();
        try{
            $user = $request->user();
            $payload['user_id'] = $user->id;
            $post = Post::create($payload);
            return response()->json([
                "message" => "Post created successfully.",
                "post" => $post
            ]);
        }catch (\Throwable $e){
            Log::error("Error Creating Post => " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => "something went wrong",
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
