import React, { useState } from 'react';
import TemplateBuilder from './components/TemplateBuilder';
import AuthScreen from './components/AuthScreen';
import { BusinessContext, FeasibilitySection } from './types';
import { getFeasibilityTemplate, getBusinessPlanTemplate } from './constants';
import { PenTool, LayoutTemplate } from 'lucide-react';

type ViewState = 'auth' | 'setup' | 'feasibility' | 'businessPlan';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('auth');
  const [context, setContext] = useState<BusinessContext>({
    projectName: '',
    projectOwner: '',
    location: '',
    sector: '',
    description: '',
    language: 'en'
  });
  
  // Store generated content to pass between stages
  const [feasibilityContent, setFeasibilityContent] = useState<FeasibilitySection[]>([]);
  
  // Flatten feasibility content into a string for AI context
  const getFeasibilitySummary = () => {
      let summary = "";
      const traverse = (secs: FeasibilitySection[]) => {
          secs.forEach(s => {
              if (s.content) {
                  // Strip HTML tags for context summary
                  const tempDiv = document.createElement("div");
                  tempDiv.innerHTML = s.content;
                  summary += `${s.title}: ${tempDiv.textContent || tempDiv.innerText || ''}\n\n`;
              }
              if (s.subsections) traverse(s.subsections);
          });
      };
      traverse(feasibilityContent);
      return summary;
  };

  const handleLogin = () => {
      setView('setup');
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (context.projectName && context.sector) {
      setView('feasibility');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContext({ ...context, [e.target.name]: e.target.value });
  };

  const handleExit = () => {
    // Return to setup immediately without confirmation
    setView('setup');
    setFeasibilityContent([]);
    setContext({
            projectName: '',
            projectOwner: '',
            location: '',
            sector: '',
            description: '',
            language: 'en'
    });
  };
  
  const handleBack = () => {
      if (view === 'businessPlan') {
          setView('feasibility');
      } else if (view === 'feasibility') {
          setView('setup');
      }
  }

  const handleSwitchToBusinessPlan = (content: FeasibilitySection[]) => {
      setFeasibilityContent(content);
      setView('businessPlan');
  }

  if (view === 'auth') {
      return <AuthScreen onLogin={handleLogin} />;
  }

  if (view === 'setup') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          
          <div className="bg-emerald-600 p-8 text-white text-center relative">
            <div className="absolute top-4 right-4">
                <select 
                    name="language" 
                    value={context.language} 
                    onChange={handleChange}
                    className="bg-emerald-700 text-white text-sm border-none rounded px-2 py-1 focus:ring-1 focus:ring-white"
                >
                    <option value="en">English</option>
                    <option value="am">አማርኛ</option>
                </select>
            </div>
            <LayoutTemplate size={48} className="mx-auto mb-4 opacity-90" />
            <h1 className="text-3xl font-bold mb-2">EthioPlan Feasibility Architect</h1>
            <p className="text-emerald-100">
              {context.language === 'am' 
                ? 'ለኢትዮጵያ ገበያ አዋጭነት ጥናት እና የንግድ ስራ እቅድ ማዘጋጃ።'
                : 'Generate professional, bank-standard feasibility studies and business plans for any business idea in the Ethiopian market.'
              }
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleStart} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                      {context.language === 'am' ? 'የፕሮጀክት ስም' : 'Project Name'}
                  </label>
                  <input 
                    type="text" 
                    name="projectName" 
                    value={context.projectName} 
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-slate-400"
                    placeholder="e.g., Unity Dairy Farm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                      {context.language === 'am' ? 'የፕሮጀክት ባለቤት' : 'Project Owner'}
                  </label>
                  <input 
                    type="text" 
                    name="projectOwner" 
                    value={context.projectOwner} 
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-slate-400"
                    placeholder="e.g., Ato Kebede"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                      {context.language === 'am' ? 'ቦታ (ወረዳ/ከተማ)' : 'Location (Woreda/City)'}
                  </label>
                  <input 
                    type="text" 
                    name="location" 
                    value={context.location} 
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-slate-400"
                    placeholder="e.g., Bishoftu, Oromia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                      {context.language === 'am' ? 'ዘርፎች' : 'Sectors'}
                  </label>
                  <select 
                    name="sector" 
                    value={context.sector} 
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  >
                    <option value="" className="text-slate-400">Select Sector...</option>
                    <option value="Agriculture & Livestock">Agriculture & Livestock</option>
                    <option value="Agro-Processing">Agro-Processing</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Service & Hospitality">Service & Hospitality</option>
                    <option value="Real Estate & Construction">Real Estate & Construction</option>
                    <option value="Technology & ICT">Technology & ICT</option>
                    <option value="Trade & Export">Trade & Export</option>
                    <option value="Transport & Logistics">Transport & Logistics</option>
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Mining & Energy">Mining & Energy</option>
                    <option value="Textile & Garment">Textile & Garment</option>
                    <option value="Tourism">Tourism</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    {context.language === 'am' ? 'የንግድ ስራው አጭር መግለጫ' : 'Brief Business Description'}
                </label>
                <textarea 
                  name="description" 
                  value={context.description} 
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-slate-400"
                  placeholder="Describe your idea. E.g., A farm fattening 50 oxen per cycle using local molasses by-products..."
                ></textarea>
                <p className="text-xs text-slate-500 mt-2">
                    {context.language === 'am' ? 'AI ጥናቱን ለማዘጋጀት ይህንን ይጠቀማል።' : 'The AI will use this to customize the study content.'}
                </p>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
                >
                  <PenTool size={20} />
                  {context.language === 'am' ? 'ጥናቱን ጀምር' : 'Start Building Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <p className="mt-6 text-slate-400 text-sm">Based on Ethiopian Development Bank standards</p>
      </div>
    );
  }

  const currentTemplate = view === 'businessPlan' 
      ? getBusinessPlanTemplate(context.language) 
      : getFeasibilityTemplate(context.language);
      
  const docTitle = view === 'businessPlan' 
      ? (context.language === 'am' ? 'የንግድ ስራ እቅድ' : 'Business Plan') 
      : (context.language === 'am' ? 'አዋጭነት ጥናት' : 'Feasibility Study');

  return (
    <TemplateBuilder 
      key={view + context.language} 
      context={context} 
      initialTemplate={currentTemplate}
      documentTitle={docTitle}
      onSwitchToBusinessPlan={view === 'feasibility' ? handleSwitchToBusinessPlan : undefined}
      onExit={handleExit}
      onBack={handleBack}
      priorContent={view === 'businessPlan' ? getFeasibilitySummary() : undefined}
    />
  );
};

export default App;
