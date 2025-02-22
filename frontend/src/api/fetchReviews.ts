export async function fetchReviews(): Promise<any[]> {
  const graphqlQuery = {
    query: `
      query {
        reviews {
          id
          userId
          filmId
          engagement
          engagementScore
          acting
          actingScore
          plotConsistency
          plotConsistencyScore
          sceneChoice
          sceneChoiceScore
          dialog
          dialogueScore
          characterDesires
          characterDesiresScore
          theme
          themeScore
          suitability
          suitabilityScore
          overallScore
          user {
            username
          }
          film {
           name
          }
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

  // console.log("api.ts 24 response: ", response);

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.statusText}`);
  }

  const responseData = await response.json();
  // console.log("reviews 30 responseData: ", responseData);

  if (responseData.errors) {
    console.log("responseData: ", responseData);
    console.error("GraphQL Errors: ", responseData.errors);
    throw new Error(`GraphQL Error: ${responseData.errors[0].message}`);
  }

  // console.log("Films Data: ", responseData.data.films);
  return responseData.data.reviews;
}
