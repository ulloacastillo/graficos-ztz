import { useChartSettings, useImageStore } from '@/app/store/store';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { MONTHS } from '@/app/constants';

function DonutChart() {
  const image = useImageStore((state) => state.image);
  const svgRef = useRef();

  const useImage = useChartSettings((state) => state.useImage);
  const eventsRegister = useChartSettings((state) => state.events);
  const showImages = useChartSettings((state) => state.showImages);
  const initialColor = useChartSettings((state) => state.initialColor);
  const endColor = useChartSettings((state) => state.endColor);
  const textColor = useChartSettings((state) => state.textColor);
  const chartConfig = useRef();

  let data = useSelector((state) => state.chartData);
  const width = 800;
  const height = 420;
  const radius = Math.min(width, height) / 2;

  const theme = useChartSettings((state) => state.theme);

  data = [...data].sort((a, b) => {
    const monthA = parseInt(a[0], 10);
    const monthB = parseInt(b[0], 10);
    return monthA - monthB;
  });

  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height + 200)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const colorScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([initialColor, endColor]);

    const pie = d3.pie().value((d) => d[1]);
    const arcs = pie(data);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    svg
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colorScale(i))
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

    svg
      .selectAll('allQuantities')
      .data(arcs)
      .enter()
      .append('text')
      .text((d) => MONTHS[d.data[0]])
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('fill', 'white');

    data.forEach((d, i) => {
      svg
        .append('circle')
        .attr('cx', -width / 2 + 20)
        .attr('cy', i * 20 - data.length * 10)
        .attr('r', 6)
        .style('fill', colorScale(i));

      svg
        .append('text')
        .attr('x', -width / 2 + 40)
        .attr('y', i * 20 - data.length * 10)
        .text(`${MONTHS[d[0]] ?? d[0]}: ${d[1]}`)
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');
    });

    chartConfig.current = { svg };
  }, [
    data,
    image,
    theme,
    useImage,
    eventsRegister,
    initialColor,
    endColor,
    showImages,
    textColor,
  ]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      ref={svgRef}
      id="takeScreenshotChart"
    ></svg>
  );
}

export default DonutChart;
