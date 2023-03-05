type QueryResponse = {
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
    body: JSON.stringify({ prompt }),
  }).then((res) => res.json())) as QueryResponse;
}

export async function queryFeedback(
  prompt: string,
): Promise<QueryResponse> {
  return (await fetch(`api/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  }).then((res) => res.json())) as QueryResponse;
}