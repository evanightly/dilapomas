<?php

namespace Database\Seeders;

use App\Models\Complaint;
use App\Models\ComplaintEvidence;
use Illuminate\Database\Seeder;

class ComplaintSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // Create sample complaints
        $complaints = [
            [
                'reporter' => 'John Doe',
                'reporter_identity_type' => 'KTP',
                'reporter_identity_number' => '1234567890123456',
                'incident_title' => 'Unprofessional Behavior During Live Broadcast',
                'incident_description' => 'I witnessed unprofessional behavior during the morning news broadcast on July 15, 2025. The presenter was making inappropriate comments about local community members, which I found disrespectful and damaging to the station\'s reputation. This behavior continued for approximately 15 minutes during the 8 AM news segment.',
                'incident_time' => '2025-07-15 08:30:00',
                'reported_person' => 'News Presenter Jane Smith',
                'status' => 'pending',
                'priority' => 'high',
            ],
            [
                'reporter' => 'Maria Santos',
                'reporter_identity_type' => 'SIM',
                'reporter_identity_number' => 'A1234567890123',
                'incident_title' => 'Technical Issues During Emergency Broadcast',
                'incident_description' => 'During the emergency weather alert broadcast on July 14, 2025, there were severe technical issues that prevented the message from being clearly transmitted. The audio was cutting out, and the broadcast quality was poor, which could have endangered lives during the severe weather warning.',
                'incident_time' => '2025-07-14 16:45:00',
                'reported_person' => 'Technical Team Lead Mike Johnson',
                'status' => 'in_progress',
                'priority' => 'high',
            ],
            [
                'reporter' => 'Ahmad Rahman',
                'reporter_identity_type' => 'KTP',
                'reporter_identity_number' => '3216789012345678',
                'incident_title' => 'Incorrect Information in News Report',
                'incident_description' => 'The news report aired on July 13, 2025, contained factually incorrect information about the local election results. The reporter stated incorrect vote counts and candidate names, which could mislead the public about the election outcomes.',
                'incident_time' => '2025-07-13 19:00:00',
                'reported_person' => 'Reporter Sarah Williams',
                'status' => 'resolved',
                'priority' => 'medium',
            ],
            [
                'reporter' => 'Lisa Chen',
                'reporter_identity_type' => 'Passport',
                'reporter_identity_number' => 'P12345678',
                'incident_title' => 'Discriminatory Comments on Talk Show',
                'incident_description' => 'During yesterday\'s evening talk show, the host made discriminatory comments about minority communities. These comments were inappropriate and go against the values of inclusivity and respect that should be maintained in public broadcasting.',
                'incident_time' => '2025-07-17 20:30:00',
                'reported_person' => 'Talk Show Host Robert Davis',
                'status' => 'pending',
                'priority' => 'medium',
            ],
        ];

        foreach ($complaints as $complaintData) {
            $complaint = Complaint::create($complaintData);

            // Add some sample evidence files for some complaints
            if ($complaint->id % 2 == 0) {
                ComplaintEvidence::create([
                    'complaint_id' => $complaint->id,
                    'title' => 'Screenshot of broadcast',
                    'file_path' => 'evidence/sample_screenshot.png',
                    'file_type' => 'image/png',
                ]);

                ComplaintEvidence::create([
                    'complaint_id' => $complaint->id,
                    'title' => 'Audio recording',
                    'file_path' => 'evidence/sample_audio.mp3',
                    'file_type' => 'audio/mp3',
                ]);
            }
        }
    }
}
