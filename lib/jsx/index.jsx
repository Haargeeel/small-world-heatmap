import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chart from 'd3-heatmap';
import d3 from 'd3';
import map, {blinkMap} from '../js/map';

const geny = n => {
  const data = []

  for (var i = 0; i < n; i++) {
    data.push({
      bin: i * 150,
      count: Math.random() * (25 * (n - i))
    })
  }

  return data
}

const gen = (x, y) => {
  const data = []

  for (var i = 0; i < x; i++) {
    data.push({
      bin: i,
      bins: geny(y)
    })
  }

  console.log('data', data);
  return data
}

const genGeo = (time) => {
  let x = (Math.random() * 360) - 180;
  let y = (Math.random() * 180) - 90;
  return {x: x, y: y, time: time};
}

class App extends Component {

  componentDidMount() {
    this.a = new Chart({
      target: this.refs.a,
      width: 800,
      height: 400,
      color: ['rgb(16, 162, 224)', 'rgb(0, 216, 189)'],
      gap: 3,
      axis: false,
      type: 'circle'
    });

    console.log('map', map);
    console.log(gen(15, 15));
    this.a.render(map);
    //let coords = genGeo();
    //console.log('blinkmap', blinkMap(coords[0], coords[1]));
    let coords = [];
    let time = 0;
    setInterval(() => {
      coords = coords.filter(c => {
        return time - c.time < 11
      });
      coords.push(genGeo(time));
      this.a.render(blinkMap(coords));
      time++;
    }, 500);
    //this.a.render(gen(45, 15));
    //setInterval(() => {
      //this.changeData();
    //}, 1000);
  }

  changeData() {
    this.a.render(gen(15, 15));
  }

  render() {
    return <div>
      <section className="dark">
        <h3>Dark circular</h3>
        <p>Chart with circular bins.</p>
        <svg ref="a" className="chart"></svg>
      </section>
    </div>
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
