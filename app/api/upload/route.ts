import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const image = data.get("image");

    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        { error: "No se ha subido ninguna imagen o el archivo no es válido" },
        { status: 400 }
      );
    }

    // Convertir el archivo a un buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Guardar archivo en el servidor
    const filePath = path.join(process.cwd(), "public", image.name);
    await writeFile(filePath, buffer);

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads", // carpeta en Cloudinary
    });

    // Devolver la URL de Cloudinary
    return NextResponse.json({
      message: "Imagen subida exitosamente",
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al subir la imagen" },
      { status: 500 }
    );
  }
}
