import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
  try {
    // Parsear el cuerpo de la solicitud
    const body = await request.json();
    
    // Si es una solicitud de firma
    if ('paramsToSign' in body) {
      const { paramsToSign } = body;
      const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET as string
      );
      return Response.json({ signature });
    }
    
    // Si es una solicitud de eliminación
    if ('public_id' in body) {
      const { public_id } = body;
      const result = await cloudinary.uploader.destroy(public_id);
      
      if (result.result === 'ok') {
        return Response.json({ message: 'Image deleted successfully' });
      } else {
        return Response.json({ error: 'Failed to delete image' }, { status: 400 });
      }
    }

    return Response.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}