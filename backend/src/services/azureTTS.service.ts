import axios from 'axios';

const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION;

if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
  throw new Error('Azure Speech key or region is not set in environment variables.');
}

const AZURE_TTS_ENDPOINT = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;

export async function textToSpeech(text: string, voice: string = 'en-US-JennyNeural') {
  const ssml = `<?xml version="1.0" encoding="utf-8"?>\n<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='${voice}'>${text}</voice></speak>`;

  const response = await axios.post(
    AZURE_TTS_ENDPOINT,
    ssml,
    {
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
      },
      responseType: 'arraybuffer',
    }
  );

  return Buffer.from(response.data);
}
