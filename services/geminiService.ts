import { GoogleGenAI } from "@google/genai";
import { BusinessContext } from "../types";

// NOTE: In a real production app, you should not expose API keys on the client side.
// This is for demonstration/prototyping purposes.
const API_KEY = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateSectionContent = async (
  sectionTitle: string,
  sectionDescription: string,
  context: BusinessContext,
  priorContent?: string
): Promise<string> => {
  if (!API_KEY) {
    return "API Key is missing. Please configure the environment variable.";
  }

  const langInstruction = context.language === 'am' 
    ? 'IMPORTANT: Write the response entirely in the Amharic language.' 
    : 'Write in professional business English.';

  const prompt = `
    You are a professional business consultant specializing in the Ethiopian market.
    Write a draft for the following section of a study/plan.
    
    Project Details:
    - Name: ${context.projectName}
    - Owner: ${context.projectOwner}
    - Location: ${context.location}
    - Sector: ${context.sector}
    - Description: ${context.description}

    ${priorContent ? `
    CONTEXT FROM PREVIOUS FEASIBILITY STUDY:
    The user has already completed a feasibility study. Use the following summary/content to ensure alignment:
    "${priorContent.substring(0, 3000)}..." (truncated)
    ` : ''}

    Section to Write: ${sectionTitle}
    Context/Guidance for this section: ${sectionDescription}

    Guidelines:
    - ${langInstruction}
    - Be specific to the Ethiopian context (e.g., mention Birr, local regulations if relevant).
    - If specific numbers are unknown, use placeholders like [Insert Amount] or [Insert Data].
    - Format with clear paragraphs and bullet points where necessary.
    - Keep it concise but comprehensive (approx 200-400 words).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please try again.";
  }
};

export const generateSWOT = async (context: BusinessContext): Promise<string> => {
    if (!API_KEY) return "{}";

    const langInstruction = context.language === 'am'
     ? 'Return the content inside the JSON in Amharic.'
     : 'Return the content in English.';

    const prompt = `
      Generate a SWOT analysis for a ${context.sector} business in ${context.location}, Ethiopia named "${context.projectName}".
      
      Business Description: ${context.description}

      ${langInstruction}
      Return ONLY a valid JSON object with the following structure:
      {
        "strengths": ["string", "string"],
        "weaknesses": ["string", "string"],
        "opportunities": ["string", "string"],
        "threats": ["string", "string"]
      }
      Do not include markdown formatting like \`\`\`json. Just the raw JSON string.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });
        return response.text || "{}";
    } catch (error) {
        console.error("Gemini SWOT Error:", error);
        return "{}";
    }
}
