<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserManagementController extends Controller
{
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'full_name' => 'nullable|string|max:100',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|integer',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:Admin, Employee',
            'status' => 'required|in:Идэвхтэй,Идэвхгүй',
        ]);

        User::create([
            'name' => $request->name,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'status' => $request->status,
        ]);

        return redirect()->route('admin.users.index')
            ->with('message', 'User created successfully.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'full_name' => 'nullable|string|max:100',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|integer',
            'role' => 'required|in:Admin,Employee',
            'status' => 'required|in:Идэвхтэй,Идэвхгүй',
        ]);

        $user->update($request->except(['password']));

        if ($request->filled('password')) {
            $request->validate([
                'password' => 'required|string|min:8|confirmed',
            ]);
            $user->update(['password' => Hash::make($request->password)]);
        }

        return redirect()->route('admin.users.index')
            ->with('message', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('message', 'User deleted successfully.');
    }
}