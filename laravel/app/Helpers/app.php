<?php

use Illuminate\Support\Facades\Schema;

function dataFrom($request, $model, $withData = [])
{
    $columns = Schema::getColumnListing((new $model)->getTable());

    return collect($request->all())->only($columns)->merge($withData)->toArray();
}

function setResponse($message, $data = [], $code = 200)
{
    return response()->json(
        [
            'message' => $message,
            'result' => $data
        ],
        $code
    );
}
