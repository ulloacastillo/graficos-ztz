'use client';

import { useRef, useEffect } from 'react';
import { useImageStore, useChartSettings } from '@/app/store/store';
import { useSelector } from 'react-redux';
import { MONTHS } from '@/app/constants';
import * as d3 from 'd3';

function Chart() {
  const image = useImageStore((state) => state.image);
  const svgRef = useRef();

  const useImage = useChartSettings((state) => state.useImage);
  const eventsRegister = useChartSettings((state) => state.events);
  const showImages = useChartSettings((state) => state.showImages);
  const filterType = useChartSettings((state) => state.filterType);
  const initialColor = useChartSettings((state) => state.initialColor);
  const endColor = useChartSettings((state) => state.endColor);
  const selectedYear = useChartSettings((state) => state.selectedYear);

  const textColor = useChartSettings((state) => state.textColor);
  const chartConfig = useRef();

  let clickedBar = { id: null, color: null };
  const data = useSelector((state) => state.chartData);

  const margin = { top: 80, right: 30, bottom: 70, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

  const maxData = Math.max(...data.map((item) => item[1]));
  const theme = useChartSettings((state) => state.theme);

  useEffect(() => {
    const title = d3.select('#legendTitle');
    title.html(
      `<h2 id="legendTitle">Resumen ${
        selectedYear === 'Todos' ? '' : selectedYear
      }</h2>`,
    );
    const myColor = d3
      .scaleLinear()
      .domain([1, data.length])
      .range([initialColor, endColor]);

    const parsedData = data.map((item) => [new Date(item[0]), item[1]]);
    parsedData.sort((a, b) => a[0] - b[0]);

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

    const showImageUpload = (xOffSet, yOffSet) => {
      const u = svg.selectAll('uploadImage').data(data);
      u.remove();

      if (image[0] && useImage) {
        u.join('image')
          .attr('href', (d, i) => {
            return image[0].src;
          })
          .attr('x', (d) => x(d[0]) + x.bandwidth() / xOffSet)
          .attr('y', (d) => y(d[1]) - x.bandwidth() / yOffSet)
          .attr('width', (d, i) => (showImages[i] ? x.bandwidth() * 0.8 : 0));
      }
    };
    const drawLineChart = (
      strokeDashArr,
      xOffSet,
      yOffSet,
      stroke,
      width,
      fill,
    ) => {
      return svg
        .append('g')
        .append('path')
        .datum(data)
        .attr('class', 'line')
        .style('stroke-dasharray', strokeDashArr)
        .attr(
          'd',
          d3
            .line()
            .x((d) => x(d[0]) + x.bandwidth() / xOffSet)
            .y((d) => y(d[1]) + x.bandwidth() / yOffSet),
        )
        .attr('stroke', stroke)
        .attr('stroke-width', width)
        .attr('fill', fill);
    };

    if (data.length < 5) {
      x.padding(0.5);
    }
    const ROTATE_HANGERS_ANGLE = data.map(
      (el) => Math.random() * (10 + 10) - 10,
    );
    const y = d3.scaleLinear().range([height, 0]).domain([0, maxData]);

    svg.append('g').call(d3.axisLeft(y));

    // Nombre del eje Y
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Reclamos');

    if (theme === 'Navidad') {
      svg
        .selectAll('triangle1')
        .data(data)
        .join('path')
        .attr('class', 'line')
        .attr('d', (d) => {
          return `M 0 ${height} L ${x.bandwidth() / 2} ${height} L ${
            x.bandwidth() / 2
          } ${y(d[1])}`;
        })
        .attr('stroke', 'none')
        .attr('stroke-width', 1)
        .attr('fill', (d, i) => myColor(i))
        .transition()
        .duration(800)
        .delay((d, i) => i * 200)
        .attr('transform', (d) => `translate(${x(d[0])}, 0)`);

      svg
        .selectAll('triangle2')
        .data(data)
        .join('path')
        .attr('class', 'line')
        .attr('d', (d) => {
          return `M ${x.bandwidth()} ${height} L ${
            x.bandwidth() / 2
          } ${height} L ${x.bandwidth() / 2} ${y(d[1])}`;
        })
        .attr('stroke', 'none')
        .attr('stroke-width', 1)
        .attr('fill', (d, i) => myColor(i + 1))
        .transition()
        .duration(800)
        .delay((d, i) => i * 200)
        .attr('transform', (d) => `translate(${x(d[0]) - 1}, 0)`);

      showImageUpload(10, 1.5);
    } else if (theme === 'Cyber') {
      const path = drawLineChart(null, 2, 3, '#dddddd', 4, 'none');

      let totalLength = path.node().getTotalLength();

      path
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(2500)
        .ease(d3.easeSin)
        .attr('stroke-dashoffset', 0);
      svg
        .append('g')
        .selectAll('circleCyber')
        .data(data)
        .join('path')
        .attr('d', (d) => {
          return `M 0 0 A 1 1 0 0 0 ${x.bandwidth() / 3} 0 A 1 1 0 0 0 0 0 M ${
            x.bandwidth() / 15
          } 0 A 1 1 0 1 1 ${
            x.bandwidth() / 3 - x.bandwidth() / 15
          } 0 A 1 1 0 0 1 ${x.bandwidth() / 15} 0`;
        })
        .attr('stroke', '#454546')
        .attr('stroke-width', 1)
        .transition()
        .delay((d, i) => i * 200)
        .attr('fill', (d, i) => '#ddd')
        .attr(
          'transform',
          (d) =>
            `translate(${x(d[0]) + x.bandwidth() / 3}, ${
              y(d[1]) + x.bandwidth() / 3
            })`,
        );
      svg
        .append('g')
        .selectAll('hanger')
        .data(data)
        .enter()
        .append('image')
        .attr('href', (d, i) => {
          return '/hanger.webp';
        })
        .attr('x', (d) => x(d[0]))
        .attr('y', (d) => y(d[1]) + x.bandwidth() / 3.5)
        .attr('width', (d, i) => x.bandwidth())
        .attr(
          'transform',
          (d, i) =>
            `rotate(${ROTATE_HANGERS_ANGLE[i]}, ${x(d[0])}, ${
              y(d[1]) + x.bandwidth() / 3.5
            })`,
        );

      const u = svg.selectAll('uploadImage').data(data);
      u.remove();

      if (image[0] && useImage) {
        svg
          .append('g')
          .selectAll('bag')
          .data(data)
          .enter()
          .append('image')
          .attr('href', (d, i) => {
            return image[0].src;
          })
          .attr('x', (d) => x(d[0]) + x.bandwidth() * 0.1)
          .attr('y', (d) => y(d[1]) + x.bandwidth() / 1.75)
          .attr('width', (d, i) => x.bandwidth() * 0.8)
          .attr(
            'transform',
            (d, i) =>
              `rotate(${ROTATE_HANGERS_ANGLE[i]}, ${x(d[0])}, ${
                y(d[1]) + x.bandwidth() / 3.5
              })`,
          );
      }
    } else if (theme === 'Halloween' || theme === 'default') {
      svg
        .append('g')
        .selectAll('barProjection')
        .data(data)
        .join('path')
        .attr('d', (d) => {
          return `M 0 ${x.bandwidth() / 6} L ${x.bandwidth()} ${
            x.bandwidth() / 6
          } L ${x.bandwidth() - x.bandwidth() / 9} 0 L ${x.bandwidth() / 20} 0`;
        })
        .attr('stroke', '#454546')
        .attr('stroke-width', 0.3)
        .transition()
        .duration(800)
        .delay((d, i) => i * 200)
        .attr('fill', (d, i) => myColor(i + 3))
        .attr(
          'transform',
          (d) => `translate(${x(d[0])}, ${y(d[1]) - x.bandwidth() / 3})`,
        );
      svg
        .append('g')
        .selectAll('backFlap')
        .data(data)
        .join('path')
        .attr('d', (d) => {
          return `M ${x.bandwidth() / 20} 0 L ${x.bandwidth() / 12} ${
            -x.bandwidth() / 4
          } L ${x.bandwidth() - x.bandwidth() / 7} ${-x.bandwidth() / 4} L ${
            x.bandwidth() - x.bandwidth() / 9
          } 0`;
        })
        .attr('stroke', '#454546')
        .attr('stroke-width', 0.3)
        .transition()
        .duration(800)
        .delay((d, i) => i * 200)
        .attr('fill', (d, i) => myColor(i))
        .attr(
          'transform',
          (d) => `translate(${x(d[0])}, ${y(d[1]) - x.bandwidth() / 3})`,
        );

      showImageUpload(10, 1.5);

      svg
        .selectAll('mybar')
        .data(data)
        .join('rect')
        .attr('x', (d) => x(d[0]))
        .attr('y', height)
        .attr('ry', 0)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .attr('fill', (d, i) => {
          return myColor(i);
        })
        .attr('stroke', '#454546')
        .attr('stroke-width', 0.3)
        .transition()
        .duration(800)
        .delay((d, i) => i * 200)
        .attr('y', (d) => y(d[1]))
        .attr('height', (d) => height - y(d[1]));

      svg
        .append('g')
        .selectAll('downFlap')
        .data(data)
        .join('path')
        .attr('d', (d) => {
          return `M 0 ${x.bandwidth() / 6} L ${-x.bandwidth() / 20} ${
            (x.bandwidth() * 2.5) / 6
          } L ${x.bandwidth() + x.bandwidth() / 20} ${
            (x.bandwidth() * 2.5) / 6
          } L ${x.bandwidth()} ${x.bandwidth() / 6} `;
        })
        .attr('stroke', '#454546')
        .attr('stroke-width', 0.3)
        .transition()
        .duration(800)
        .delay((d, i) => i * 200)
        .attr('fill', (d, i) => myColor(i + 2))
        .attr(
          'transform',
          (d) => `translate(${x(d[0])}, ${y(d[1]) - x.bandwidth() / 3})`,
        );
    }
    if (theme === 'Halloween') {
      svg
        .append('g')
        .selectAll('halloweenImage')
        .data(data)
        .enter()
        .append('image')
        .attr('href', (d, i) => {
          return '/white-face.png';
        })
        .attr('x', (d) => x(d[0]))
        .attr('y', (d) => y(d[1]) + (height - y(d[1])) / 3)
        .attr('width', (d, i) => x.bandwidth());
    }

    if (theme === 'Valentin') {
      const path = drawLineChart(null, 2, 5, '#f083ad', 8, 'none');
      path.transition(d3.transition().ease(d3.easeSin).duration(1000));

      let totalLength = path.node().getTotalLength();

      path
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1000)
        .ease(d3.easeSin)
        .attr('stroke-dashoffset', 0);

      svg
        .append('g')
        .selectAll('heartImg')
        .data(data)
        .enter()
        .append('image')
        .attr('href', (d, i) => {
          if (i === data.length - 1) return '/arrow.png';
          return Math.random() < 0.5 ? '/heart.png' : '/candy.png';
        })
        .attr('x', (d) => x(d[0]) + x.bandwidth() / 3.6)
        .attr('y', (d) => y(d[1]))
        .attr('width', (d, i) =>
          i === data.length - 1 ? x.bandwidth() / 2 : x.bandwidth() / 1.8,
        );
    }
    if (theme === 'NewYear') {
      let path = drawLineChart(null, 2, 5, '#000000', 5, 'none');

      let totalLength = path.node().getTotalLength();

      path
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(2500)
        .ease(d3.easeSin)
        .attr('stroke-dashoffset', 0);

      let images = svg
        .append('g')
        .selectAll('heartImg')
        .data(data)
        .enter()
        .append('image')
        .attr('href', (d, i) => {
          if (i === data.length - 1) return '/ArrowNewYear.png';
          return Math.random() < 0.5 ? '/fireWork.png' : '/fireWork2.png';
        })
        .attr(
          'x',
          (d) =>
            x(d[0]) -
            x.bandwidth() / 4 +
            ((x.bandwidth() / 1.8) * 2 - x.bandwidth()) / 2 +
            10,
        )
        .attr('y', y.range()[0])
        .attr('width', 0)
        .attr('height', 0);

      images
        .transition()
        .delay((d, i) => i * 200)
        .duration(1000)
        .attr('y', (d) => y(d[1]) - x.bandwidth() / 4)
        .attr('width', (d, i) =>
          i === data.length - 1
            ? (x.bandwidth() / 2) * 2
            : (x.bandwidth() / 1.8) * 2,
        )
        .attr('height', (d, i) =>
          i === data.length - 1
            ? (x.bandwidth() / 2) * 2
            : (x.bandwidth() / 1.8) * 2,
        );
    } else {
      drawLineChart('3, 3', 2, 6, '#fff', 1, 'none');
    }

    // linea eje x

    if (theme === 'Valentin' || theme === 'Cyber' || theme === 'NewYear') {
      svg
        .append('line')
        .attr('x1', (d) => 0)
        .attr('x2', (d) => x.range()[1])
        .attr('y1', height + 0.5)
        .attr('y2', height + 0.5)
        .attr('stroke', '#000000')
        .attr('stroke-width', 1);
    }

    let imgBase, yOffSet, monthTextOffsetY;
    if (theme === 'default' || theme === 'Halloween') {
      imgBase = (d) => '/svg-path.svg';
      yOffSet = x.bandwidth() * 0.2;
      monthTextOffsetY = x.bandwidth() / 4;
    } else if (
      theme === 'Cyber' ||
      theme === 'NewYear' ||
      theme === 'Valentin'
    ) {
      imgBase = (d) => '/';
      yOffSet = x.bandwidth() * 0.2;
      monthTextOffsetY = 10;
    } else {
      imgBase = (d) =>
        Math.random() < 0.5 ? '/baseNavidad.png' : '/baseNavidad2.png';
      yOffSet = x.bandwidth() * 0.4;
      monthTextOffsetY = x.bandwidth() / 2;
    }
    svg
      .selectAll('base')
      .data(data)
      .join('image')
      .attr('href', imgBase)
      .attr('crossorigin', 'anonymous')
      .attr('x', (d) => x(d[0]) - x.bandwidth() * 0.025)
      .attr('y', (d) => y.range()[0] - yOffSet)
      .attr('width', x.bandwidth() * 1.05);

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
      .attr('y', (d) => y.range()[0] + monthTextOffsetY)
      .attr('fill', (d, i) => {
        if (theme === 'Cyber') return '000';
        return myColor(i);
      })
      .attr('font-size', 8)
      .attr('font-weight', '600')
      .style('text-anchor', 'middle');

    svg
      .selectAll('years')
      .data(data)
      .join('text')
      .text((d) => {
        return selectedYear === 'Todos' ? '' : selectedYear;
      })
      .attr('x', (d) => x(d[0]) + x.bandwidth() / 2)
      .attr('y', (d) => y.range()[0] + monthTextOffsetY + 11)
      .attr('fill', (d, i) => {
        if (theme === 'Cyber') return '000';
        return myColor(i);
      })
      .attr('font-size', 8)
      .attr('font-weight', '600')
      .style('text-anchor', 'middle');

    svg
      .selectAll('icons')
      .data(eventsRegister)
      .join('text')
      .text((d) => d.icon)
      .attr('x', (d, i) => {
        return x(d.date) + x.bandwidth() / 2;
      })
      .attr('y', y.range()[0] - x.bandwidth() * 0.1)
      .attr('text-anchor', 'middle')
      .style('text-anchor', 'middle');

    svg
      .selectAll('claims')
      .data(data)
      .join('text')
      .text((d) => d[1])
      .attr('id', (d, i) => `mybar${i}`)
      .on('click', (e, d) => {
        const selectedBar = d3.select(e.currentTarget);
        const clickedId = selectedBar.attr('id');

        let claimsPreviousMonth;

        if (clickedId !== 'mybar0') {
          const idPrevious = parseInt(clickedId.slice(5)) - 1;
          const previousMonth = d3.select(`#mybar${idPrevious}`);

          claimsPreviousMonth = previousMonth._groups[0][0].__data__[1];
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
          const claimsReceived = selectedBar._groups[0][0].__data__[1];
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
            .attr('fill', '#05002b')
            .attr('stroke', '#ff0000')
            .attr('stroke-width', 0.3);
        }
      })
      .attr('x', (d) => x(d[0]) + x.bandwidth() / 2)
      .attr('y', (d) =>
        theme === 'Cyber'
          ? y(d[1]) + x.bandwidth() * 1.2
          : y(d[1]) - x.bandwidth() / 1.5,
      )
      .attr('font-size', theme === 'Cyber' ? 10 : 12)
      .attr('font-weight', '600')
      .attr('fill', (d, i) => (theme === 'Cyber' ? textColor : myColor(i)))
      .attr('text-anchor', 'middle')
      .style('text-anchor', 'middle')
      .style('cursor', 'pointer')
      .attr('transform', (d, i) =>
        theme === 'Cyber'
          ? `rotate(${ROTATE_HANGERS_ANGLE[i]}, ${x(d[0])}, ${
              y(d[1]) + x.bandwidth() / 3.5
            })`
          : 'rotate(0)',
      );

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

export default Chart;
