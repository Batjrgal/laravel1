<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    // Get the global salary percentage
    public function getSalaryPercentage()
    {
        $setting = Setting::where('key', 'salary_percentage')->first();
        return response()->json(['salary_percentage' => $setting ? (int) $setting->value : 50]);
    }

    // Update the global salary percentage
    public function updateSalaryPercentage(Request $request)
    {
        $request->validate([
            'salary_percentage' => 'required|integer|min:0|max:100',
        ]);
        $setting = Setting::updateOrCreate(
            ['key' => 'salary_percentage'],
            ['value' => $request->salary_percentage]
        );
        return response()->json(['message' => 'Salary percentage updated successfully.', 'salary_percentage' => (int) $setting->value]);
    }
}
