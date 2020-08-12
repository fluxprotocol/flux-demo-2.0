import React, { useState, useEffect, useRef } from 'react';
import Chartjs from 'chart.js';
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
    datasets: [{
      data: [],
      backgroundColor: 'transparent',
      borderColor: globalColors.pink,
      borderWidth: 1,
      fill: false,
    }]
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
      xAxes: [{
        ticks: {
          display: false,
        },
      }],
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

  useEffect(() => {
    // console.log('----', props.priceHistory)
    const dataArray = [];
    props.priceHistory.forEach(dataItem => {
      dataArray.push(Math.floor(dataItem.avg_price));
    });
    chartConfig.data.labels = dataArray;
    chartConfig.data.datasets[0].data = dataArray;
    // updateDataset(0, dataArray);
  }, [props.priceHistory]);


  useEffect(() => {
    if (!chartInstance) return;
    updateDataset();
  }, [chartInstance]);

  const updateDataset = () => {
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
