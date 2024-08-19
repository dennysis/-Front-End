import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = () => {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await fetch('http://127.0.0.1:5555/sales_data');
        const salesData = await salesResponse.json();

        const profitLossResponse = await fetch('http://127.0.0.1:5555/profit_loss_data'); 
        const profitLossData = await profitLossResponse.json();

        const labels = salesData.map(item => item.date);
        const salesAmounts = salesData.map(item => item.amount);

        const profitLossAmounts = profitLossData.map(item => item.amount); 

        const barColors = [
          'rgba(75, 192, 192, 0.2)', 
          'rgba(153, 102, 255, 0.2)', 
          'rgba(255, 159, 64, 0.2)', 
          'rgba(255, 99, 132, 0.2)', 
          'rgba(54, 162, 235, 0.2)', 
          'rgba(255, 206, 86, 0.2)', 
          'rgba(231, 233, 237, 0.2)'
        ];

        const chartColors = barColors.slice(0, salesAmounts.length);

        setChartData({
          labels,
          datasets: [
            {
              type: 'bar',
              label: 'Sales Amount',
              data: salesAmounts,
              backgroundColor: chartColors,
              borderColor: chartColors.map(color => color.replace('0.2', '1')),
              borderWidth: 1,
              yAxisID: 'y1'
            },
            {
              type: 'line',
              label: 'Profit and Loss',
              data: profitLossAmounts,
              borderColor: 'rgba(255, 99, 132, 1)', 
              backgroundColor: 'rgba(255, 99, 132, 0.2)', 
              borderWidth: 2,
              fill: false,
              yAxisID: 'y2'
            }
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (canvasRef.current && chartData.datasets.length > 0) {
      chartInstance.current = new Chart(canvasRef.current, {
        type: 'bar', 
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            y1: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Sales Amount',
              },
            },
            y2: {
              type: 'linear',
              position: 'right',
              title: {
                display: true,
                text: 'Profit and Loss',
              },
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ChartComponent;
