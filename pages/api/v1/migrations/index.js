import database from "infra/database.js";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const { method } = request;
  const dbClient = await database.getNewClient();

  const migrationRunnerConfigs = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  console.log(method);

  if (method === "GET") {
    const pendingMigrations = await migrationRunner(migrationRunnerConfigs);

    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...migrationRunnerConfigs,
      dryRun: false,
    });

    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  }

  return response.status(405).end();
}
