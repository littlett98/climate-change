import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';

import './chart.css';

class climateChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                label: 'My First dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
    }

    componentDidMount() {
        
    }
    
    render() {
        return (
            <div>
                <Line ref="chart" data={this.state} />
                <button onClick={this.fetchData.bind(this)}>Update Data</button>
            </div>
        )
    }

    displayHistory(json) {
        const labels = [];
        const newData = [];
        json.forEach(entry => {labels.push(entry.year); newData.push(entry.data)});
        const newDataset = this.state.datasets.slice();
        newDataset[0].data = newData;
        this.setState({
            labels: labels,
            datasets: newDataset
        });
        this.render();
    }

    fetchData() {
        fetch('http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/year/' + this.props.country)
        .then(response => {
            if (!response.ok) {
                throw new Error('Status code: ' + response.status)
            }
            return response.json();
        })
        .then(json => {this.displayHistory(json)})
        .catch(error => {console.error('There was a problem: '  + error)});
    }
}

export default climateChart;