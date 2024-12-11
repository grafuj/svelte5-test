export async function fetchFilms(): Promise<any[]> {
  const graphqlQuery = {
    query: `
      query {
        films {
          id
          name
          releaseDate
          imdbUrl
          genre
        }
      }
    `,
  };

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphqlQuery),
  });

  console.log("response: ", response);

  if (!response.ok) {
    throw new Error(`Failed to fetch films: ${response.statusText}`);
  }

  const responseData = await response.json();

  if (responseData.errors) {
    throw new Error(`GraphQL Error: ${responseData.errors[0].message}`);
  }

  return responseData.data.films;
}
