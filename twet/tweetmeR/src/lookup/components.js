// apiFunctions.js
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? `Bearer ${user.access}` : ''; // Use the `access` token for Authorization
};
export async function fetchTweets(url = "http://localhost:8000/api/tweets/", id = null) {
  if (id) {
    url += `${id}/`;
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': getAuthToken(), // Use Bearer token from local storage
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('TokenExpired');
      }
      const errorData = await response.json();
      throw new Error(`Failed to fetch tweets: ${response.status} ${response.statusText} - ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tweet:", error);
    throw error;
  }
}

export async function PostTweet(data = {}, url = "http://localhost:8000/api/tweets/create/") {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('TokenExpired');
      }
      const errorData = await response.json();
      throw new Error(`Failed to post tweet: ${response.status} ${response.statusText} - ${errorData.detail}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error posting tweet:", error);
    throw error;
  }
}

export async function buttonsApiActions(action, id = 63, url = "http://localhost:8000/api/tweets/action/") {
  try {
    const requestData = { "action": action };
    url += `${id}/`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('TokenExpired');
      }
      // Handling non-JSON error responses
      const errorText = await response.text();
      throw new Error(`Failed action on tweet: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return { status: response.status, data: await response.json() };
  } catch (error) {
    console.error("Error on action tweet:", error);
    throw error;
  }
}
