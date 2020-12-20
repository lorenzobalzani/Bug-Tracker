import {Bar} from 'react-chartjs-2'

function Dashboard() {
    return (
        <div className="content-container">
        <div className="content-title">
          <h1>Dashboard</h1>
          <h2>Description</h2>
        </div>

        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-xl-6">
                    <Bar
                    data={{
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    }}
                    height={400}
                    width={600}/>
                </div>
                <div className="col-12 col-xl-6">
                    <Bar
                    data={{
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    }}
                    height={400}
                    width={600}/>
                </div>
                <div className="col-12 col-xl-6">
                    <Bar
                    data={{
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    }}
                    height={400}
                    width={600}/>
                </div>
                <div className="col-12 col-xl-6">
                    <Bar
                    data={{
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    }}
                    height={400}
                    width={600}/>
                </div>
            </div>
        </div>
      </div>)
}

export default Dashboard;