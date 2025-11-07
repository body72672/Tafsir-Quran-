
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we'll log an error.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const interpretDream = async (dreamText: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        أنت مفسر أحلام خبير ومختص في تفسير الرؤى والأحلام استنادًا إلى القرآن الكريم.
        مهمتك هي تحليل الحلم التالي وتقديم تفسير واضح وموجز مستوحى من معاني وآيات القرآن.
        إذا وجدت رمزًا في الحلم يرتبط بآية معينة، اذكر الآية ورقمها واسم السورة.
        اجعل التفسير إيجابيًا ومطمئنًا قدر الإمكان.

        الحلم: "${dreamText}"

        التفسير:
      `,
    });
    return response.text;
  } catch (error) {
    console.error("Error interpreting dream:", error);
    return "عذرًا، حدث خطأ أثناء محاولة تفسير حلمك. يرجى المحاولة مرة أخرى.";
  }
};

export const askAssistant = async (question: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `
            أنت مساعد ذكي متخصص في الإجابة على الأسئلة الدينية الإسلامية والأسئلة العامة.
            أجب على السؤال التالي بطريقة واضحة ومبسطة ومفيدة.

            السؤال: "${question}"

            الإجابة:
        `
    });
    return response.text;
  } catch (error) {
    console.error("Error with AI assistant:", error);
    return "عذرًا، لا يمكنني الإجابة على سؤالك الآن. يرجى المحاولة لاحقًا.";
  }
};
   