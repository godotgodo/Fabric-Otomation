import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ data }) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const categories = sortedData.map(item => item.date);
    const series = [{
        name: "Üretim",
        data: sortedData.map(item => item.total_production)
    }];

    const options = {
        chart: {
            height: 350,
            width: 1000,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Aylık Üretim Trendi',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            }
        },
        xaxis: {
            categories: categories
        }
    };

    return (
        <div id="chart w-[1500px]">              
                <ReactApexChart options={options} series={series} type="line" height={350} width={1000} />
        </div>
    );
};

export default ApexChart;
