<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Service;
use App\Models\User;
use App\Models\Salary;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    public function index()
    {
        $jobs = Job::with(['service', 'user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Jobs/Index', [
            'jobs' => $jobs
        ]);
    }

    public function create()
    {
        $services = Service::all();
        $users = User::where('role', 'Employee')->get();

        return Inertia::render('Admin/Jobs/Create', [
            'services' => $services,
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'user_id' => 'required|exists:users,id',
            'vehicle_number' => 'nullable|string|max:20',
            'payment' => 'required|in:Бэлэн,Данс,Карт',
        ]);

        $job = Job::create($request->all());

        // Fetch service price
        $service = Service::find($request->service_id);
        $total_price = $service->price;

        // Fetch global salary percentage
        $setting = Setting::where('key', 'salary_percentage')->first();
        $salary_percentage = $setting ? (int) $setting->value : 50;
        $base_price = intval($total_price * $salary_percentage / 100);

        // Check if salary record exists for today
        $today = now()->toDateString();
        $salary = Salary::where('user_id', $request->user_id)
            ->whereDate('created_at', $today)
            ->first();

        if ($salary) {
            // Update existing salary record for today
            $salary->total_price += $total_price;
            $salary->base_price += $base_price;
            $salary->salary_percentage = $salary_percentage; // update to latest percentage
            $salary->updated_by = auth()->user()->name ?? 'system';
            $salary->save();
        } else {
            // Create new salary record for today
            Salary::create([
                'user_id' => $request->user_id,
                'total_price' => $total_price,
                'base_price' => $base_price,
                'salary_percentage' => $salary_percentage,
                'status' => 'Олгоогүй',
                'updated_by' => auth()->user()->name ?? 'system',
            ]);
        }

        return redirect()->route('admin.jobs.index')
            ->with('message', 'Job created successfully.');
    }

    public function edit(Job $job)
    {
        $services = Service::all();
        $users = User::where('role', 'Employee')->get();

        return Inertia::render('Admin/Jobs/Edit', [
            'job' => $job->load(['service', 'user']),
            'services' => $services,
            'users' => $users
        ]);
    }

    public function update(Request $request, Job $job)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'user_id' => 'required|exists:users,id',
            'vehicle_number' => 'nullable|string|max:20',
            'payment' => 'required|in:Бэлэн,Данс,Карт',
        ]);

        $job->update($request->all());

        return redirect()->route('admin.jobs.index')
            ->with('message', 'Job updated successfully.');
    }

    public function destroy(Job $job)
    {
        $job->delete();

        return redirect()->route('admin.jobs.index')
            ->with('message', 'Job deleted successfully.');
    }

    // User job list
    public function userJobs()
    {
        $jobs = Job::with(['service'])
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('User/Jobs/Index', [
            'jobs' => $jobs
        ]);
    }
}