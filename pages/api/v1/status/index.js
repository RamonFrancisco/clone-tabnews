import database from "../../../../infra/database.js";

async function status(request, response) {
  const query = await database.query("SELECT 1 + 1 as sum");
  console.log(query.rows);
  return response.status(200).json(query);
}

export default status;
