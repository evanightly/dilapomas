const intents = {
    CUSTOM_ACTION: 'custom.action',
    SUBMIT_PUBLIC_COMPLAINT: 'submit.public.complaint',
    GENERATE_COMPLAINT_REPORT: 'generate.complaint.report',
};

export const IntentEnum = intents;

export type IntentEnum = (typeof intents)[keyof typeof intents];
