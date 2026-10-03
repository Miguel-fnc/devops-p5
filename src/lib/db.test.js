import { test } from "node:test";
import assert from "node:assert/strict";
import { obtenerUsuarios } from "./db.js";

test("obtenerUsuarios consulta users en D1 y regresa los resultados", async () => {
  const usuarios = [{ id: 1, nombre: "Ana" }, { id: 2, nombre: "Luis" }];
  let consulta;
  const db = {
    prepare(sql) {
      consulta = sql;
      return {
        async all() {
          return { results: usuarios };
        },
      };
    },
  };

  assert.deepEqual(await obtenerUsuarios(db), usuarios);
  assert.equal(consulta, "SELECT * FROM users");
});

test("obtenerUsuarios regresa una lista vacía cuando no hay usuarios", async () => {
  const db = {
    prepare() {
      return { async all() { return { results: [] }; } };
    },
  };

  assert.deepEqual(await obtenerUsuarios(db), []);
});
