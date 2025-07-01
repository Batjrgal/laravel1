<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\SalaryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin routes
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

    // Services CRUD
    Route::resource('services', ServiceController::class);

    // Jobs CRUD
    Route::resource('jobs', JobController::class);

    // Users CRUD
    Route::resource('users', UserManagementController::class);

    // Salary CRUD
    Route::resource('salary', SalaryController::class);
    Route::patch('/salary/{salary}/status', [SalaryController::class, 'updateStatus'])->name('salary.updateStatus');
    Route::patch('/salary/{salary}/percentage', [SalaryController::class, 'updatePercentage'])->name('salary.updatePercentage');
    Route::post('/salary/batch-update-status', [SalaryController::class, 'batchUpdateStatus'])->name('salary.batchUpdateStatus');

    // Settings: Salary Percentage
    Route::get('/settings/salary-percentage', [\App\Http\Controllers\Admin\SettingController::class, 'getSalaryPercentage'])->name('settings.salaryPercentage.get');
    Route::post('/settings/salary-percentage', [\App\Http\Controllers\Admin\SettingController::class, 'updateSalaryPercentage'])->name('settings.salaryPercentage.update');
});

// User routes
Route::middleware(['auth', 'verified'])->prefix('user')->name('user.')->group(function () {
    Route::get('/dashboard', [UserController::class, 'dashboard'])->name('dashboard');
    Route::get('/jobs', [JobController::class, 'userJobs'])->name('jobs.index');
    Route::get('/salary', [SalaryController::class, 'userSalaries'])->name('salary.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
