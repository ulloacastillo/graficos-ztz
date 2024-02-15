import { MONTHS } from '@/app/constants';
import { useChartSettings } from '@/app/store/store';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function DonutChart() {
  const svgRef = useRef();
  const initialColor = useChartSettings((state) => state.initialColor);
  const endColor = useChartSettings((state) => state.endColor);
  const textColor = useChartSettings((state) => state.textColor);
  const chartConfig = useRef();
  let clickedBar = { id: null, color: null };
  const data = useSelector((state) => state.chartData);
  const width = 800;
  const height = 420;
  const radius = Math.min(width, height) / 2;

  const theme = useChartSettings((state) => state.theme);

  const dataSorted = [...data].sort((a, b) => {
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
      .domain([0, dataSorted.length - 1])
      .range([initialColor, endColor]);

    const pie = d3.pie().value((d) => d[1]);
    const arcs = pie(dataSorted);

    console.log(arcs);
    const arc = d3
      .arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    d3.arc()
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
      .style('stroke-width', '2px')
      .transition()
      .duration(1000)
      .attrTween('d', function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(interpolate(t));
        };
      });

    svg
      .selectAll('allQuantities')
      .data(arcs)
      .enter()
      .append('text')
      .attr('id', (d, i) => `mybar${i}`)
      .on('click', (e, d) => {
        const selectedBar = d3.select(e.currentTarget);
        const clickedId = selectedBar.attr('id');
        console.log(d);
        let claimsPreviousMonth;

        if (clickedId !== 'mybar0') {
          const idPrevious = parseInt(clickedId.slice(5)) - 1;
          //const previousMonth = d3.select(`#mybar${idPrevious}`);

          claimsPreviousMonth =
            arcs[parseInt(clickedId.substring(5)) - 1].data[1];
        }

        const receivedText = d3.select('#received');
        const increaseText = d3.select('#increase');
        const upOrDown = d3.select('#upOrDown');
        if (clickedBar.id === clickedId) {
          d3.select('#' + clickedBar.id)
            .attr('fill', clickedBar.color)
            .attr('stroke', clickedBar.color)
            .attr('stroke-width', 0.3);
          receivedText.html(
            `<div id="received" className="text-red-500 font-medium">0</div>`,
          );
          increaseText.html(
            `<div id="increase" className="text-red-500 font-medium">0% (+0)</div>`,
          );

          clickedBar = { id: null, color: null };
        } else {
          d3.select('#' + clickedBar.id)
            .attr('fill', clickedBar.color)
            .attr('stroke', clickedBar.color)
            .attr('stroke-width', 0.3);
          const claimsReceived = d.data[1];
          receivedText.html(
            `<div id="received" className="text-red-500 font-medium">${claimsReceived}</div>`,
          );

          const diff = parseInt(claimsReceived) - parseInt(claimsPreviousMonth);
          const rate = (diff / claimsReceived) * 100;

          if (clickedId !== 'mybar0') {
            if (diff < 0) {
              upOrDown.html('<span>Disminuyeron</span>');
              increaseText.html(
                `<div id="increase" className="text-red-500 font-medium">${
                  Math.trunc(rate * 100) / 100
                }% (${diff})</div>`,
              );
            } else {
              upOrDown.html('<span>Aumentaron</span>');
              increaseText.html(
                `<div id="increase" className="text-red-500 font-medium">${
                  Math.trunc(rate * 100) / 100
                }% (+${diff})</div>`,
              );
            }
          } else {
            increaseText.html(
              `<div id="increase" className="text-red-500 font-medium">${0}% (+${0})</div>`,
            );
          }

          clickedBar = {
            id: clickedId,
            color: d3.select(e.currentTarget).attr('fill'),
          };
        }
        if (clickedBar.id) {
          d3.select(e.currentTarget)
            .attr('fill', '#ff0000')
            .attr('stroke', '#000000')
            .attr('stroke-width', 0.5);
        }
      })
      .style('cursor', 'pointer')
      .text((d) => MONTHS[d.data[0]])
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('fill', textColor);

    dataSorted.forEach((d, i) => {
      svg
        .append('circle')
        .attr('cx', -width / 2 + 20)
        .attr('cy', i * 20 - dataSorted.length * 10)
        .attr('r', 6)
        .style('fill', colorScale(i));

      svg
        .append('text')
        .attr('x', -width / 2 + 40)
        .attr('y', i * 20 - dataSorted.length * 10)
        .text(`${MONTHS[d[0]] ?? d[0]}: ${d[1]}`)
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');
    });

    chartConfig.current = { svg };
  }, [data, theme, initialColor, endColor, textColor]);

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
