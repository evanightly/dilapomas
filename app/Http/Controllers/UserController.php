<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Support\Interfaces\Services\UserServiceInterface;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller implements HasMiddleware {
    public function __construct(
        protected UserServiceInterface $userService
    ) {}

    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array {
        return [
            function (Request $request, Closure $next) {
                if (Auth::user()->role !== User::ROLE_SUPER_ADMIN) {
                    abort(403, 'Unauthorized action.');
                }

                return $next($request);
            },
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $users = $this->userService->getAllPaginated($request->query());
        $data = UserResource::collection($users);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('user/index', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        $roles = User::getRoles();

        if ($this->ajax()) {
            return compact('roles');
        }

        return inertia('user/create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request) {
        $user = $this->userService->create($request->validated());
        $data = UserResource::make($user);

        if ($this->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'User created successfully.',
                'data' => $data,
            ], 201);
        }

        return redirect()->route('users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $nip) {
        $user = $this->userService->findByNip($nip);

        if (!$user) {
            abort(404, 'User not found');
        }

        $data = UserResource::make($user);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('user/show', compact('data'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $nip) {
        $user = $this->userService->findByNip($nip);

        if (!$user) {
            abort(404, 'User not found');
        }

        $data = UserResource::make($user);
        $roles = User::getRoles();

        if ($this->ajax()) {
            return compact('data', 'roles');
        }

        return inertia('user/edit', compact('data', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $nip) {
        $user = $this->userService->update($nip, $request->validated());
        $data = UserResource::make($user);

        if ($this->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'User updated successfully.',
                'data' => $data,
            ]);
        }

        return redirect()->route('users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $nip) {
        $this->userService->delete($nip);

        if ($this->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully.',
            ]);
        }

        return redirect()->route('users.index')
            ->with('success', 'User deleted successfully.');
    }
}
