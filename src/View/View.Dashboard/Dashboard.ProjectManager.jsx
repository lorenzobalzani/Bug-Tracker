import {Radar} from 'react-chartjs-2'

function DashboardProjectManager() {
    let data = [15, 3, 30];
    let data2 = [4, 15, 20];
    
    return (<div className="col col-12">
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
    </div>);
}

export default DashboardProjectManager;