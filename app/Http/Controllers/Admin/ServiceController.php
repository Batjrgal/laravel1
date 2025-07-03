<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $services = Service::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Services/Index', [
            'services' => $services
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // ... your create logic ...
            return redirect()->back()->with('success', 'Үйлчилгээ амжилттай нэмэгдлээ!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Үйлчилгээ нэмэхэд алдаа гарлаа!');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            // ... your update logic ...
            return redirect()->back()->with('success', 'Үйлчилгээ амжилттай шинэчлэгдлээ!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Үйлчилгээ шинэчлэхэд алдаа гарлаа!');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            // ... your delete logic ...
            return redirect()->back()->with('success', 'Үйлчилгээ амжилттай устгагдлаа!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Үйлчилгээ устгахад алдаа гарлаа!');
        }
    }
}
