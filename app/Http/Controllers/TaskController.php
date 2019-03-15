<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
    public function store(Request $request){
		$validatedData = $request->validate(['title' => 'required']);
		$task = Task::create([
			'title' => $validatedData['title'],
			'project_id' => $request->project_id,
        ]);

		return $task->toJson();
	}

	public function markAsCompleted(Task $task)
      {
        $task->is_completed = true;
        $task->update();

        return response()->json('Task updated!');
      }
}
