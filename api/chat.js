export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt } = req.body;
        const apiKey = process.env.OPENROUTER_API_KEY; // AMBIL DARI SETTING VERCEL

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://alan-studio.com", // Opsional
                "X-Title": "Alan Studio"
            },
            body: JSON.stringify({
                "model": "google/gemini-flash-1.5",
                "messages": [
                    { "role": "system", "content": "Kamu adalah XXIXI AI, asisten pintar Alan. Jawab dengan gaya pro-developer." },
                    { "role": "user", "content": prompt }
                ]
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
