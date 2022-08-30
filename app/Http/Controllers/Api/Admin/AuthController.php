<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function auth(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => __('auth.failed'),
            ], 404);
        }
        $token = $user->createToken($request->email)->plainTextToken;

        $response = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'cover' => $user->cover,
            'token' => $token,
        ];

        return response()->json($response);
    }

    public function register(Request $request)
    {
        $create = $request->validate([
            'name' => "required|string|min:3|max:60",
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $create['password'] = Hash::make($create['password']);

        if (!$user = User::create($create)) {
            return response()->setStatusCode(500);
        }

        $token = $user->createToken($request->email)->plainTextToken;

        $response = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'cover' => $user->cover,
            'token' => $token,
        ];

        return response()->json($response)->setStatusCode(Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        dump($request);
        $user = $request->user();


        $user->tokens()->delete();

        return response()->json([], 204);
    }
}
