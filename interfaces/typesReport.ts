//TODO Reporte para la lista de historial:
export interface formDataReport {
  id: string;
  name: string;
  petName?: string;
  phone: string;
  location: string;
  description: string;
  age: string;
  status: string;
  images: string[];
}

{
  /*
  ESTRUCTURA DEL FORMULARIO DE REPORTES:
  export interface formDataReport {
  id: string;                    // ID único del reporte
  name: string;                  // Nombre del reportante
  reporterName?: string;         // Nombre adicional del reportante
  reporterEmail?: string;        // Correo electrónico del reportante
  petName?: string;              // Nombre de la mascota
  petType?: string;              // Tipo de mascota (perro, gato, ave, etc.)
  breed?: string;                // Raza de la mascota
  color?: string;                // Color del animal
  size?: string;                 // Tamaño del animal (pequeño, mediano, grande)
  specialMarks?: string;         // Marcas especiales (manchas, cicatrices, collares, etc.)
  phone: string;                 // Teléfono del reportante
  location: string;              // Ubicación general del reporte
  lastSeen?: string;             // Última ubicación donde se vio (para animales perdidos)
  description: string;           // Descripción adicional del animal o situación
  age?: string;                  // Edad aproximada del animal
  status: string;                // Estado del reporte (perdido, sin hogar, encontrado)
  reward?: number;               // Recompensa ofrecida, si aplica
  images: string[];              // Imágenes del animal o situación
  dateReported: string | Date;   // Fecha en la que se hizo el reporte
  isVerified?: boolean;          // Si el reporte fue verificado
  reportStatus?: string;         // Estado del reporte (abierto, cerrado, en proceso)
}


  EJEMPLO:
  const report: formDataReport = {
  id: "12345",
  name: "Juan Pérez",
  reporterName: "Juan Pérez",
  reporterEmail: "juanperez@example.com",
  petName: "Manchas",
  petType: "Perro",
  breed: "Labrador",
  color: "Blanco con manchas negras",
  size: "Grande",
  specialMarks: "Tiene una mancha en forma de corazón en la pata",
  phone: "3187399367",
  location: "Versalles",
  lastSeen: "Parque central de Versalles",
  description: "Manchas se perdió el 5 de mayo cerca del parque.",
  age: "3 años",
  status: "Perdido",
  reward: 200,
  images: ["/assets/pet1.png", "/assets/pet1-2.png"],
  dateReported: new Date(),
  isVerified: true,
  reportStatus: "Abierto",
};

  */
}
