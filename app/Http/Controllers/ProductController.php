<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::with('category')->get();
        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function getCategories()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
      if($request->file('image')) {
          $nameOriginal = $request->file('image')->getClientOriginalName();
          $filename = date("dmY-his") . $nameOriginal;
          Storage::put('public/files/' . $filename, file_get_contents($request->file('image')));
          $request['path'] = 'public/files/' . $filename;
      }
        Product::create($request->except('image'));
        return response()->json([
            'status' => true,
            'messege' => 'Record has been saved successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $product = Product::where('id', $id)->with('category')->first();
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, $id)
    {
        if($request->file('image')) {
            $nameOriginal = $request->file('image')->getClientOriginalName();
            $filename = date("dmY-his") . $nameOriginal;
            Storage::put('public/files/' . $filename, file_get_contents($request->file('image')));
            $request['path'] = 'public/files/' . $filename;
        }

        Product::where('id', $id)->update($request->except('image'));
        return response()->json([
            'status' => true,
            'messege' => 'Record has been updated successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Product::destroy($id);
        return response()->json('Record has been deleted successfully!');
    }
}
