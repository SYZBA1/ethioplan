import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SwotData } from '../types';

interface SwotChartProps {
  data: SwotData;
}

const SwotChart: React.FC<SwotChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define Quadrants
    const midX = innerWidth / 2;
    const midY = innerHeight / 2;

    const quadrants = [
      { label: "STRENGTHS", x: 0, y: 0, color: "#dcfce7", text: "#166534", items: data.strengths },
      { label: "WEAKNESSES", x: midX, y: 0, color: "#fee2e2", text: "#991b1b", items: data.weaknesses },
      { label: "OPPORTUNITIES", x: 0, y: midY, color: "#dbeafe", text: "#1e40af", items: data.opportunities },
      { label: "THREATS", x: midX, y: midY, color: "#fef9c3", text: "#854d0e", items: data.threats },
    ];

    quadrants.forEach((q) => {
      // Background Rect
      g.append("rect")
        .attr("x", q.x)
        .attr("y", q.y)
        .attr("width", midX - 5)
        .attr("height", midY - 5)
        .attr("rx", 8)
        .attr("fill", q.color)
        .attr("stroke", q.text)
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 0.2);

      // Label
      g.append("text")
        .attr("x", q.x + 20)
        .attr("y", q.y + 30)
        .text(q.label)
        .attr("font-weight", "bold")
        .attr("fill", q.text)
        .style("font-size", "14px");

      // Items
      q.items.slice(0, 5).forEach((item, i) => {
         g.append("text")
          .attr("x", q.x + 20)
          .attr("y", q.y + 60 + (i * 20))
          .text(`• ${item}`)
          .attr("fill", "#334155")
          .style("font-size", "12px")
          .each(function () {
             // Simple text wrapping logic (truncation for simplicity in SVG)
             const self = d3.select(this);
             let textLength = self.node()?.getComputedTextLength() || 0;
             let text = self.text();
             while (textLength > (midX - 40) && text.length > 0) {
               text = text.slice(0, -1);
               self.text(text + "...");
               textLength = self.node()?.getComputedTextLength() || 0;
             }
          });
      });
    });

  }, [data]);

  return (
    <div className="flex justify-center p-4 bg-white rounded-lg border border-slate-200 shadow-sm mt-4">
      <svg ref={svgRef} width={600} height={400} className="w-full h-auto max-w-[600px]"></svg>
    </div>
  );
};

export default SwotChart;
