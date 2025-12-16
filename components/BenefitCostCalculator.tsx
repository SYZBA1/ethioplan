import React, { useState } from 'react';
import { Calculator, PlusCircle } from 'lucide-react';

interface Props {
  onInsert: (text: string) => void;
  language: 'en' | 'am';
}

const BenefitCostCalculator: React.FC<Props> = ({ onInsert, language }) => {
  const [benefits, setBenefits] = useState<string>('');
  const [costs, setCosts] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const b = parseFloat(benefits);
    const c = parseFloat(costs);
    if (!isNaN(b) && !isNaN(c) && c !== 0) {
      const ratio = b / c;
      setResult(ratio);
    } else {
        setResult(null);
    }
  };

  const handleInsert = () => {
    if (result === null) return;
    
    const interpretation = result > 1 
        ? (language === 'am' ? 'ፕሮጀክቱ አዋጭ ነው (ከ 1 ይበልጣል)።' : 'The project is financially viable (Ratio > 1).')
        : (language === 'am' ? 'ፕሮጀክቱ አዋጭ ላይሆን ይችላል (ከ 1 ያንሳል)።' : 'The project may not be financially viable (Ratio < 1).');

    const text = language === 'am' 
      ? `\n\n**የጥቅም-ወጪ ጥምርታ (Benefit-Cost Ratio) ስሌት**:\n` +
        `- ጠቅላላ የተጣራ ጥቅም (Total Discounted Benefits): ${benefits} ብር\n` +
        `- ጠቅላላ የተጣራ ወጪ (Total Discounted Costs): ${costs} ብር\n` +
        `- ጥቅም-ወጪ ጥምርታ (BCR): **${result.toFixed(2)}**\n` +
        `- ውሳኔ: ${interpretation}\n`
      : `\n\n**Benefit-Cost Ratio (BCR) Calculation**:\n` +
        `- Total Discounted Benefits: ETB ${benefits}\n` +
        `- Total Discounted Costs: ETB ${costs}\n` +
        `- Calculated BCR: **${result.toFixed(2)}**\n` +
        `- Conclusion: ${interpretation}\n`;

    onInsert(text);
    setBenefits('');
    setCosts('');
    setResult(null);
  };

  const labels = language === 'am' ? {
    title: 'የጥቅም-ወጪ ጥምርታ ማስያ',
    benefits: 'ጠቅላላ የተጣራ ጥቅም (PV of Benefits)',
    costs: 'ጠቅላላ የተጣራ ወጪ (PV of Costs)',
    calc: 'አስላ',
    insert: 'ወደ ጥናቱ አስገባ',
    result: 'ውጤት (BCR)'
  } : {
    title: 'Benefit-Cost Ratio Calculator',
    benefits: 'Total Discounted Benefits (PV)',
    costs: 'Total Discounted Costs (PV)',
    calc: 'Calculate',
    insert: 'Insert into Document',
    result: 'Result (BCR)'
  };

  return (
    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
      <h3 className="text-sm font-semibold text-emerald-800 flex items-center gap-2 mb-3">
        <Calculator size={16} />
        {labels.title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div>
            <label className="block text-xs text-emerald-700 mb-1">{labels.benefits}</label>
            <input 
                type="number" 
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-emerald-200 rounded focus:outline-none focus:border-emerald-500"
                placeholder="0.00"
            />
        </div>
        <div>
            <label className="block text-xs text-emerald-700 mb-1">{labels.costs}</label>
            <input 
                type="number" 
                value={costs}
                onChange={(e) => setCosts(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-emerald-200 rounded focus:outline-none focus:border-emerald-500"
                placeholder="0.00"
            />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button 
            onClick={calculate}
            className="px-3 py-1 bg-white border border-emerald-300 text-emerald-700 text-xs rounded hover:bg-emerald-100 transition-colors"
        >
            {labels.calc}
        </button>

        {result !== null && (
            <div className="flex items-center gap-4">
                <span className="font-bold text-emerald-900">{labels.result}: {result.toFixed(2)}</span>
                <button 
                    onClick={handleInsert}
                    className="flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700 transition-colors shadow-sm"
                >
                    <PlusCircle size={14} />
                    {labels.insert}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default BenefitCostCalculator;
