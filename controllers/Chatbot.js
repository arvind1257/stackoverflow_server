


import { Configuration, OpenAIApi } from 'openai'

import * as dotenv from 'dotenv'

dotenv.config()

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export const ChatbotAnswer = async(req,res) => {
    const { input:prompt } = req.body;
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            max_tokens: 2048,
            temperature: 1,
        });
        res.status(200).send({
            bot: response.data.choices[0].text
        });
    
    }
    catch (error) {
        console.error(error)
        res.status(200).send({bot:'Something went wrong'});
    }
}