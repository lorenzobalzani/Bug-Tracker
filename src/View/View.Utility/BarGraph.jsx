import { Bar } from 'react-chartjs-2';

function BarGraph(props) {
    return(
        <Bar
            data={{
                labels: props.labelsX,
                datasets: [
                    {
                        data: props.data,
                        backgroundColor: props.colors,
                        borderColor: props.colors,
                        borderWidth: 1
                    }]
            }}
            options={{
                maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: props.title
                    },
                    scales: {
                        yAxes : [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
            }}/>
    );
}

export default BarGraph;