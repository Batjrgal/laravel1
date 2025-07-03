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

        // Get monthly income data for the last 12 months
        $monthlyIncome = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = $now->copy()->subMonths($i);
            $income = Job::join('services', 'jobs.service_id', '=', 'services.id')
                ->whereYear('jobs.created_at', $date->year)
                ->whereMonth('jobs.created_at', $date->month)
                ->sum('services.price');

            $monthlyIncome[] = [
                'month' => $date->format('M'),
                'income' => $income,
                'jobs' => Job::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count()
            ];
        }

        // Get daily income for the last 7 days
        $dailyIncome = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = $now->copy()->subDays($i);
            $income = Job::join('services', 'jobs.service_id', '=', 'services.id')
                ->whereDate('jobs.created_at', $date->toDateString())
                ->sum('services.price');

            $dailyIncome[] = [
                'day' => $date->format('D'),
                'income' => $income,
                'jobs' => Job::whereDate('created_at', $date->toDateString())->count()
            ];
        }

        // Get service statistics
        $serviceStats = DB::table('services as s')
            ->leftJoin('jobs as j', 's.id', '=', 'j.service_id')
            ->select(
                's.id',
                's.service_name',
                DB::raw('COUNT(j.id) as jobs_count'),
                DB::raw('SUM(s.price) as jobs_sum_services_price')
            )
            ->groupBy('s.id', 's.service_name')
            ->orderByDesc('jobs_count')
            ->limit(5)
            ->get()
            ->map(function ($service) {
                return [
                    'name' => $service->service_name,
                    'jobs' => $service->jobs_count,
                    'income' => $service->jobs_sum_services_price ?? 0
                ];
            });

        // Get job status distribution
        $jobStatusDistribution = Salary::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->map(function ($item) {
                return [
                    'status' => $item->status,
                    'count' => $item->count
                ];
            });

        // Calculate basic stats
        $totalIncomeToday = Job::join('services', 'jobs.service_id', '=', 'services.id')
            ->whereDate('jobs.created_at', $now->toDateString())
            ->sum('services.price');

        $todayJobs = Job::whereDate('created_at', $now->toDateString())->count();

        // Calculate percentage changes
        $currentMonthUsers = User::whereYear('created_at', $now->year)
            ->whereMonth('created_at', $now->month)
            ->count();
        $lastMonthUsers = User::whereYear('created_at', $now->copy()->subMonth()->year)
            ->whereMonth('created_at', $now->copy()->subMonth()->month)
            ->count();
        $userGrowthPercent = $lastMonthUsers > 0 ? round((($currentMonthUsers - $lastMonthUsers) / $lastMonthUsers) * 100, 1) : 0;

        $currentMonthServices = Service::whereYear('created_at', $now->year)
            ->whereMonth('created_at', $now->month)
            ->count();
        $lastMonthServices = Service::whereYear('created_at', $now->copy()->subMonth()->year)
            ->whereMonth('created_at', $now->copy()->subMonth()->month)
            ->count();
        $serviceGrowthPercent = $lastMonthServices > 0 ? round((($currentMonthServices - $lastMonthServices) / $lastMonthServices) * 100, 1) : 0;

        $yesterdayJobs = Job::whereDate('created_at', $now->copy()->subDay()->toDateString())->count();
        $jobGrowthPercent = $yesterdayJobs > 0 ? round((($todayJobs - $yesterdayJobs) / $yesterdayJobs) * 100, 1) : 0;

        $yesterdayIncome = Job::join('services', 'jobs.service_id', '=', 'services.id')
            ->whereDate('jobs.created_at', $now->copy()->subDay()->toDateString())
            ->sum('services.price');
        $incomeGrowthPercent = $yesterdayIncome > 0 ? round((($totalIncomeToday - $yesterdayIncome) / $yesterdayIncome) * 100, 1) : 0;

        $stats = [
            'total_users' => User::count(),
            'total_services' => Service::count(),
            'total_income_year' => Job::join('services', 'jobs.service_id', '=', 'services.id')
                ->whereYear('jobs.created_at', $now->year)
                ->sum('services.price'),
            'total_income_month' => Job::join('services', 'jobs.service_id', '=', 'services.id')
                ->whereMonth('jobs.created_at', $now->month)
                ->whereYear('jobs.created_at', $now->year)
                ->sum('services.price'),
            'total_income_week' => Job::join('services', 'jobs.service_id', '=', 'services.id')
                ->whereBetween('jobs.created_at', [$now->copy()->startOfWeek(), $now->copy()->endOfWeek()])
                ->sum('services.price'),
            'total_income_today' => $totalIncomeToday,
            'today_jobs' => $todayJobs,
            'top_users' => User::where('role', 'Employee')
                ->withSum('salaries', 'base_price')
                ->orderByDesc('salaries_sum_base_price')
                ->take(5)
                ->get(),
            'monthly_income' => $monthlyIncome,
            'daily_income' => $dailyIncome,
            'service_stats' => $serviceStats,
            'job_status_distribution' => $jobStatusDistribution,
            'growth_percentages' => [
                'users' => $userGrowthPercent,
                'services' => $serviceGrowthPercent,
                'jobs' => $jobGrowthPercent,
                'income' => $incomeGrowthPercent
            ]
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}