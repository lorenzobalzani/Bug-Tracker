import {Bar, Radar} from 'react-chartjs-2'
import { useState} from 'react'

function Dashboard() {
    let data = [15, 3, 30];
    let data2 = [4, 15, 20];
    let [ selectedProject1, setSelectedProject1] = useState("");
    let [ selectedProject2, setSelectedProject2] = useState("");

    return (
        <div className="content-container">
        <div className="content-title">
          <h1>Dashboard</h1>
          <h2>Description</h2>
        </div>

        <div className="container-fluid">
            <div className="graphs row">
            <div className="col col-12">
            <select className="browser-default custom-select" id="selectProjectInput" value={selectedProject1} 
              onChange={e => setSelectedProject1(e.target.value)}>
              <option>Project1</option>
              <option>Project2</option>
      </select>
                <Radar
                    data={{
                        labels: ['Open', 'In progress', 'Closed'],
                        datasets: [{
                            label: "First project",
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',  
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',  
                            ],
                            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                            pointBorderColor : 'rgba(255, 99, 132, 1)',
                        }, 
                        {
                            label: "Second project",
                            data: null,
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                            ],
                            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                            pointBorderColor : 'rgba(54, 162, 235, 1)',
                        }]
                    }}
                    options = {{
                        maintainAspectRatio: false,
                        scale: {
                            angleLines: {
                                display: true
                            },
                            ticks: {
                                suggestedMin: 0
                            }
                        },
                        legend: {
                            display: false,
                        }
                    }}
                   />
                </div>
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
                    }}
                   />
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
                    }}
                   />
                </div>
            </div>
        </div>
      </div>)
}

export default Dashboard;