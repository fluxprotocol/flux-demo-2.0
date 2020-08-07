import React, { useState, useEffect, useRef } from 'react';
import Chartjs from 'chart.js';
// import styled from 'styled-components';


const chartConfig = {
  type: 'line',
  data: {
    // ...
  },
  options: {
    // ...
  }
};

const LineChart = props => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  const onButtonClick = () => {
    const data = [1, 2, 3, 4, 5, 6];
    updateDataset(0, data);
  };


  return (
    <div>
      <button onClick={onButtonClick}>Randomize</button>
      <canvas ref={chartContainer} />
    </div>
  );
}

export default LineChart;
