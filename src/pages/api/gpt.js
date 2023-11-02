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
    console.log("OpenAI response:", data);
    console.log("OpenAI response:", data.choices[0].message.content);
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
        You will be given a video game title. You must respond the the names of other video games that are similar to the given title that you think the user would like. Respond with all titles in an array. Example:
        [Valheim, Minecraft, Terraria]. Respond only with the array.
        Always give 5 games back in the response.

        The game is: ${item}
      `;

      const game = await queryOpenAI(prompt);
      res.status(200).json({ game: removeQuotationMarks(game) });
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
