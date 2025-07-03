<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        try {
            // ... your create logic ...
            return redirect()->back()->with('success', 'Цалин амжилттай нэмэгдлээ!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Цалин нэмэхэд алдаа гарлаа!');
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        try {
            // ... your update logic ...
            return redirect()->back()->with('success', 'Цалин амжилттай шинэчлэгдлээ!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Цалин шинэчлэхэд алдаа гарлаа!');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        try {
            // ... your delete logic ...
            return redirect()->back()->with('success', 'Цалин амжилттай устгагдлаа!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Цалин устгахад алдаа гарлаа!');
        }
    }
}
