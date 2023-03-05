type QueryResponse = {
  session_id: string,
  response_id: string,
  response_text: string
}

export async function queryTutor(
  prompt: string,
): Promise<QueryResponse> {
  return (await fetch(`api/tutor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: prompt }),
  }).then((res) => res.json())) as QueryResponse;
}