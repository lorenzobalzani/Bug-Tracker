import {Bar } from 'react-chartjs-2'

function DashboardDeveloper() {
    return (<div className="col col-12">
        <div className="col col-12">
            <Bar
            data={{
                labels: ['Open', 'In progress', 'Closed'],
                datasets: [
                    {
                        label: "Status of tickets",
                        data: [3, 10, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
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
                        text: 'Tickets by status'
                    },
                    layout: {
                       
                    },
                    scales: {
                        yAxes : [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
            }}/>
           </div>
           <div className="col col-12">
           <Bar
           data={{
               labels: ['Bug', 'Feature'],
               datasets: [
                   {
                       label: "Status of tickets",
                       data: [3, 10, 3],
                       backgroundColor: [
                           'rgba(255, 99, 132, 0.2)',
                           'rgba(54, 162, 235, 0.2)',
                       ],
                       borderColor: [
                           'rgba(255, 99, 132, 1)',
                           'rgba(54, 162, 235, 1)'
                       ],
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
                       text: 'Tickets by type'
                   },
                   layout: {
                      
                   },
                   scales: {
                       yAxes : [{
                           ticks: {
                               beginAtZero: true
                           }
                       }]
                   }
           }}/>
           </div>
    </div>);
}

export default DashboardDeveloper;