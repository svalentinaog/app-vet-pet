import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { imagePath } = req.body; // Recibir array de rutas
  if (!Array.isArray(imagePath)) {
    return res.status(400).json({ message: "Formato de datos inválido" });
  }

  try {
    // Subir cada imagen a Cloudinary
    const uploadResults = await Promise.all(
      imagePath.map((path) =>
        cloudinary.uploader.upload(path, { folder: "example_folder" })
      )
    );

    // Obtener las URLs de las imágenes subidas
    const urls = uploadResults.map((result) => result.secure_url);

    return res.status(200).json({ message: "Imágenes subidas exitosamente", urls });
  } catch (error) {
    console.error("Error al subir las imágenes:", error);
    return res.status(500).json({ message: "Error al procesar las imágenes", error });
  }
}
