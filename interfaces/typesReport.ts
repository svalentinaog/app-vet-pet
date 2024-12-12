  //TODO Reporte para la lista de historial:
  export interface Report {
    id: string;                   
    type: "lost" | "stray";       
    age : string;
    description: string;          
    date: Date;                   
    location?: string;            
  }
