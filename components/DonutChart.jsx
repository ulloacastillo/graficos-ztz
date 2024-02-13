import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function DonutChart({ claims }) {
  const { total, notAnswered } = claims;
  const notAnsweredPercent = (notAnswered / total) * 100;

  const width = 400,
    height = 400,
    margin = 5;

  const radius = Math.min(width, height) / 2 - margin;

  const svgRef = useRef();

  useEffect(() => {
    const color = d3.scaleOrdinal().range(['#8dbaff', '#2a3a46']);

    // Compute the position of each group on the pie:
    const pie = d3.pie().value((d) => d[1]);

    const data_ready = pie(Object.entries(claims));

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    svg
      .selectAll('pieChart')
      .data(data_ready)
      .join('path')
      .attr(
        'd',
        d3
          .arc()
          .innerRadius(180) // This is the size of the donut hole
          .outerRadius(radius),
      )
      .on('mouseover', (d, i) => {
        const u = svg.selectAll('text').remove();
        svg
          .append('text')
          .text(
            i.data[0] === 'total'
              ? `${new Intl.NumberFormat('de-DE').format(total - notAnswered)}`
              : `${notAnswered}`,
          )
          .attr('text-anchor', 'middle')
          .style('font-size', '60px');
        svg
          .append('text')
          .text(
            i.data[0] === 'total'
              ? `Reclamos contestados`
              : `Reclamos sin contestar`,
          )
          .attr('text-anchor', 'middle')
          .style('font-size', '18px')
          .style('font-weight', 'normal')
          .attr('dy', '2em');
      })
      .on('mouseout', (d, i) => {
        const u = svg.selectAll('text').remove();
        svg
          .append('text')
          .text(
            `${new Intl.NumberFormat('de-DE').format(
              Math.round(notAnsweredPercent * 100) / 100,
            )}%`,
          )
          .attr('text-anchor', 'middle')
          .style('font-size', '60px');
        svg
          .append('text')
          .text(`Reclamos sin respuesta (${notAnswered})`)
          .attr('text-anchor', 'middle')
          .style('font-size', '18px')
          .style('font-weight', 'normal')
          .attr('dy', '2em');
      })
      .attr('fill', (d) => color(d.data[0]))
      .attr('stroke', 'none')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    svg
      .append('text')
      .text(
        `${new Intl.NumberFormat('de-DE').format(
          Math.round(notAnsweredPercent * 100) / 100,
        )}%`,
      )
      .attr('text-anchor', 'middle')
      .style('font-size', '60px');
    svg

      .append('text')
      .text(`Reclamos sin respuesta (${notAnswered})`)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'normal')
      .attr('dy', '2em');
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      ref={svgRef}
    ></svg>
  );
}

export default DonutChart;
