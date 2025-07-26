// src/controllers/speechController.ts
import { Context, Hono } from 'hono';
import { handleVoiceToText } from '../services/speech.service';

const voiceRoutes = new Hono()



voiceRoutes.post('/', getTextfromVoice)


async function getTextfromVoice (c: Context)  {
  const contentType = c.req.header('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return c.text('Invalid Content-Type. Expecting multipart/form-data', 400);
  }

  const formData = await c.req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return c.text('No file uploaded', 400);
  }

  try {
    const buffer = await file.arrayBuffer();
    console.log("🚀 ~ getTextfromVoice ~ buffer:", buffer)
    const transcript = await handleVoiceToText(Buffer.from(buffer));
    return c.json({ transcript });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};

export default voiceRoutes