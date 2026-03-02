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
  
  // Добавим типы для ответов от Supabase
  export interface SupabaseResponse<T> {
    data: T | null;
    error: {
      message: string;
      details?: string;
      hint?: string;
      code?: string;
    } | null;
  }