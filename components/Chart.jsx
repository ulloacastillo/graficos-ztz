'use client';

import { useRef, useEffect, useState } from 'react';
import { useImageStore } from '@/app/store/image';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

function Chart() {
  const image = useImageStore((state) => state.image);
  const svgRef = useRef();
  const chartConfig = useRef();

  const data = useSelector((state) => state.chartData);
  const headers = useSelector((state) => state.chartHeaders);
  console.log(data);
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

  const maxData = Math.max(...data.map((item) => item[1]));
  const minData = Math.min(...data.map((item) => item[1]));
  const domainMax = maxData + maxData * 0.1;
  const domainMin = minData - minData * 0.1;

  useEffect(() => {
    const parsedData = data.map((item) => [new Date(item[0]), item[1]]);
    parsedData.sort((a, b) => a[0] - b[0]);
    const sortedData = parsedData.map((item) => [
      item[0].toLocaleDateString('es-CL'),
      item[1],
    ]);

    d3.select(svgRef.current).selectAll('*').remove();
    // append the svg object to the body of the page
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
      .padding(0.2);

    // X axis

    // svg
    //   .append('g')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(d3.axisBottom(x))
    //   .selectAll('text')
    //   .attr('transform', 'translate(-10,-10)rotate(-45)')
    //   .style('text-anchor', 'end');

    // X axis

    // Add Y axis
    const y = d3.scaleLinear().range([height, 0]).domain([0, maxData]);
    svg.append('g').call(d3.axisLeft(y));
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(headers[1]);
    // Bars
    svg
      .selectAll('mybar')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d[0]))
      .attr('y', height)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', '#265c2f')
      .transition()
      .duration(800)
      .delay((d, i) => i * 200)
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => height - y(d[1]))
      .style('stroke-width', '5');

    svg
      .append('g')
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .style('stroke-dasharray', '3, 3')
      .attr(
        'd',
        d3
          .line()
          .x((d) => x(d[0]) + x.bandwidth() / 2)
          .y((d) => y(d[1])),
      )
      .attr('stroke', '#FF110099')
      .attr('stroke-width', 1)
      .attr('fill', 'none');

    svg
      .selectAll('claims')
      .data(data)
      .join('text')
      .text((d) => d[1])
      .attr('x', (d) => x(d[0]) + x.bandwidth() / 2)
      .attr('y', (d) => y(d[1] + 20))
      .attr('font-size', 10)
      .attr('font-weight', '600')
      .attr('fill', 'red')
      .attr('text-anchor', 'middle')
      .style('text-anchor', 'middle');

    svg
      .selectAll('base')
      .data(data)
      .join('image')
      .attr('href', '/svg-path.svg')
      .style('fill', 'red')
      .attr('x', (d) => x(d[0]))
      .attr('y', height - x.bandwidth() / 3)
      .attr('width', x.bandwidth() * 1.2);

    chartConfig.current = { svg, x, y };
  }, [data]);

  useEffect(() => {
    const { svg, x, y } = chartConfig.current;
    // Images

    const u = svg.selectAll('image').data(data);
    const bars = svg.selectAll('rect').data(data);
    bars.remove();

    if (image[0]) {
      u.join('image')
        .attr('xlink:href', (d, i) => image[0].src)
        .attr('x', (d) => x(d[0]))
        .attr('y', (d) => y(d[1]))
        .attr('width', x.bandwidth())
        .attr('height', (d, i) => height - y(d[1]))
        .attr('preserveAspectRatio', 'none');
    }
  }, [image]);

  return <svg viewBox="0 0 800 420" ref={svgRef}></svg>;
}

export default Chart;
