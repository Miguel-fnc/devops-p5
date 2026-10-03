# vinext app

This project was created with create-vinext-app.

## Scripts

- `npm run dev` starts the vinext dev server.
- `npm run build` builds the Cloudflare Worker output.
- `npm run start` starts the built Worker locally with Wrangler.
- `npm run deploy` deploys the Cloudflare Worker.
- `npm test` runs the unit tests and prints the coverage report.

## CI/CD on GitHub Actions

The workflow in `.github/workflows/ci-cd.yml` runs the tests and build on pull requests to `main`, then stores `dist/` and `coverage.txt` as the `cloudflare-worker` artifact. Pushes to `main` and manual runs also deploy the artifact as the `devops-p5-prod` Cloudflare Worker using the GitHub Actions environment named `Prod`.

See [UAT_REPORT.md](./UAT_REPORT.md) for local test results and the checklist to complete after the production deployment.

To enable the production deployment, create the `Prod` environment in the repository's GitHub settings and add these environment secrets:

- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with permission to deploy Workers.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID.

Run `npm test` locally to see the coverage report before pushing.

The generated production Worker currently uses the D1 binding configured in `wrangler.jsonc` (`practica6`). Point that binding at a separate production D1 database before deploying if production data must be isolated from development.
