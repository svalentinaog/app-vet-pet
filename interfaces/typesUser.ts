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

  //TODO Reporte para la lista de historial:
  export interface Report {
    id: string;                   
    type: "lost" | "stray";       
    age : string;
    description: string;          
    date: Date;                   
    location?: string;            
  }
