import { Configuration } from "openai";
export const configureOpenAI = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPENAI_ORG_ID,
    });
    return config;
};
//# sourceMappingURL=opeinaiConfig.js.map