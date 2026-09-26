import { obtenerUsuarios } from "../../../src/lib/db.js";
import { env } from "cloudflare:workers";

export async function GET() {
  const usuarios = await obtenerUsuarios(env.p6);

  return Response.json({
    success: true,
    usuarios
  });
}
