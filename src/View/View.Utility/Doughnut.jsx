import { Doughnut } from 'react-chartjs-2';

function DoughnutGraph(props) {
    return(
        <Doughnut
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
                        display: true,
                    },
                    title: {
                        display: true,
                        text: props.title
                    }
            }}/>
    );
}

export default DoughnutGraph;