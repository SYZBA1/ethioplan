export interface FeasibilitySection {
  id: string;
  title: string;
  description: string; // Explains what goes here in a generalized context
  content?: string; // The user's or AI's draft
  subsections?: FeasibilitySection[];
}

export interface BusinessContext {
  projectName: string;
  projectOwner: string;
  location: string; // Woreda/City
  sector: string; // e.g., Agriculture, Tech, Manufacturing
  description: string;
  language: 'en' | 'am';
}

export interface SwotData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}
