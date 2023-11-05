const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";

async function queryOpenAI(promptContent) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  try {
    const response = await fetch(OPENAI_API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptContent }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const message = data.choices[0].message;
    if (message && message.role === "assistant") {
      return message.content.trim();
    }
    return "";
  } catch (error) {
    console.error("Error querying OpenAI:", error);
    throw error;
  }
}

function removeQuotationMarks(str) {
  if (!str || str.length === 0) {
    return str;
  }
  return str.replace(/^['"]+|['"]+$/g, "");
}

const GPT = async (req, res) => {
  if (req.method === "GET") {
    try {
      const item = req.query.term;
      const prompt = `
        You will be given an array of video game titles that belong to a users favourites in a video game database. You must respond the the names of other video games, DIFFERENT then those sent in that you think the user would like. Your response will be used to queryIGDB API.
        Respond with all your suggested video game titles part of the query in one line. Your suggestions MUST be different games then the input games. Try to be creative in choosing games they would like. Example:
        fields id, name; where (name ~ "Suggestion 1" | name ~ "Suggestion 2" | name ~ "Suggestion 3" | name ~ "Suggestion 4" | name ~ "Suggestion 5") & version_parent = null & parent_game = null; limit 5;

        The game is: ${item}
      `;
      const game = await queryOpenAI(prompt);
      res.status(200).json(removeQuotationMarks(game));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to fetch similar games" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default GPT;

// Respond with all titles in an array. Example:
//         [Valheim, Minecraft, Terraria]. Respond only with the array.
//         Always give 5 games back in the response.
