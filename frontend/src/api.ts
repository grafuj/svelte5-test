
export async function fetchFilms(): Promise<any[]> {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/films`);
  console.log("response: ", response)
  if (!response.ok) {
    throw new Error(`Failed to fetch films: ${response.statusText}`);
  }
  return response.json();
}
