import React, { useState, useEffect, useRef } from 'react';
import Chartjs from 'chart.js';
import moment from "moment";
import styled from 'styled-components';

import { globalColors } from '../../../config/Themes';

const ChartWrapper = styled.div`
  min-height: 15rem;
  padding-left: 1rem;
`;

const chartConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    legend: {
      display: false
    },
    elements: {
      point:{
        radius: 0,
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        gridLines: {
          color: 'grey',
          drawBorder: false,
        },
        id: 'A',
        type: 'linear',
        position: 'right',
        ticks: {
          min: 0,
          max: 100,
          callback: function (value) {
            return (value / this.max * 100).toFixed(0) + '%';
          },
          maxTicksLimit: 6,
        },
      }],
      // xAxes: [{
      //   ticks: {
      //     callback: function (value) {
      //       return new Date(value);
      //     },
      //   },
      // }],
    },
  }
};

const OrderBookLineChart = props => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  // trigger effect everytime priceHistory value changes
  useEffect(() => {
    const outcomes = props.market.outcomes;
    chartConfig.data.datasets = [];
    
    /* Let's asume we have 1 day charts */
    let dataByOutcome = {};
    let prevX = null;
    let prevTimestamp = null;

    let outcomesAtPrevX = [];
    props.priceHistory.forEach(data => {
      if (!dataByOutcome[data.outcome]) dataByOutcome[data.outcome] = [];
      if (prevX && prevX != data.date_type_0) {
        const delta = data.fill_time - prevTimestamp;
        const hours = Math.floor(moment.duration(delta * 1000).asHours());
        if (outcomesAtPrevX.length < outcomes) {
          for (let outcome = 0; outcome < outcomes; outcome++) {
            if (!dataByOutcome[outcome]) dataByOutcome[outcome] = [];
            if (typeof outcomesAtPrevX[outcome] === "undefined") dataByOutcome[outcome].push({x: data.date_type_0, y: 0});
          }
        }
        if (hours > 1) {
          for (let i = 0; i < hours; i++) {
            for (let outcome = 0; outcome < outcomes; outcome++) {
              if (!dataByOutcome[outcome]) dataByOutcome[outcome] = [];
              const lastVal = dataByOutcome[outcome][dataByOutcome[outcome].length - 1];
              dataByOutcome[outcome].push(lastVal);
            }
          }
        }
        outcomesAtPrevX = [];
      } else {
        outcomesAtPrevX.push(data.outcome);
      }
      
      dataByOutcome[data.outcome].push({y: Math.floor(data.avg_price), x: Math.floor(data.date_type_0)})
      prevX = data.date_type_0;
      prevTimestamp = data.fill_time;
    })

    // loop outcome object prop and create dataset item for chart array
    let maxLen = 0;
    for (const outcome in dataByOutcome) {
      if (dataByOutcome[outcome].length > maxLen) maxLen = dataByOutcome[outcome].length;
      chartConfig.data.datasets.push({
        data: dataByOutcome[outcome],
        backgroundColor: 'transparent',
        borderColor: props.outcomeColorNameMap[0] ? globalColors[props.outcomeColorNameMap[outcome].color] : "transparent",
        borderWidth: 1,
        fill: false,
      })

      var labels = [];
      for (var i = 0; i <= maxLen; i++) {
          labels.push("");
      }
      chartConfig.data.labels = labels;
    }

    updateDataset();
  }, [props.priceHistory, props.outcomeColorNameMap]);


  useEffect(() => {
    if (!chartInstance) return;
    updateDataset();
  }, [chartInstance]);

  const updateDataset = () => {
    if (!chartInstance) return;
    chartInstance.data = chartConfig.data;
    chartInstance.update();
  };  

  return (
    <ChartWrapper>
      <canvas ref={chartContainer} />
    </ChartWrapper>
  );
}

export default OrderBookLineChart;
