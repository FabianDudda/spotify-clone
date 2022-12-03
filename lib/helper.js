const BASE_URL = "http://localhost:3000/";
// all comments
export const getComments = async () => {
  const response = await fetch(`${BASE_URL}api/comments`);
  const json = await response.json();

  return json;
};

// single comment
export const getComment = async (commentId) => {
  const response = await fetch(`${BASE_URL}api/comments/${commentId}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

// posting a new comment
export async function addComment(formData) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}api/comments`, Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

// Update a new comment
export async function updateComment(commentId, formData) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${BASE_URL}api/comments/${commentId}`, Options);
  const json = await response.json();
  return json;
}

// Delete a new comment
export async function deleteComment(commentId) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${BASE_URL}api/comments/${commentId}`, Options);
  const json = await response.json();
  return json;
}
