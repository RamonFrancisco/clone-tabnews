import database from "infra/database";

test("return 405 when access '/api/v1/migrations' with method invalid", async () => {
  const response = await fetch("http:localhost:3000/api/v1/migrations", {
    method: "put",
  });
  expect(response.status).toBe(405);
});
