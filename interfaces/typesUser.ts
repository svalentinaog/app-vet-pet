//TODO Usuario:
export interface User {
    name: string;                
    username: string;            
    password: string;            
    phone: string;               
    email: string;               
    pets: string[];              
    role?: "user" | "admin";     
    registrationDate?: Date;     
    preferredContactMethod?: "email" | "phone" | "none"; 
    reportHistory?: Report[];     
    profilePictureUrl?: string;   
  }
  
  //TODO Estado del usuario:
  export interface UserState {
      user: User | null;
      isAuthenticated: boolean;
    }
