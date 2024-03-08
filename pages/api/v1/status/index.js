function status(request, response) {
  return response.status(200).json({ chave: "curso topzera" });
}

export default status;
