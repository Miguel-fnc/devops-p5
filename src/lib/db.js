export async function obtenerUsuarios(db) {
  const resultado = await db
    .prepare("SELECT * FROM users")
    .all();

  return resultado.results;
}