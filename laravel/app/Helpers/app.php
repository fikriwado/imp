<?php

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


function setResponse($message, $data = [], $code = 200)
{
    return response()->json([
        'message' => $message,
        'result' => $data
    ], $code);
}

function enum(string $class, string|array $options = [])
{
    $enum = str_replace('/', '\\', '/App/Enums/' . $class);
    $cases = $enum::cases();


    if (is_string($options) && $options !== '') {
        $items = array_map(fn($item) => $item->value, $cases);

        return implode($options, $items);
    }

    $items = array_map(fn($item) => $item->value, $enum::cases());
    if (is_array($options) && ($options['withLabel'] ?? false)) {
        return collect($cases)->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->label(),
        ])->toArray();
    }

    return $items;
}

function uploadFile($path, $file)
{
    $timestamp = now()->format('Ymd_His');
    $extension = $file->getClientOriginalExtension();
    $fileName = $timestamp . '_' . Str::random(8) . '.' . $extension;
    $storedPath = $file->storeAs($path, $fileName, 'public');
    return Storage::disk('public')->url($storedPath);
}
