const baseUrl = import.meta.env.VITE_BACKEND_URL;

export async function login(command) {
  const response = await fetch(`${baseUrl}/Authentication/Login`, {
    method: "POST",
    body: JSON.stringify(command),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    const errors = Object.values(data.errors).flat();
    console.log(errors);
    return response;
    //throw new Error(data.title);
  }

  return data;
}
