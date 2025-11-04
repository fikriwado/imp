<?php

namespace App\Http\Controllers;

use App\Services\PostService;
use App\Http\Requests\PostRequest;

class PostController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function index()
    {
        $data['posts'] = $this->postService->all();
        return setResponse('Successfully Get Data', $data);
    }

    public function store(PostRequest $request)
    {
        try {
            $data = $this->postService->store($request);
            return setResponse('Successfully Create Data', $data, 201);
        } catch (\Exception $e) {
            return setResponse($e->getMessage(), null, 400);
        }
    }

    public function show($id)
    {
        $data = $this->postService->find($id);
        return setResponse('Successfully Get Data', $data);
    }

    public function update(PostRequest $request, $id)
    {
        try {
            $data = $this->postService->update($request, $id);
            return setResponse('Successfully Update Data', $data, 201);
        } catch (\Exception $e) {
            return setResponse($e->getMessage(), null, 400);
        }
    }

    public function destroy($id)
    {
        try {
            $data = $this->postService->destroy($id);
            return setResponse('Successfully Delete Data', $data);
        } catch (\Exception $e) {
            return setResponse($e->getMessage(), null, 400);
        }
    }
}
