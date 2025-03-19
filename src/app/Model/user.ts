export interface User {
    id: string;  // GUID from .NET, stored as a string
    userName: string;
    password: string;
    email: string;
    role: string | null;  // Nullable Role (could be null)
    isActive: string | null;  // Nullable IsActive (true/false or null)
    createdAt: Date | null;  
  }
  