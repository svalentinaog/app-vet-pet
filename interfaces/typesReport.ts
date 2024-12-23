<<<<<<< HEAD
export interface FormDataReport {
  petId : number;
  reportType: "lost" | "found";
  reporterName: string; // Nombre del reportante
  phone: string; // Número de teléfono del reportante
  petType: string; // Tipo de mascota
  petName?: string; // Nombre de la mascota (para "perdido")
  foundLocation?: string; // Lugar encontrado
  description: string;
  age?: string; // Edad aproximada (solo para "perdido")
  status?: string; // Estado: Sin hogar, Perdido, etc.
  images: string[];
  reward?: string; //Solo para "perdido"
  dateCreationReport: string; // Fecha de creación del reporte
}
=======
  //TODO Reporte para la lista de historial:
  export interface  Report {
    id: string;                   
    type: "lost" | "stray";       
    age : string;
    description: string;          
    date: Date;                   
    location?: string;            
  }
>>>>>>> c2ebae3dda5099f85fddb9dff4dd7514e5227b61
