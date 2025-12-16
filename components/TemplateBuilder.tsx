import React, { useState, useEffect, useRef } from 'react';
import { BusinessContext, FeasibilitySection, SwotData } from '../types';
import { generateSectionContent, generateSWOT } from '../services/geminiService';
import { 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Download,
  Menu,
  X,
  ArrowRight,
  LogOut,
  ArrowLeft,
  Upload,
} from 'lucide-react';
import SwotChart from './SwotChart';
import BenefitCostCalculator from './BenefitCostCalculator';

interface Props {
  context: BusinessContext;
  initialTemplate: FeasibilitySection[];
  documentTitle: string;
  onSwitchToBusinessPlan?: (currentContent: FeasibilitySection[]) => void;
  onExit: () => void;
  onBack: () => void;
  priorContent?: string;
}

// Internal component for Rich Text Editing
const ContentEditor = ({ html, onChange, placeholder, disabled }: { html: string, onChange: (html: string) => void, placeholder: string, disabled: boolean }) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only update innerHTML if it is substantially different to avoid cursor jumping
    if (contentEditableRef.current && contentEditableRef.current.innerHTML !== html) {
      contentEditableRef.current.innerHTML = html;
    }
  }, [html]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    onChange(e.currentTarget.innerHTML);
  };

  return (
    <div
      ref={contentEditableRef}
      className="w-full h-full min-h-[400px] outline-none text-slate-700 leading-relaxed p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all overflow-y-auto"
      contentEditable={!disabled}
      onInput={handleInput}
      suppressContentEditableWarning={true}
      data-placeholder={placeholder}
      style={{ 
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}
    />
  );
};

