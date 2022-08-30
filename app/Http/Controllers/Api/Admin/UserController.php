<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{

    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, User $user)
    {
        $update = $request->validate([
            'name' => 'required|string|max:255',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('cover')) {
            $userCover = str_replace("storage/","",$user->cover);
            if (!empty($userCover) && Storage::exists($userCover)) {
                Storage::delete($userCover);
            }
            $update['cover'] = "storage/" . $request->file('cover')->store('cover');
        }

        $user->update($update);
        $response = [
            'name' => $user->name,
            'cover' => $user->cover,
        ];

        return response()->json($response);
    }

    public function destroy($id)
    {
        //
    }
}
