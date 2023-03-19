type QueryResponse = {
  response_text: string
}

export async function queryTutor(
  prompt: string,
): Promise<QueryResponse> {
  const response = (await fetch(`api/tutor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  }).then((res) => res.json())) as QueryResponse;
  response.response_text = response.response_text.replace("<|im_end|>", "").trim()
  console.log(prompt)
  console.log(response.response_text)
  return response
}

export async function queryFeedback(
  prompt: string,
): Promise<QueryResponse> {
  const response = (await fetch(`api/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  }).then((res) => res.json())) as QueryResponse;
  response.response_text = response.response_text.replace("<|im_end|>", "").trim()
  return response
}

export async function queryTranslation(
  text: string,
): Promise<QueryResponse> {
  return (await fetch(`api/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  }).then((res) => res.json())) as QueryResponse;
}
