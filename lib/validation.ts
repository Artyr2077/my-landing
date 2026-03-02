export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  export interface ValidationError {
    field: string;
    message: string;
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    message: string;
  }
  
  export function validateContactForm(data: ContactFormData): ValidationError[] {
    const errors: ValidationError[] = [];
  
    if (!data.name.trim()) {
      errors.push({ field: 'name', message: 'Пожалуйста, введите имя' });
    }
  
    if (!data.email.trim()) {
      errors.push({ field: 'email', message: 'Пожалуйста, введите email' });
    } else if (!validateEmail(data.email.trim())) {
      errors.push({ field: 'email', message: 'Введите корректный email' });
    }
  
    if (!data.message.trim()) {
      errors.push({ field: 'message', message: 'Пожалуйста, напишите сообщение' });
    }
  
    return errors;
  }