import { obtenerUsuarios } from "../../../src/lib/db.js";

export async function GET(request, context) {
  const db = context.env.p6;

  const usuarios = await obtenerUsuarios(db);

  return Response.json({
    success: true,
    usuarios
  });
}