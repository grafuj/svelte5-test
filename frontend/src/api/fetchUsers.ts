export async function fetchUsers(): Promise<any[]> {
  const graphqlQuery = {
    query: `
      query {
        users {
          id
          username
          email
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

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  const responseData = await response.json();
  console.log("users 30 responseData: ", responseData);

  if (responseData.errors) {
    console.error("users 33 GraphQL Errors: ", responseData.errors);
    throw new Error(`GraphQL Error: ${responseData.errors[0].message}`);
  }

  console.log("users 37 Users Data: ", responseData.data.users);
  return responseData.data.users;
}
