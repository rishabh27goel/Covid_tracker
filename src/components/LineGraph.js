import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral'

const options = {
    legend: {
        display: false
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    responsive: true,
    maintainAspectRation: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipformat: 'll'
                },
            },
        ],

        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values){
                        return numeral(value).format('0a');
                    }, 
                },
            },
        ],
    }
};

function LineGraph({casesType, ...props} ){

    const [chartData, setChartData] = useState({});

    const buildChartData = (data, casesType) => {
        const chartData = [];
        let lastDataPoint;

         for(let date in data[casesType]){

            if(lastDataPoint){
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }

                chartData.push(newDataPoint);
            }

            lastDataPoint = data[casesType][date];
        }

        return chartData;
    };

    useEffect(() => {
        
        let fetchData = async () =>{

            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then((response) => response.json())
            .then((data) => {

                // Calling the build chart function to change the form of data
                const chartData = buildChartData(data,casesType);
                setChartData(chartData);

            });
        }
        
        fetchData();

    }, [casesType]);


    return (
        <div className={props.className}>

            {chartData?.length > 0 && (
                
                <Line 
                options = { options }
                data={{

                    datasets: 
                    [{
                        backgroundColor: "rgba(204, 16, 52,0.5)",
                        borderColor: "#CC1034",
                        data: chartData
                    }]

                }}
                />

            )}

        </div>
    )
}

export default LineGraph;
