import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function DonutChart() {
  //const { total, notAnswered } = claims;
  const claims = { a: 11000, b: 220 };
  const width = 400,
    height = 400,
    margin = 5;

  const radius = Math.min(width, height) / 2 - margin;

  const svgRef = useRef();

  useEffect(() => {
    const color = d3.scaleOrdinal().range(['#9f8df8', '#dddddd']);

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
      .attr('fill', (d) => color(d.data[0]))
      .attr('stroke', 'none')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      width={400}
      height={400}
      ref={svgRef}
    ></svg>
  );
}

export default DonutChart;
