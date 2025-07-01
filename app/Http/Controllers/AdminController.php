<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Service;
use App\Models\Job;
use App\Models\Salary;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function dashboard()
    {
        $now = Carbon::now();

        $stats = [
            'total_users' => User::count(),
            'total_services' => Service::count(),
            'total_income_year' => Job::join('services', 'jobs.service_id', '=', 'services.id')
                ->whereYear('jobs.created_at', $now->year)
                ->sum('services.price'),
            'total_income_month' => Job::join('services', 'jobs.service_id', '=', 'services.id')
                ->whereMonth('jobs.created_at', $now->month)
                ->whereYear('jobs.created_at', $now->year) // ensure year match too
                ->sum('services.price'),
            'total_income_week' => Job::join('services', 'jobs.service_id', '=', 'services.id')
                ->whereBetween('jobs.created_at', [$now->copy()->startOfWeek(), $now->copy()->endOfWeek()])
                ->sum('services.price'),
            'total_income_today' => Job::join('services', 'jobs.service_id', '=', 'services.id')
                ->whereDate('jobs.created_at', $now->toDateString())
                ->sum('services.price'),
            'today_jobs' => Job::whereDate('created_at', $now->toDateString())->count(),
            'top_users' => User::where('role', 'Employee')
                ->withSum('salaries', 'base_price')
                ->orderByDesc('salaries_sum_base_price')
                ->take(5)
                ->get(),
        ];


        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}