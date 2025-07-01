<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Salary;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class UserController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();
        $now = Carbon::now();

        $stats = [
            'my_salary_year' => Salary::where('user_id', $user->id)
                ->whereYear('created_at', $now->year)
                ->sum('base_price'),

            'my_salary_month' => Salary::where('user_id', $user->id)
                ->whereYear('created_at', $now->year) // нэмэх нь зүйтэй
                ->whereMonth('created_at', $now->month)
                ->sum('base_price'),

            'my_salary_week' => Salary::where('user_id', $user->id)
                ->whereBetween('created_at', [
                    $now->copy()->startOfWeek(),
                    $now->copy()->endOfWeek()
                ])
                ->sum('base_price'),

            'my_salary_today' => Salary::where('user_id', $user->id)
                ->whereDate('created_at', $now->toDateString())
                ->sum('base_price'),

            'today_my_jobs' => Job::where('user_id', $user->id)
                ->whereDate('created_at', $now->toDateString())
                ->count(),

            'top_users' => User::where('role', 'Employee')
                ->withSum('salaries', 'base_price')
                ->orderByDesc('salaries_sum_base_price')
                ->take(5)
                ->get()
        ];


        return Inertia::render('User/Dashboard', [
            'stats' => $stats
        ]);
    }
}