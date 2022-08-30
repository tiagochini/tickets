<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Summon;
use Illuminate\Http\Request;

class SummonController extends Controller
{
    public function index(Request $request)
    {
        $ticket = new Summon;
        if ($request->has('status')) {
            if ($request->get('status') != 'all' && $request->get('status') !== "") {
                $ticket = $ticket->whereStatus($request->get('status'));
            }
        }
        if ($request->has('offset')) {
            $ticket = $ticket->offset($request->offset);
        }
        if ($request->has('limit')) {
            $ticket = $ticket->limit($request->limit);
        } else {
            $ticket = $ticket->limit(10);
        }


        return response()->json($ticket->get());
    }

    public function show(Summon $ticket)
    {
        return response()->json($ticket);
    }

    public function store(Request $request)
    {
        $create = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'customer_name' => 'required|string|min:3',
            'subject' => 'required',
            'status' => 'required',
            'description' => 'nullable|string|max:1000',
        ]);

        $ticket = Summon::create($create);
        return response()->json($ticket, 201);
    }


    public function update(Request $request, Summon $ticket)
    {
        $update = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'customer_name' => 'required|string|min:3',
            'subject' => 'required',
            'status' => 'required',
            'description' => 'nullable|string|max:1000',
        ]);
        $ticket->update($update);
        return response()->json($ticket);
    }

    public function destroy(Summon $ticket)
    {
        $ticket->delete();
        return response()->json(null, 204);
    }
}
