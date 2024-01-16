'use client';

import { useRef, useEffect, useState } from 'react';
import { useImageStore, useChartSettings } from '@/app/store/store';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

function Chart() {
  const months = {
    '01': 'ENE',
    '02': 'FEB',
    '03': 'MAR',
    '04': 'ABR',
    '05': 'MAY',
    '06': 'JUN',
    '07': 'JUL',
    '08': 'AGO',
    '09': 'SEP',
    10: 'OCT',
    11: 'NOV',
    12: 'DEC',
  };

  const COLORS = {
    default: ['#9f8df8', 'blue'],
    Navidad: ['#f00', '#009900'],
    Halloween: ['#FF8800', '#000'], //#5E1A9E
  };

  const IMAGES = {
    default: ['/tela.png', '/ghosts.png', '/pumkin.png'],
    Halloween: ['/tela.png', '/ghosts.png', '/pumkin.png'],
    Navidad: ['/esfera1.png', '/esfera2.png', '/cinta.png'],
  };

  const image = useImageStore((state) => state.image);
  const svgRef = useRef();
  const [icons, setIcons] = useState([]);
  const useImage = useChartSettings((state) => state.useImage);

  const data = useSelector((state) => state.chartData);
  const headers = useSelector((state) => state.chartHeaders);
  console.log(data);
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

  const maxData = Math.max(...data.map((item) => item[1]));
  const theme = useChartSettings((state) => state.theme);

  useEffect(() => {
    const myColor = d3
      .scaleLinear()
      .domain([1, data.length])
      .range(COLORS[theme]);

    setIcons(new Array(data.length));

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
      .padding(0.1);
    // svg
    //   .append('g')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(d3.axisBottom(x))
    //   .selectAll('text')
    //   .attr('transform', 'translate(-10,-10)rotate(-45)')
    //   .style('text-anchor', 'end')
    //   .style('font-size', '20px')
    //   .style('font-weight', 'bold');

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

    if (theme === 'Navidad') {
      svg
        .append('g')
        .selectAll('triangle')
        .data(data)
        .join('path')
        .attr('class', 'line')
        .attr('d', (d) => {
          console.log(height, y(d[1]));
          return `M 0 ${height} L ${x.bandwidth()} ${height} L ${
            x.bandwidth() / 2
          } ${y(d[1])}`;
        })
        .attr('stroke', 'none')
        .attr('stroke-width', 1)
        .attr('fill', (d, i) => myColor(i))
        .attr('transform', (d) => `translate(${x(d[0])}, 0)`);
    } else if (theme === 'Halloween' && useImage) {
    } else {
      svg
        .selectAll('mybar')
        .data(data)
        .join('rect')
        .attr('x', (d) => x(d[0]))
        .attr('y', height)
        .attr('ry', 5)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .attr('fill', (d, i) => {
          console.log(myColor(i));
          return myColor(i);
        })
        .transition()
        .duration(800)
        .delay((d, i) => i * 200)
        .attr('y', (d) => y(d[1]))
        .attr('height', (d) => height - y(d[1]));
    }
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
          .y((d) => y(d[1]) + x.bandwidth() / 5),
      )
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .attr('fill', 'none');

    const u = svg.selectAll('uploadImage').data(data);

    u.remove();

    if (image[0] && useImage) {
      u.join('image')
        .attr('xlink:href', (d, i) => image[0].src)
        .attr('x', (d) => x(d[0]))
        .attr('y', (d) => y(d[1]) - x.bandwidth())
        .attr('width', x.bandwidth());
    }
    svg
      .selectAll('base')
      .data(data)
      .join('image')
      .attr('href', '/svg-path.svg')
      .attr('x', (d) => x(d[0]) - x.bandwidth() * 0.025)
      .attr('y', (d) => y.range()[0] - x.bandwidth() * 0.2)
      .attr('width', x.bandwidth() * 1.05);

    svg
      .selectAll('months')
      .data(data)
      .join('text')
      .text((d) => {
        const [year, month, day] = d[0].split('-');
        return `${months[month]}`;
      })
      .attr('x', (d) => x(d[0]) + x.bandwidth() / 2)
      .attr('y', (d) => y.range()[0] + x.bandwidth() / 4)
      .attr('fill', (d, i) => myColor(i))
      .attr('font-size', 8)
      .attr('font-weight', '600')
      .style('text-anchor', 'middle');

    svg
      .selectAll('years')
      .data(data)
      .join('text')
      .text((d) => {
        const [year, month, day] = d[0].split('-');
        return `${year}`;
      })
      .attr('x', (d) => x(d[0]) + x.bandwidth() / 2)
      .attr('y', (d) => y.range()[0] + x.bandwidth() / 2)
      .attr('fill', (d, i) => myColor(i))
      .attr('font-size', 8)
      .attr('font-weight', '600')
      .style('text-anchor', 'middle');
    svg
      .selectAll('claims')
      .data(data)
      .join('text')
      .text((d) => d[1])
      .attr('x', (d) => x(d[0]) + x.bandwidth() / 2)
      .attr('y', (d) => y(d[1]) - x.bandwidth() / 3.05)
      .attr('font-size', 12)
      .attr('font-weight', '600')
      .attr('fill', (d, i) => '#9B31C7')
      .attr('text-anchor', 'middle')
      .style('text-anchor', 'middle');

    if (theme !== 'default') {
      svg
        .selectAll('image1')
        .data(data)
        .join('image')
        .attr(
          'href',
          (d, i) =>
            IMAGES[theme][Math.floor(Math.random() * IMAGES[theme].length)],
        )
        .attr('x', (d) => x(d[0]))
        .attr('y', (d) => y(d[1]) + x.bandwidth() / 5)
        .attr('width', x.bandwidth());
    }
  }, [data, image, theme, useImage]);

  return <svg viewBox="0 0 800 420" ref={svgRef}></svg>;
}

export default Chart;
