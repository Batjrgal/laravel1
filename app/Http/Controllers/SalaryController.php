<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalaryController extends Controller
{
    public function index()
    {
        $salaries = Salary::with('user')->orderBy('created_at', 'desc')->get();
        $users = User::where('role', 'Employee')->get();

        return Inertia::render('Admin/Salary/Index', [
            'salaries' => $salaries,
            'users' => $users,
        ]);
    }

    public function create()
    {
        $users = User::where('role', 'Employee')->get();

        return Inertia::render('Admin/Salary/Create', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'total_price' => 'required|integer|min:0',
            'base_price' => 'required|integer|min:0',
            'salary_percentage' => 'required|integer|min:0|max:100',
            'status' => 'required|in:Олгосон,Олгоогүй',
            'updated_by' => 'required|string|max:250',
        ]);

        Salary::create($request->all());

        return redirect()->route('admin.salary.index')
            ->with('message', 'Salary record created successfully.');
    }

    public function edit(Salary $salary)
    {
        $users = User::where('role', 'Employee')->get();

        return Inertia::render('Admin/Salary/Edit', [
            'salary' => $salary->load('user'),
            'users' => $users
        ]);
    }

    public function update(Request $request, Salary $salary)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'total_price' => 'required|integer|min:0',
            'base_price' => 'required|integer|min:0',
            'salary_percentage' => 'required|integer|min:0|max:100',
            'status' => 'required|in:Олгосон,Олгоогүй',
            'updated_by' => 'required|string|max:250',
        ]);

        $salary->update($request->all());

        return redirect()->route('admin.salary.index')
            ->with('message', 'Salary record updated successfully.');
    }

    public function destroy(Salary $salary)
    {
        $salary->delete();

        return redirect()->route('admin.salary.index')
            ->with('message', 'Salary record deleted successfully.');
    }

    // Update salary status
    public function updateStatus(Request $request, Salary $salary)
    {
        $request->validate([
            'status' => 'required|in:Олгосон,Олгоогүй',
            'updated_by' => 'required|string|max:250',
        ]);

        $salary->update([
            'status' => $request->status,
            'updated_by' => $request->updated_by,
        ]);

        return redirect()->route('admin.salary.index')
            ->with('message', 'Salary status updated successfully.');
    }

    // Update salary percentage
    public function updatePercentage(Request $request, Salary $salary)
    {
        $request->validate([
            'salary_percentage' => 'required|integer|min:0|max:100',
            'updated_by' => 'required|string|max:250',
        ]);

        $salary->update([
            'salary_percentage' => $request->salary_percentage,
            'updated_by' => $request->updated_by,
        ]);

        return redirect()->route('admin.salary.index')
            ->with('message', 'Salary percentage updated successfully.');
    }

    // User salary list
    public function userSalaries()
    {
        $salaries = Salary::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('User/Salary/Index', [
            'salaries' => $salaries
        ]);
    }

    // Batch update salary status
    public function batchUpdateStatus(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:salary,id',
            'status' => 'required|in:Олгосон,Олгоогүй',
            'updated_by' => 'required|string|max:250',
        ]);

        Salary::whereIn('id', $request->ids)->update([
            'status' => $request->status,
            'updated_by' => $request->updated_by,
        ]);

        return redirect()->route('admin.salary.index')
            ->with('message', 'Selected salary statuses updated successfully.');
    }
}