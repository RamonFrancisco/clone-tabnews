test("GET to '/api/v1/status' should return status 200", async () => {
  const response = await fetch("http:localhost:3000/api/v1/status");
  const responseJson = await response.json();

  const parsedUpdatedAt = new Date(responseJson.updated_at).toISOString();
  expect(responseJson.updated_at).toEqual(parsedUpdatedAt);

  expect(responseJson.dependencies.database.version).toEqual("16.0");
  expect(responseJson.dependencies.database.max_connections).toEqual(100);
  expect(responseJson.dependencies.database.opened_connections).toEqual(1);
});
