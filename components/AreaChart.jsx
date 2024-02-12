import { MONTHS } from '@/app/constants';
import { useChartSettings, useImageStore } from '@/app/store/store';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function AreaChart() {
  const image = useImageStore((state) => state.image);
  const svgRef = useRef();

  const useImage = useChartSettings((state) => state.useImage);
  const eventsRegister = useChartSettings((state) => state.events);
  const showImages = useChartSettings((state) => state.showImages);
  const filterType = useChartSettings((state) => state.filterType);
  const initialColor = useChartSettings((state) => state.initialColor);
  const endColor = useChartSettings((state) => state.endColor);
  const textColor = useChartSettings((state) => state.textColor);
  const chartConfig = useRef();

  const data = useSelector((state) => state.chartData);

  const margin = { top: 80, right: 30, bottom: 70, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

  const maxData = Math.max(...data.map((item) => item[1]));
  const theme = useChartSettings((state) => state.theme);

  useEffect(() => {
    const myColor = d3
      .scaleLinear()
      .domain([1, data.length])
      .range([initialColor, endColor]);

    const parsedData = data.map((item) => [new Date(item[0]), item[1]]);
    parsedData.sort((a, b) => a[0] - b[0]);
    const sortedData = parsedData.map((item) => [
      item[0].toLocaleDateString('es-CL'),
      item[1],
    ]);

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d[0]))
      .padding(0.12);

    const y = d3.scaleLinear().range([height, 0]).domain([0, maxData]);

    const areaGradient = svg
      .append('linearGradient')
      .attr('id', 'areaGradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', y(0))
      .attr('x2', 0)
      .attr('y2', y(maxData))
      .selectAll('stop')
      .data([
        { offset: '0%', color: initialColor },
        { offset: '100%', color: endColor },
      ])
      .enter()
      .append('stop')
      .attr('offset', function (d) {
        return d.offset;
      })
      .attr('stop-color', function (d) {
        return d.color;
      });

    const area = d3
      .area()
      .x((d) => x(d[0]) + x.bandwidth() / 2)
      .y0(height)
      .y1((d) => y(d[1]));

    svg
      .append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', area)
      .attr('fill', 'url(#areaGradient)')
      .style('opacity', 0.5);

    svg
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .attr(
        'd',
        d3
          .line()
          .x((d) => x(d[0]) + x.bandwidth() / 2)
          .y((d) => y(d[1])),
      )
      .style('stroke', 'url(#areaGradient)')
      .style('stroke-width', 2)
      .style('fill', 'none');

    svg.append('g').call(d3.axisLeft(y));

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Reclamos');

    svg
      .selectAll('monthText')
      .data(data)
      .join('text')
      .text((d) => {
        if (filterType === 'Mes') {
          return MONTHS[d[0]] ?? d[0];
        }
        return `${d[0]}`;
      })
      .attr('x', (d) => x(d[0]) + x.bandwidth() / 2)
      .attr('y', height + margin.bottom / 2)
      .attr('fill', (d, i) => {
        if (theme === 'Cyber') return '000';
        return myColor(i);
      })
      .attr('font-size', 8)
      .attr('font-weight', '600')
      .style('text-anchor', 'middle');

    svg
      .selectAll('dataValues')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d[1])
      .attr('x', (d) => x(d[0]) + x.bandwidth() / 2)
      .attr('y', (d) => y(d[1]) - 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('fill', textColor);

    chartConfig.current = { svg, x, y };
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
      viewBox="0 0 800 420"
      ref={svgRef}
      id="takeScreenshotChart"
    ></svg>
  );
}

export default AreaChart;
