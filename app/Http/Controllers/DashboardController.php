<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller {
    public function index(Request $request) {
        // Get filter parameters
        $dateFrom = $request->get('date_from');
        $dateTo = $request->get('date_to');
        $status = $request->get('status');
        $priority = $request->get('priority');

        // Base query for filtering
        $complaintsQuery = Complaint::query();

        if ($dateFrom) {
            $complaintsQuery->where('created_at', '>=', $dateFrom);
        }

        if ($dateTo) {
            $complaintsQuery->where('created_at', '<=', $dateTo . ' 23:59:59');
        }

        if ($status) {
            $complaintsQuery->where('status', $status);
        }

        if ($priority) {
            $complaintsQuery->where('priority', $priority);
        }

        // Basic stats with filters
        $stats = [
            'totalComplaints' => (clone $complaintsQuery)->count(),
            'totalUsers' => User::count(),
            'pendingComplaints' => (clone $complaintsQuery)->where('status', 'pending')->count(),
            'resolvedComplaints' => (clone $complaintsQuery)->where('status', 'resolved')->count(),
            'inProgressComplaints' => (clone $complaintsQuery)->where('status', 'in_progress')->count(),
            'rejectedComplaints' => (clone $complaintsQuery)->where('status', 'rejected')->count(),
        ];

        // Get complaints by status for charts (with filters)
        $statusStats = (clone $complaintsQuery)
            ->selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        // Get complaints by priority for charts (with filters)
        $priorityStats = (clone $complaintsQuery)
            ->selectRaw('priority, count(*) as count')
            ->groupBy('priority')
            ->pluck('count', 'priority')
            ->toArray();

        // Get monthly complaint trends for the last 6 months
        $monthsBack = $request->get('months_back', 6);
        $monthlyStats = [];
        for ($i = $monthsBack - 1; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $monthName = $date->format('M Y');

            $monthQuery = (clone $complaintsQuery)
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month);

            $count = $monthQuery->count();
            $resolvedCount = (clone $monthQuery)->where('status', 'resolved')->count();

            $monthlyStats[] = [
                'month' => $monthName,
                'complaints' => $count,
                'resolved' => $resolvedCount,
            ];
        }        // Recent complaints for activity feed
        $recentComplaints = Complaint::with(['evidences'])
            ->select([
                'id',
                'incident_title',
                'incident_description',
                'reporter',
                'reporter_identity_type',
                'status',
                'priority',
                'created_at',
                'updated_at',
            ])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($complaint) {
                return [
                    'id' => $complaint->id,
                    'incident_title' => $complaint->incident_title,
                    'incident_description' => $complaint->incident_description ?
                        (strlen($complaint->incident_description) > 100 ?
                            substr($complaint->incident_description, 0, 100) . '...' :
                            $complaint->incident_description) : 'No description',
                    'reporter' => $complaint->reporter ?: 'Anonymous',
                    'reporter_type' => $complaint->reporter_identity_type,
                    'status' => $complaint->status,
                    'priority' => $complaint->priority,
                    'evidences_count' => $complaint->evidences->count(),
                    'created_at' => $complaint->created_at,
                    'updated_at' => $complaint->updated_at,
                    'days_since_created' => ceil($complaint->created_at->diffInUTCDay(now())),
                    'time_since_created' => $complaint->created_at->diffForHumans(),
                    'time_created' => $complaint->created_at->format('H:i:s'),
                ];
            });

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'statusStats' => $statusStats,
            'priorityStats' => $priorityStats,
            'monthlyStats' => $monthlyStats,
            'recentComplaints' => $recentComplaints,
            'filters' => [
                'date_from' => $dateFrom,
                'date_to' => $dateTo,
                'status' => $status,
                'priority' => $priority,
                'months_back' => $monthsBack,
            ],
            'filterOptions' => [
                'statuses' => ['pending', 'in_progress', 'resolved', 'rejected'],
                'priorities' => ['low', 'medium', 'high'],
            ],
        ]);
    }
}
