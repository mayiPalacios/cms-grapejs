export async function http(path, config) {
    const request = new Request(path, config);
    const response = await fetch(request);
    if (!response.ok) {
      throw response; 
    }
    return response.json().catch(() => {
      throw new Error("Error while getting response");
    });
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
  