const TemplateBuilder: React.FC<Props> = ({ 
  context, 
  initialTemplate, 
  documentTitle,
  onSwitchToBusinessPlan,
  onExit,
  onBack,
  priorContent
}) => {
  const [sections, setSections] = useState<FeasibilitySection[]>(initialTemplate);
  const [activeSectionId, setActiveSectionId] = useState<string>(initialTemplate[0]?.id || '');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [swotData, setSwotData] = useState<SwotData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const findSection = (id: string, list: FeasibilitySection[]): FeasibilitySection | undefined => {
    for (const sec of list) {
      if (sec.id === id) return sec;
      if (sec.subsections) {
        const found = findSection(id, sec.subsections);
        if (found) return found;
      }
    }
    return undefined;
  };

  const activeSection = findSection(activeSectionId, sections);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const updateSectionContent = (id: string, newContent: string) => {
    const updateRecursive = (list: FeasibilitySection[]): FeasibilitySection[] => {
      return list.map(sec => {
        if (sec.id === id) {
          return { ...sec, content: newContent };
        }
        if (sec.subsections) {
          return { ...sec, subsections: updateRecursive(sec.subsections) };
        }
        return sec;
      });
    };
    setSections(updateRecursive(sections));
  };

  const formatAiTextToHtml = (text: string) => {
    // Simple conversion from basic markdown-ish text to HTML
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\n/g, '<br/>'); // Newlines
  };

  const handleAiGenerate = async () => {
    if (!activeSection) return;
    setLoading(true);

    if (activeSection.id === '3.10') {
        const swotJsonStr = await generateSWOT(context);
        try {
            const parsed = JSON.parse(swotJsonStr);
            setSwotData(parsed);
            
            let textContent = (context.language === 'am' ? "<b>ጥንካሬዎች:</b><br/>" : "<b>STRENGTHS:</b><br/>") + parsed.strengths.map((s: string) => `- ${s}`).join('<br/>');
            textContent += (context.language === 'am' ? "<br/><br/><b>ድክመቶች:</b><br/>" : "<br/><br/><b>WEAKNESSES:</b><br/>") + parsed.weaknesses.map((s: string) => `- ${s}`).join('<br/>');
            textContent += (context.language === 'am' ? "<br/><br/><b>እድሎች:</b><br/>" : "<br/><br/><b>OPPORTUNITIES:</b><br/>") + parsed.opportunities.map((s: string) => `- ${s}`).join('<br/>');
            textContent += (context.language === 'am' ? "<br/><br/><b>ስጋቶች:</b><br/>" : "<br/><br/><b>THREATS:</b><br/>") + parsed.threats.map((s: string) => `- ${s}`).join('<br/>');
            
            updateSectionContent(activeSection.id, textContent);
        } catch (e) {
            console.error("Failed to parse SWOT", e);
            updateSectionContent(activeSection.id, "Error generating SWOT visualization.");
        }
    } else {
        const content = await generateSectionContent(activeSection.title, activeSection.description, context, priorContent);
        // Format the raw text from AI into basic HTML
        const htmlContent = formatAiTextToHtml(content);
        updateSectionContent(activeSection.id, htmlContent);
    }
    setLoading(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeSection) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const result = event.target?.result as string;
        
        if (file.type.startsWith('image/')) {
            // Insert Image Tag
            const imgTag = `<br/><img src="${result}" alt="${file.name}" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" /><br/>`;
            updateSectionContent(activeSection.id, (activeSection.content || '') + imgTag);
        } else {
            // Insert File Placeholder for non-images
            const attachmentLabel = context.language === 'am' ? 'የተያያዘ ፋይል' : 'Attached File';
            const placeholder = `<br/><div style="padding: 8px; background: #f1f5f9; border-radius: 4px; display: inline-flex; align-items: center; gap: 8px; font-size: 0.9em; color: #475569; border: 1px solid #cbd5e1;"><span>📎</span> <strong>${attachmentLabel}:</strong> ${file.name}</div><br/>`;
            updateSectionContent(activeSection.id, (activeSection.content || '') + placeholder);
        }
        
        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  const stripHtml = (html: string) => {
     const tmp = document.createElement("DIV");
     tmp.innerHTML = html;
     return tmp.textContent || tmp.innerText || "";
  };

  const exportToText = () => {
    let fullText = `${documentTitle.toUpperCase()}: ${context.projectName.toUpperCase()}\n\n`;
    
    const printRecursive = (list: FeasibilitySection[], indent = 0) => {
        list.forEach(sec => {
            fullText += `${'  '.repeat(indent)}${sec.title}\n`;
            if (sec.content) fullText += `${stripHtml(sec.content)}\n\n`;
            else fullText += `\n\n`;
            
            if (sec.subsections) printRecursive(sec.subsections, indent + 1);
        });
    };
    
    printRecursive(sections);
    
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${context.projectName.replace(/\s+/g, '_')}_${documentTitle.replace(/\s+/g, '_')}.txt`;
    a.click();
  };

  const renderSidebarItem = (item: FeasibilitySection, depth = 0) => {
    const hasSubs = item.subsections && item.subsections.length > 0;
    const isExpanded = expandedSections.has(item.id);
    const isActive = activeSectionId === item.id;

    return (
      <div key={item.id} className="select-none">
        <div 
          className={`
            flex items-center py-2 px-3 cursor-pointer text-sm transition-colors border-l-2
            ${isActive ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium' : 'border-transparent text-slate-600 hover:bg-slate-50'}
            ${depth > 0 ? 'pl-6' : ''}
          `}
          onClick={() => setActiveSectionId(item.id)}
        >
          {hasSubs && (
            <button 
              onClick={(e) => toggleExpand(item.id, e)}
              className="mr-2 p-0.5 hover:bg-slate-200 rounded"
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
          {!hasSubs && <span className="w-6 inline-block"></span>}
          <span className="truncate">{item.title}</span>
        </div>
        {hasSubs && isExpanded && (
          <div>
            {item.subsections!.map(sub => renderSidebarItem(sub, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <div className={`fixed inset-0 bg-black/50 z-20 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setIsSidebarOpen(false)}></div>
      
      <aside 
        className={`
          fixed lg:relative z-30 w-72 h-full bg-white border-r border-slate-200 shadow-xl lg:shadow-none transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 bg-white">
          <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm truncate">
            <FileText className="text-emerald-600 flex-shrink-0" size={20} />
            {documentTitle}
          </h2>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pb-4">
          {sections.map(sec => renderSidebarItem(sec))}
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50">
            <button 
                onClick={onBack}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
            >
                <ArrowLeft size={16} />
                <span>{context.language === 'am' ? 'ተመለስ' : 'Back'}</span>
            </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full w-full relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
             <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-800">
               <Menu size={24} />
             </button>
             <div>
                <h1 className="text-lg font-bold text-slate-900 truncate max-w-[150px] md:max-w-xs">{context.projectName}</h1>
                <p className="text-xs text-slate-500 hidden sm:block">{documentTitle} {context.language === 'am' ? '(ረቂቅ)' : 'Draft'}</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             {onSwitchToBusinessPlan && (
                <button 
                  onClick={() => onSwitchToBusinessPlan(sections)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <span className="hidden sm:inline">{context.language === 'am' ? 'የንግድ ስራ እቅድ ፍጠር' : 'Create Business Plan'}</span>
                  <span className="sm:hidden">Plan</span>
                  <ArrowRight size={16} />
                </button>
             )}
            <button 
                onClick={exportToText}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Download size={16} />
              <span className="hidden sm:inline">{context.language === 'am' ? 'ላክ' : 'Export'}</span>
            </button>
            <button 
                onClick={onExit}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
                title="Exit"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">{context.language === 'am' ? 'ውጣ' : 'Exit'}</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 min-h-[500px] flex flex-col">
            
            {activeSection ? (
              <>
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-slate-800">{activeSection.title}</h2>
                    <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">ID: {activeSection.id}</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{activeSection.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <button 
                        onClick={handleAiGenerate}
                        disabled={loading}
                        className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-sm"
                    >
                        {loading ? (
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        ) : (
                            <Sparkles size={16} />
                        )}
                        {context.language === 'am' ? 'በ AI አፍልቅ' : 'Generate with AI'}
                    </button>

                    <div className="h-6 w-px bg-slate-300 mx-1"></div>

                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept=".doc,.docx,.pdf,image/*"
                        onChange={handleFileUpload}
                    />

                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50 transition-colors shadow-sm"
                        title="Import Doc, PDF, or Image"
                    >
                        <Upload size={16} />
                        <span className="hidden sm:inline">{context.language === 'am' ? 'ፋይል አስገባ' : 'Import Media'}</span>
                    </button>
                    <span className="text-xs text-slate-400 hidden sm:inline">(Doc, PDF, Image)</span>
                  </div>
                </div>

                <div className="flex-1 p-6">
                    {/* SWOT Visualization */}
                    {activeSection.id === '3.10' && swotData && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">SWOT Visualization</h3>
                            <SwotChart data={swotData} />
                            <div className="my-6 border-t border-slate-100"></div>
                        </div>
                    )}
                    
                    {/* Benefit-Cost Ratio Calculator */}
                    {activeSection.id === '10.2.7' && (
                        <BenefitCostCalculator 
                            language={context.language} 
                            onInsert={(text) => {
                                // Convert plain text insert to HTML safe insert
                                const htmlText = text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                                updateSectionContent(activeSection.id, (activeSection.content || '') + htmlText);
                            }}
                        />
                    )}
                    
                    <ContentEditor
                        html={activeSection.content || ''}
                        onChange={(newContent) => updateSectionContent(activeSection.id, newContent)}
                        placeholder={context.language === 'am' ? `እዚህ መጻፍ ይጀምሩ...` : `Start writing the ${activeSection.title} here...`}
                        disabled={loading}
                    />
                </div>
              </>
            ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                    Select a section from the sidebar
                </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateBuilder;
