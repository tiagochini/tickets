<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Customer::all());
    }


    public function store(Request $request)
    {
        $create = $request->validate([
            'name' => 'required|string|max:255',
            'fantasy_name' => 'required|string|max:255',
            'cnpj' => 'nullable',
            'phone' => 'nullable',
            'zipcode' => 'nullable',
            'street' => 'nullable',
            'number' => 'nullable',
            'complement' => 'nullable',
            'neighborhood' => 'nullable',
            'city' => 'nullable',
            'state' => 'nullable',
        ]);

        $customer = Customer::create($create);

        return response()->json($customer, 201);
    }

    public function show(Customer $customer)
    {
        return response()->json($customer);
    }

    public function update(Request $request,Customer $customer)
    {
        $update = $request->validate([
            'name' => 'required|string|max:255',
            'fantasy_name' => 'required|string|max:255',
            'cnpj' => 'nullable',
            'phone' => 'nullable',
            'zipcode' => 'nullable',
            'street' => 'nullable',
            'number' => 'nullable',
            'complement' => 'nullable',
            'neighborhood' => 'nullable',
            'city' => 'nullable',
            'state' => 'nullable',
        ]);
        $customer->update($update);
        $customer->refresh();
        return response()->json($customer, 200);
    }


    public function destroy(Customer $customer)
    {
        $customer->delete();
        return response()->noContent();
    }
}
