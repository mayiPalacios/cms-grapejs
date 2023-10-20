export async function http(path, config) {
  const request = new Request(path, config);
  const response = await fetch(request);
  
  if (!response.ok) {
    throw response;
  }

  const contentType = response.headers.get("content-type");
  
  if (contentType && contentType.includes("application/json")) {
    // Si la respuesta es JSON, analízala como JSON
    return response.json().catch(() => {
      throw new Error("Error al analizar la respuesta JSON");
    });
  } else if (contentType && contentType.includes("text/html")) {
    // Si la respuesta es HTML, obténla como texto
    return response.text().catch(() => {
      throw new Error("Error al obtener la respuesta HTML como texto");
    });
  } else {
    // Si el tipo de contenido no es reconocido, devuelve la respuesta completa
    return response;
  }
}
  
  export async function get(path, config) {
    const init = { method: "get", ...config };
    return http(path, init);
  }
  
  export async function post(path, newbody, config) {
    const init = { method: "post", body: JSON.stringify(newbody), ...config };
    return http(path, init);
  }

  export async function del(path, newbody, config) {
    const init = { method: "delete", body: JSON.stringify(newbody), ...config };
    return http(path, init);
  }
  