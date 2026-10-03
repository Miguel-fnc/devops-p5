# UAT Report — Práctica 5: Publicar en Cloudflare

**Proyecto:** devops-p5  
**Ambiente objetivo:** Prod (`devops-p5-prod`)  
**Fecha de preparación:** 2026-10-03  
**Estado:** Borrador; las pruebas en el sitio publicado requieren completar el despliegue.

## Alcance

Validar que el proyecto compile, que las pruebas unitarias de la consulta a D1 pasen con reporte de cobertura, que GitHub Actions publique el artefacto y que el Worker de producción responda después del despliegue.

## Resultados locales

| ID | Verificación | Resultado esperado | Resultado observado | Estado |
|---|---|---|---|---|
| UT-01 | `obtenerUsuarios` usa `SELECT * FROM users` y devuelve los registros de D1 | Devuelve los registros y prepara la consulta correcta | Prueba unitaria aprobada | PASS |
| UT-02 | `obtenerUsuarios` con una tabla sin registros | Devuelve `[]` | Prueba unitaria aprobada | PASS |
| UT-03 | Reporte de cobertura de Node.js | Se genera resumen de cobertura | `src/lib/db.js`: 100% líneas, ramas y funciones | PASS |
| CI-01 | Build de producción | Se genera la salida de Cloudflare Worker | Build completado localmente | PASS |

Las pruebas se ejecutaron con Node.js local mediante `node --test --experimental-test-coverage`. El comando `npm test` está configurado en `package.json`; en la máquina donde se preparó este reporte, el lanzador global de npm no encontró su `npm-cli.js`, por lo que se usó directamente el comando Node equivalente. GitHub Actions instala Node.js 22 y ejecutará `npm test` desde un runner limpio.

## Pruebas de aceptación pendientes en Prod

Completa esta sección después de que el job `Publish Cloudflare production Worker` termine correctamente en GitHub Actions.

**URL pública del Worker:** pendiente de primer despliegue (`https://devops-p5-prod.<subdominio>.workers.dev`).  
**Run de GitHub Actions:** pendiente.  
**Probado por:** pendiente.  
**Fecha de prueba:** pendiente.

| ID | Prueba manual | Resultado esperado | Resultado observado | Estado |
|---|---|---|---|---|
| UAT-01 | Abrir la URL pública del Worker | La página principal carga y muestra la app | Pendiente | NOT RUN |
| UAT-02 | Abrir `<URL pública>/api/hello` | Respuesta JSON con `Hello from vinext on Cloudflare Workers` | Pendiente | NOT RUN |
| UAT-03 | Abrir `<URL pública>/api/users` | Respuesta JSON con `success: true` y usuarios de D1 | Pendiente; requiere que la base configurada tenga la tabla `users` | NOT RUN |
| UAT-04 | Revisar el job `build-test` en GitHub Actions | Tests, cobertura y build completados; artefacto `cloudflare-worker` disponible | Pendiente | NOT RUN |
| UAT-05 | Revisar el job `deploy-prod` en GitHub Actions | Worker publicado con nombre `devops-p5-prod` | Pendiente | NOT RUN |

## Evidencia a adjuntar para la entrega

- El archivo YAML: `.github/workflows/ci-cd.yml`.
- Captura del run exitoso de GitHub Actions con los jobs `build-test` y `deploy-prod`.
- Captura o archivo `coverage.txt` dentro del artefacto `cloudflare-worker`.
- URL real del Worker publicado, reemplazando el valor pendiente de arriba.
- Resultados y capturas de UAT-01 a UAT-05 una vez ejecutadas.

## Nota de configuración

El Worker de producción usa el binding D1 definido en `wrangler.jsonc` (`practica6`). Si producción debe usar datos independientes, actualiza el binding para que apunte a una base D1 de producción antes de ejecutar el workflow.
