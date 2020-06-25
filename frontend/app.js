import {feature} from 'topojson'
import {select, geoPath, min, max, scaleThreshold, range, schemePurples, schemeGreens, csv, json, event} from 'd3'

const tooltip = document.getElementById('tooltip');
const width = 960;
const height = 600;
const svg = select('#container').append('svg')
  .attr('width', width)
  .attr('height', height);

  const countsArr = [
    { 'AL': 0, 'id': 1, 'num': 144},
    { 'AK': 0, 'id': 2, 'num': 38},
    { 'AZ': 0, 'id': 4, 'num': 322},
    { 'AR': 0, 'id': 5, 'num': 163},
    { 'CA': 0, 'id': 6, 'num': 2787},
    { 'CO': 0, 'id': 8, 'num': 412},
    { 'CT': 0, 'id': 9, 'num': 170},
    { 'DE': 0, 'id': 10, 'num': 42},
    { 'DC': 0, 'id': 11, 'num': 117},
    { 'FL': 0, 'id': 12, 'num': 1129},
    { 'GA': 0, 'id': 13, 'num': 498},
    { 'HI': 0, 'id': 15, 'num': 177},
    { 'ID': 0, 'id': 16, 'num': 55},
    { 'IL': 0, 'id': 17, 'num': 620},
    { 'IN': 0, 'id': 18, 'num': 228},
    { 'IA': 0, 'id': 19, 'num': 172},
    { 'KS': 0, 'id': 20, 'num': 70},
    { 'KY': 0, 'id': 21, 'num': 137},
    { 'LA': 0, 'id': 22, 'num': 204},
    { 'ME': 0, 'id': 23, 'num': 135},
    { 'MD': 0, 'id': 24, 'num': 330},
    { 'MA': 0, 'id': 25, 'num': 445},
    { 'MI': 0, 'id': 26, 'num': 476},
    { 'MN': 0, 'id': 27, 'num': 236},
    { 'MS': 0, 'id': 28, 'num': 84},
    { 'MO': 0, 'id': 29, 'num': 270},
    { 'MT': 0, 'id': 30, 'num': 49},
    { 'NE': 0, 'id': 31, 'num': 76},
    { 'NV': 0, 'id': 32, 'num': 169},
    { 'NH': 0, 'id': 33, 'num': 83},
    { 'NJ': 0, 'id': 34, 'num': 424},
    { 'NM': 0, 'id': 35, 'num': 180},
    { 'NY': 0, 'id': 36, 'num': 1533},
    { 'NC': 0, 'id': 37, 'num': 382},
    { 'ND': 0, 'id': 38, 'num': 31},
    { 'OH': 0, 'id': 39, 'num': 568},
    { 'OK': 0, 'id': 40, 'num': 176},
    { 'OR': 0, 'id': 41, 'num': 464},
    { 'PA': 0, 'id': 42, 'num': 704},
    { 'RI': 0, 'id': 44, 'num': 44},
    { 'SC': 0, 'id': 45, 'num': 161},
    { 'SD': 0, 'id': 46, 'num': 31},
    { 'TN': 0, 'id': 47, 'num': 292},
    { 'TX': 0, 'id': 48, 'num': 1255},
    { 'UT': 0, 'id': 49, 'num': 193},
    { 'VT': 0, 'id': 50, 'num': 64},
    { 'VA': 0, 'id': 51, 'num': 340},
    { 'WA': 0, 'id': 53, 'num': 558},
    { 'WV': 0, 'id': 54, 'num': 87},
    { 'WI': 0, 'id': 55, 'num': 246},
    { 'WY': 0, 'id': 56, 'num': 42},
    

  ]

  csv('restaurants.csv', data => {
    countsArr.forEach(object => {
      if(!isNaN(object[data.province])) {
        object[data.province] += 1
      }      
    })
  })
  
  // console.log(countsArr)
  // console.log(countsArr.find(el => el.id === 10))

  json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
  .then(data => {
    // console.log(data)
    // const counties = feature(data, data.objects.counties).features;
    const states = feature(data, data.objects.states).features
    // console.log(states)
    const state = states
    // console.log(state[0]['id'])

    const path = geoPath()

    // const svg = select('svg');

    
    // const min = Math.min(...Object.values(counts))
    // const max = Math.max(...Object.values(counts))
    const min = d3.min(countsArr, el => el.num)
    const max = d3.max(countsArr, el => el.num)
    const step = (max - min) / 30
    
    // const color = d3.scaleThreshold()
    //   .domain([.2, .9, 1.5, 3.5, 10, 20, 100, 300, 600])
    //   .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f", "#33125e", "#200a3d", "#140529" ]);
    
    // const color = d3.scaleThreshold()
    //   .domain([0, 1])
    //   .range(["red", "white", "green"]);

    const colorsScale = d3.scaleThreshold()
      .domain(range(min, max, step))
      .range(schemeGreens[9]);

    const colors = [];

    for (let i = min; i <= max - 20; i += step) {
      colors.push(i);
    }
    
    svg.append('g')
      .selectAll('path')
      // .data(counties)
      .data(state)
      .enter()
      .append('path')
      .attr('class', 'county')
      .attr('fill', d => colorsScale(countsArr.find(el => Number(el.id) === Number(d.id))['num']))
      .attr('d', path)
      .style('stroke', 'black')
      .style('stroke-width', '.5')
      .on('mouseover', (d, i) => {
      const { coordinates } = d.geometry;
      const [x, y] = coordinates[0][0][0];
   
      tooltip.classList.add('show');
      tooltip.style.left = x - 50 + 'px';
      tooltip.style.top = y - 50 + 'px';
      
      
      const counts = countsArr.find(el => Number(el.id) === Number(d.id))['num'];

      tooltip.innerHTML = `
        <p>Count: ${counts}</p>
      `;

    }).on('mouseout', () => {
      tooltip.classList.remove('show');
    });

  })


