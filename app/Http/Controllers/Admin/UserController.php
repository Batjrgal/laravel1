<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
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
            return redirect()->back()->with('success', 'Хэрэглэгч амжилттай нэмэгдлээ!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Хэрэглэгч нэмэхэд алдаа гарлаа!');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
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
            return redirect()->back()->with('success', 'Хэрэглэгч амжилттай шинэчлэгдлээ!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Хэрэглэгч шинэчлэхэд алдаа гарлаа!');
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
            return redirect()->back()->with('success', 'Хэрэглэгч амжилттай устгагдлаа!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Хэрэглэгч устгахад алдаа гарлаа!');
        }
    }
}
