export async function fetchTweets(url = "http://localhost:8000/api/tweets/" , id=null) { 
  if (id){
    url =url + id +'/'
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 38d8b5e2993f43b88b3b7d35c17a3423512d5ae0',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch tweets: ${response.status} ${response.statusText} - ${errorData.message}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error on  fetching tweet:", error.response.data);
    throw error; // Re-throw the error for proper error propagation
  }
}

export async function PostTweet(data = {}, url = "http://127.0.0.1:8000/api/tweets/create/", method = "POST") {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 38d8b5e2993f43b88b3b7d35c17a3423512d5ae0',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to post tweet: ${response.status} ${response.statusText} - ${errorData.detail}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error on posting tweet:", error.response.data);
    throw error;
  }
}

export async function buttonsApiActions(action, id = 63, url = "http://127.0.0.1:8000/api/tweets/action/", method = "PUT") {
  try {
    const requestData = {"action": action };
    url += `${id}/`;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 38d8b5e2993f43b88b3b7d35c17a3423512d5ae0',
      },
      body: JSON.stringify(requestData), // Send requestData instead of data
    });

    if (!response.ok) {
      // Handling non-JSON error responses
      const errorText = await response.text();
      throw new Error(`Failed action to tweet: ${response.status} ${response.statusText} - ${errorText}`);
    }

    // Read the response and return the expected data
    const responseData = await response.json();
    return { status: response.status, data: responseData }; // Return the response status and data
  } catch (error) {
    console.error("Error on action tweet:", error.response.data);
    throw error;
  }
}
