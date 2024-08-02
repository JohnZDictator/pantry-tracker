import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import cors from '@/lib/cors';

dotenv.config();
const openai = new OpenAI({apiKey: process.env.OPEN_AI_KEY});

export default async function handler(req, res) {

    await cors(req, res);

    console.log('function was called');

    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method Not Allowed'});
    }

    const {imageUrl} = req.body;
    if(!imageUrl){
        return res.status(400).json({message: 'Image URL is required'});
    }
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: 'Identify the item in the image and return its name',
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: imageUrl,
                                detail: 'low',
                            }
                        }
                    ],
                }
            ],
        }); 
        return res.status(200).json({itemName: response.choices[0]});
    } catch (error) {
        console.error('Error identifying item:', error);
        return res.status(500).json({ message: 'Internal Server Error' });        
    }
}