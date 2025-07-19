<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complaint Report - {{ $complaint->id }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            font-size: 14px;
            padding: 30px;
            margin: 0;
        }
        
        .container {
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .header h1 {
            color: #1e40af;
            font-size: 28px;
            margin-bottom: 5px;
        }
        
        .header h2 {
            color: #6b7280;
            font-size: 18px;
            font-weight: normal;
        }
        
        .meta-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            background-color: #f8fafc;
            padding: 15px;
            border-radius: 8px;
        }
        
        .meta-left, .meta-right {
            width: 48%;
        }
        
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .status-pending {
            background-color: #fef3c7;
            color: #92400e;
        }
        
        .status-in_progress {
            background-color: #dbeafe;
            color: #1e40af;
        }
        
        .status-resolved {
            background-color: #d1fae5;
            color: #065f46;
        }
        
        .status-rejected {
            background-color: #fee2e2;
            color: #991b1b;
        }
        
        .priority-low {
            background-color: #d1fae5;
            color: #065f46;
        }
        
        .priority-medium {
            background-color: #fef3c7;
            color: #92400e;
        }
        
        .priority-high {
            background-color: #fee2e2;
            color: #991b1b;
        }
        
        .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #1e40af;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        
        .info-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .info-item {
            flex: 1;
            min-width: 200px;
        }
        
        .info-label {
            font-weight: bold;
            color: #374151;
            margin-bottom: 3px;
        }
        
        .info-value {
            color: #6b7280;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 5px;
        }
        
        .description-box {
            background-color: #f9fafb;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #2563eb;
            margin-top: 10px;
        }
        
        .evidence-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        
        .evidence-table th,
        .evidence-table td {
            border: 1px solid #e5e7eb;
            padding: 8px 12px;
            text-align: left;
        }
        
        .evidence-table th {
            background-color: #f3f4f6;
            font-weight: bold;
            color: #374151;
        }
        
        .evidence-table tr:nth-child(even) {
            background-color: #f9fafb;
        }
        
        .statistics {
            background-color: #eff6ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
        }
        
        .stats-grid {
            display: flex;
            justify-content: space-around;
            text-align: center;
        }
        
        .stat-item {
            flex: 1;
        }
        
        .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #1e40af;
        }
        
        .stat-label {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
        }
        
        .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
        }
        
        .page-break {
            page-break-before: always;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>RRI COMPLAINT REPORT</h1>
            <h2>Radio Republik Indonesia - Complaint Management System</h2>
        </div>

    <!-- Meta Information -->
    <div class="meta-info">
        <div class="meta-left">
            <div class="info-item">
                <div class="info-label">Complaint ID</div>
                <div class="info-value">#{{ $complaint->id }}</div>
            </div>
            <div class="info-item" style="margin-top: 15px;">
                <div class="info-label">Report Generated</div>
                <div class="info-value">{{ now()->format('F j, Y - g:i A') }}</div>
            </div>
        </div>
        <div class="meta-right">
            <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">
                    <span class="status-badge status-{{ $complaint->status }}">
                        {{ ucwords(str_replace('_', ' ', $complaint->status)) }}
                    </span>
                </div>
            </div>
            <div class="info-item" style="margin-top: 15px;">
                <div class="info-label">Priority</div>
                <div class="info-value">
                    <span class="status-badge priority-{{ $complaint->priority }}">
                        {{ ucwords($complaint->priority) }}
                    </span>
                </div>
            </div>
        </div>
    </div>

    <!-- Incident Information -->
    <div class="section">
        <div class="section-title">Incident Information</div>
        
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Incident Title</div>
                <div class="info-value">{{ $complaint->incident_title ?: 'Not specified' }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Incident Date/Time</div>
                <div class="info-value">
                    {{ $complaint->incident_time ? $complaint->incident_time->format('F j, Y - g:i A') : 'Not specified' }}
                </div>
            </div>
        </div>

        @if($complaint->incident_description)
        <div style="margin-top: 20px;">
            <div class="info-label">Incident Description</div>
            <div class="description-box">
                {{ $complaint->incident_description }}
            </div>
        </div>
        @endif
    </div>

    <!-- Reporter Information -->
    <div class="section">
        <div class="section-title">Reporter Information</div>
        
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Reporter Name</div>
                <div class="info-value">{{ $complaint->reporter ?: 'Anonymous' }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Identity Type</div>
                <div class="info-value">{{ $complaint->reporter_identity_type ?: 'Not specified' }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Identity Number</div>
                <div class="info-value">{{ $complaint->reporter_identity_number ?: 'Not provided' }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Reported Person</div>
                <div class="info-value">{{ $complaint->reported_person ?: 'Not specified' }}</div>
            </div>
        </div>
    </div>

    <!-- Evidence Files -->
    @if($complaint->evidences && $complaint->evidences->count() > 0)
    <div class="section">
        <div class="section-title">Evidence Files ({{ $complaint->evidences->count() }} items)</div>
        
        <table class="evidence-table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>File Name</th>
                    <th>File Type</th>
                    <th>Upload Date</th>
                </tr>
            </thead>
            <tbody>
                @foreach($complaint->evidences as $index => $evidence)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $evidence->title }}</td>
                    <td>{{ $evidence->file_type }}</td>
                    <td>{{ $evidence->created_at->format('M j, Y - g:i A') }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @endif

    <!-- Timeline Information -->
    <div class="section">
        <div class="section-title">Timeline Information</div>
        
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Submitted Date</div>
                <div class="info-value">{{ $complaint->created_at->format('F j, Y - g:i A') }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Last Updated</div>
                <div class="info-value">{{ $complaint->updated_at->format('F j, Y - g:i A') }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Days Since Submission</div>
                <div class="info-value">{{ $complaint->created_at->diffInDays(now()) }} days</div>
            </div>
            <div class="info-item">
                <div class="info-label">Last Update (Days Ago)</div>
                <div class="info-value">{{ $complaint->updated_at->diffInDays(now()) }} days ago</div>
            </div>
        </div>
    </div>

    <!-- Statistics -->
    <div class="section">
        <div class="section-title">Report Statistics</div>
        
        <div class="statistics">
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">{{ $complaint->evidences->count() }}</div>
                    <div class="stat-label">Total Evidences</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">{{ $complaint->created_at->diffInDays(now()) }}</div>
                    <div class="stat-label">Days Active</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">{{ $complaint->updated_at->diffInDays(now()) }}</div>
                    <div class="stat-label">Days Since Update</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>This report was automatically generated by RRI Complaint Management System</p>
        <p>Generated on {{ now()->format('F j, Y \a\t g:i A') }} | Report ID: RPT-{{ $complaint->id }}-{{ now()->format('Ymd') }}</p>
        <p>© {{ now()->year }} Radio Republik Indonesia. All rights reserved.</p>
    </div>
    </div>
</body>
</html>
