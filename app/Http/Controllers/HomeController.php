<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $services = Service::all()->groupBy('service_name');

        return Inertia::render('Home', [
            'services' => $services
        ]);
    }
}