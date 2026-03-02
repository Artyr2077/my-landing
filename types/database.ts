export interface Lead {
    id: number;
    name: string;
    email: string;
    message: string;
    status: 'new' | 'read' | 'contacted';
    created_at: string;
  }
  
  export type LeadStatus = Lead['status'];
  
  export interface LeadFormData {
    name: string;
    email: string;
    message: string;
  }