import axios from 'axios';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function generateOpenRouterChat(prompt: string): Promise<string> {
  const payload = {
    model: 'openai/gpt-4o', // You can change to any supported model
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 1000,
    stream: false,
  };

  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      payload,
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          // Optional attribution headers:
          // 'HTTP-Referer': 'https://your-site-url.com',
          // 'X-Title': 'Your Site Name',
        },
        timeout: 30000,
      }
    );
    if (response.data.choices && response.data.choices[0]?.message?.content) {
      return response.data.choices[0].message.content;
    }
    return JSON.stringify(response.data);
  } catch (error: any) {
    console.error('OpenRouter API error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error || error.message || 'Failed to generate text from OpenRouter API.'
    );
  }
}
