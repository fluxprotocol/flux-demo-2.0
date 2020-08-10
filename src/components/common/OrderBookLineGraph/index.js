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
    labels: [10, 38, 40, 30, 70, 80],
    datasets: [{
      data: [10, 38, 40, 30, 70, 80],
      backgroundColor: 'transparent',
      borderColor: globalColors.pink,
      borderWidth: 1,
      fill: false,
    }, 
    {
      data: [22, 10, 17, 55, 55, 77],
      backgroundColor: 'transparent',
      borderColor: globalColors.green,
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

  const updateDataset = (datasetIndex, newData) => {
    // console.log('c', chartInstance)
    // chartInstance.data.datasets[datasetIndex].data = newData;
    // chartInstance.update();
  };


  return (
    <ChartWrapper>
      <canvas ref={chartContainer} />
    </ChartWrapper>
  );
}

export default OrderBookLineChart;
