


import { Configuration, OpenAIApi } from 'openai'

import * as dotenv from 'dotenv'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const ChatbotAnswer = async(req,res) => {
    const { input:prompt } = req.body;
    try {
        const response = await openai.createCompletion({
            model: "code-cushman-001",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        console.log(prompt)
        res.status(200).send({
            bot: response.data.choices[0].text
        });
    
    }
    catch (error) {
        console.error(error)
        res.status(200).send({bot:'Something went wrong'});
    }
}