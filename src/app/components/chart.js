'use client';

import { useRef, useEffect, useState } from 'react';
import ImageBar from './imageBar';
import * as d3 from 'd3';
import candleSVG from '../assets/candle.svg';
import { useSelector } from 'react-redux';


export default function Chart() {
  const svgRef = useRef();
  const data = useSelector((state) => state.chartData);


  
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  const maxData = Math.max(...data.map(item => item[1]));
  const minData = Math.min(...data.map(item => item[1]));
  const domainMax = maxData + maxData * 0.1;
  const domainMin = minData - minData * 0.1;


  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();
    // append the svg object to the body of the page
    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Parse the Data
    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d[0]))
      .padding(0.2);
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(8)')
      .attr('font-size', '8')
      .style('text-anchor', 'end');

    // Add Y axis
    const y = d3.scaleLinear().range([height, 0]).domain([domainMin, domainMax]);
    svg.append('g').call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll('mybar')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d[0]))
      .attr('y', (d) => y(d[1]))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d[1]))
      .attr('fill', '#265c2f');

    const curve = d3.line().curve(d3.curveNatural);
    // Lines
    svg
      .append('g')
      .append('path')
      .datum(data)
      .attr(
        'd',
        d3
          .line()
          .x((d) => x(d[0]) + 12)
          .y((d) => y(d[1])),
      )
      .attr('stroke', '#FF110099')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // Images
    svg
      .selectAll('image')
      .data(data)
      .join('image')
      .attr('xlink:href', (d, i) => {
        if (i % 2 === 0)
          return 'https://clipart-library.com/images/zTXoLGgyc.png';
        else
          return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Santa_hat.svg/2560px-Santa_hat.svg.png';
      })
      .attr('x', (d) => x(d[0]))
      .attr('y', (d) => y(d[1] + 90))
      .attr('width', x.bandwidth());

    svg
      .selectAll('claims')
      .data(data)
      .join('text')
      .attr('x', (d) => x(d[0]))
      .attr('y', (d) => y(d[1] + 120))
      .attr('font-size', 8)
      .attr('transform', 'translate(5)')
      .attr('font-weight', '600')
      .text((d) => d[1]);
  }, [data]);

  return <svg viewBox="0 0 460 400" ref={svgRef}></svg>;
}
