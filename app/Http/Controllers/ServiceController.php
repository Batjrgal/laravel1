<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Services/Index', [
            'services' => $services
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Services/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_name' => 'required|string|max:100',
            'car_type' => 'required|string|max:50',
            'price' => 'required|integer|min:0',
        ]);

        Service::create($request->all());

        return redirect()->route('admin.services.index')
            ->with('message', 'Service created successfully.');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Admin/Services/Edit', [
            'service' => $service
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $request->validate([
            'service_name' => 'required|string|max:100',
            'car_type' => 'required|string|max:50',
            'price' => 'required|integer|min:0',
        ]);

        $service->update($request->all());

        return redirect()->route('admin.services.index')
            ->with('message', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('message', 'Service deleted successfully.');
    }
}