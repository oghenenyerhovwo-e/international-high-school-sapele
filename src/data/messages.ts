export interface AlertTypes {
  id: string;
  message: string;
  fullMessage?: string;
  type: 'info' | 'warning' | 'critical';
}

export const schoolAlert: AlertTypes[] = [
    // {
    //     id: 'alert-1',
    //     message: '🚨 URGENT: School will be closed this Friday due to inclement weather.',
    //     fullMessage: '🚨 URGENT: School will be closed this Friday due to inclement weather. All classes will transition to online learning. Please check your email for detailed instructions from your teachers. Stay safe and warm!',
    //     type: 'critical'
    // },
    // {
    //     id: 'alert-2', 
    //     message: '📢 Important: Parent-Teacher conferences scheduled for next week.',
    //     fullMessage: '📢 Important: Parent-Teacher conferences scheduled for next week. Please book your time slot through the parent portal. Each session will be 15 minutes long. If you need more time, please contact the teacher directly to schedule a separate meeting.',
    //     type: 'warning'
    // },
    {
        id: 'alert-3',
        message: 'ℹ️ Reminder: School resumes on Monday, 8th of September, 2025.',
        fullMessage: 'ℹ️ Reminder: School resumes on Monday, 8th of September, 2025. All students are expected to be present and prepared for the new term. Further details and timetables will be shared on resumption.',
        type: 'info'
    }
]