<?php

namespace App\Services;

use App\Enums\PostStatuses;
use App\Models\Post;
use Illuminate\Support\Str;

class PostService
{
    public function all()
    {
        return Post::fetch(true);
    }

    public function store($request)
    {
        $data = $request->all();
        $data['slug'] = Str::slug($request->title) . '-' . Str::random(5);
        $data['published_at'] = $request->status === PostStatuses::PUBLISHED ? now() : null;

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = uploadFile('post/thumbnail', $request->file('thumbnail'));
        }

        return Post::create($data);
    }

    public function find($id)
    {
        return Post::findOrFail($id);
    }

    public function update($request, $id)
    {
        $post = $this->find($id);
        $data = $request->all();

        if ($request->filled('title') && $request->title !== $post->title) {
            $data['slug'] = Str::slug($request->title) . '-' . Str::random(5);
        }

        if ($request->filled('status')) {
            $data['published_at'] = $request->status === PostStatuses::PUBLISHED ? now() : null;
        }

        if ($request->hasFile('thumbnail')) {
            if ($post->thumbnail) {
                $thumbnailPath = str_replace(url('/'), '', $post->thumbnail);
                $fullPath = public_path($thumbnailPath);
                if (file_exists($fullPath)) unlink($fullPath);
            }

            $data['thumbnail'] = uploadFile('post/thumbnail', $request->file('thumbnail'));
        }

        $post->update($data);

        return $post->fresh();
    }

    public function destroy($id)
    {
        return $this->find($id)->delete();
    }
}
