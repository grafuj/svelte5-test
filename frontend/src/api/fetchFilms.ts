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

  console.log("api.ts 24 response: ", response);

  if (!response.ok) {
    throw new Error(`Failed to fetch films: ${response.statusText}`);
  }

  const responseData = await response.json();
  console.log("films 30 responseData: ", responseData);

  if (responseData.errors) {
    console.error("films 33 GraphQL Errors: ", responseData.errors);
    throw new Error(`GraphQL Error: ${responseData.errors[0].message}`);
  }

  console.log("Films Data: ", responseData.data.films);
  return responseData.data.films;
}
