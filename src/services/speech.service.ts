// src/services/speechService.ts
import * as speech from '@google-cloud/speech';


const client = new speech.SpeechClient();

export async function handleVoiceToText(audioBuffer: Buffer): Promise<string> {
  const audioBytes = audioBuffer.toString('base64');

  const request = {
    audio: {
      content: audioBytes,
    },
    config: {
     encoding: speech.protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.MP3,
      sampleRateHertz: 48000,
      languageCode: 'km-KH',// Khmer language code
    },
  };

  const result = await client.recognize(request);
  const response = result[0];

  const transcription = response.results
    ?.map(result => result.alternatives?.[0].transcript)
    .join('\n');

  return transcription || '';
}
