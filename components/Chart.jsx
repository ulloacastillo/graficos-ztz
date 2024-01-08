'use client';

import { useRef, useEffect, useState } from 'react';
import { useImageStore } from '@/app/store/image';
import * as d3 from 'd3';
import boxPng from '../src/app/assets/box.png';
import { useSelector } from 'react-redux';

function Chart() {
  const image = useImageStore((state) => state.image);
  const svgRef = useRef();
  const data = useSelector((state) => state.chartData);
  const headers = useSelector((state) => state.chartHeaders);

  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  const maxData = Math.max(...data.map(item => item[1]));
  const minData = Math.min(...data.map(item => item[1]));
  const domainMax = maxData + maxData * 0.1;
  const domainMin = minData - minData * 0.1;

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();
    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().range([0, width]).domain(data.map((d) => d[0])).padding(0.2);
    svg.append('g')
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d[0]))
      .padding(0.2);

    svg
      .selectAll('box')
      .data(data)
      .join('image')
      .attr('x', (d) => x(d[0]))
      .attr('y', height)
      .attr('xlink:href', 'https://pngimg.com/d/gift_PNG100322.png')
      .attr('width', x.bandwidth());

    // X axis

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(8)')
      .attr('font-size', '8')
      .style('text-anchor', 'end');

    svg.append("text")
      .attr("transform", `translate(${width / 2} ,${height + margin.top + 20})`)
      .style("text-anchor", "middle")
      .text(headers[0]);

    const y = d3.scaleLinear().range([height, 0]).domain([domainMin, domainMax]);
    svg.append('g').call(d3.axisLeft(y));

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(headers[1]); 

    svg.selectAll('mybar')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d[0]))
      .attr('y', (d) => y(d[1]))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d[1]))
      .attr('fill', '#265c2f');

    // Lines
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
      .attr('font-size', 8)
      .attr('font-weight', '600')
      .text((d) => d[1]);
  }, [data, headers]);

  useEffect(() => {
    const { svg, x, y } = chartConfig.current;
    // Images

    const u = svg.selectAll('image').data(data);
    const bars = svg.selectAll('rect').data(data);
    bars.remove();
    

    u.exit().remove();
  }, [image]);

  return <svg viewBox="0 0 800 420" ref={svgRef}></svg>;
}

export default Chart;
