import { feature } from 'topojson'
import { select, geoPath, min, max, scaleThreshold, range, schemePurples, schemeGreens, csv, json, event, easeCircle } from 'd3'

const tooltip = document.getElementById('tooltip');
const width = 960;
const height = 600;
const svg = select('#container').append('svg')
  .attr('width', width)
  .attr('height', height);

const countsArr = {
  'AL': { 'id': 1, 'code': 'AL', 'state': 'Alabama', 'count': 0 },
  'AK': { 'id': 2, 'code': 'AK', 'state': 'Alaska', 'count': 0 },
  'AZ': { 'id': 4, 'code': 'AZ', 'state': 'Arizona', 'count': 0 },
  'AR': { 'id': 5, 'code': 'AR', 'state': 'Arkansas', 'count': 0 },
  'CA': { 'id': 6, 'code': 'CA', 'state': 'California', 'count': 0 },
  'CO': { 'id': 8, 'code': 'CO', 'state': 'Colorado', 'count': 0 },
  'CT': { 'id': 9, 'code': 'CT', 'state': 'Connecticut', 'count': 0 },
  'DE': { 'id': 10, 'code': 'DE', 'state': 'Delaware', 'count': 0 },
  'DC': { 'id': 11, 'code': 'DC', 'state': 'District of Columbia', 'count': 0 },
  'FL': { 'id': 12, 'code': 'FL', 'state': 'Florida', 'count': 0 },
  'GA': { 'id': 13, 'code': 'GA', 'state': 'Georgia', 'count': 0 },
  'HI': { 'id': 15, 'code': 'HI', 'state': 'Hawaii', 'count': 0 },
  'ID': { 'id': 16, 'code': 'ID', 'state': 'Idaho', 'count': 0 },
  'IL': { 'id': 17, 'code': 'IL', 'state': 'Illinois', 'count': 0 },
  'IN': { 'id': 18, 'code': 'IN', 'state': 'Indiana', 'count': 0 },
  'IA': { 'id': 19, 'code': 'IA', 'state': 'Iowa', 'count': 0 },
  'KS': { 'id': 20, 'code': 'KS', 'state': 'Kansas', 'count': 0 },
  'KY': { 'id': 21, 'code': 'KY', 'state': 'Kentucky', 'count': 0 },
  'LA': { 'id': 22, 'code': 'LA', 'state': 'Louisiana', 'count': 0 },
  'ME': { 'id': 23, 'code': 'ME', 'state': 'Maine', 'count': 0 },
  'MD': { 'id': 24, 'code': 'MD', 'state': 'Maryland', 'count': 0 },
  'MA': { 'id': 25, 'code': 'MA', 'state': 'Massachusetts', 'count': 0 },
  'MI': { 'id': 26, 'code': 'MI', 'state': 'Michigan', 'count': 0 },
  'MN': { 'id': 27, 'code': 'MN', 'state': 'Minnesota', 'count': 0 },
  'MS': { 'id': 28, 'code': 'MS', 'state': 'Mississippi', 'count': 0 },
  'MO': { 'id': 29, 'code': 'MO', 'state': 'Misouri', 'count': 0 },
  'MT': { 'id': 30, 'code': 'MT', 'state': 'Montana', 'count': 0 },
  'NE': { 'id': 31, 'code': 'NE', 'state': 'Nebraska', 'count': 0 },
  'NV': { 'id': 32, 'code': 'NV', 'state': 'Nevada', 'count': 0 },
  'NH': { 'id': 33, 'code': 'NH', 'state': 'New Hampshire', 'count': 0 },
  'NJ': { 'id': 34, 'code': 'NJ', 'state': 'New Jersey', 'count': 0 },
  'NM': { 'id': 35, 'code': 'NM', 'state': 'New Mexico', 'count': 0 },
  'NY': { 'id': 36, 'code': 'NY', 'state': 'New York', 'count': 0 },
  'NC': { 'id': 37, 'code': 'NC', 'state': 'North Carolina', 'count': 0 },
  'ND': { 'id': 38, 'code': 'ND', 'state': 'North Dakota', 'count': 0 },
  'OH': { 'id': 39, 'code': 'OH', 'state': 'Ohio', 'count': 0 },
  'OK': { 'id': 40, 'code': 'OK', 'state': 'Oklahoma', 'count': 0 },
  'OR': { 'id': 41, 'code': 'OR', 'state': 'Oregon', 'count': 0 },
  'PA': { 'id': 42, 'code': 'PA', 'state': 'Pennsylvania', 'count': 0 },
  'RI': { 'id': 44, 'code': 'RI', 'state': 'Rhode Island', 'count': 0 },
  'SC': { 'id': 45, 'code': 'SC', 'state': 'South Carolina', 'count': 0 },
  'SD': { 'id': 46, 'code': 'SD', 'state': 'South Dakota', 'count': 0 },
  'TN': { 'id': 47, 'code': 'TN', 'state': 'Tennessee', 'count': 0 },
  'TX': { 'id': 48, 'code': 'TX', 'state': 'Texas', 'count': 0 },
  'UT': { 'id': 49, 'code': 'UT', 'state': 'Utah', 'count': 0 },
  'VT': { 'id': 50, 'code': 'VT', 'state': 'Vermont', 'count': 0 },
  'VA': { 'id': 51, 'code': 'VA', 'state': 'Virginia', 'count': 0 },
  'WA': { 'id': 53, 'code': 'WA', 'state': 'Washington', 'count': 0 },
  'WV': { 'id': 54, 'code': 'WV', 'state': 'West Virginia', 'count': 0 },
  'WI': { 'id': 55, 'code': 'WI', 'state': 'Wisconsin', 'count': 0 },
  'WY': { 'id': 56, 'code': 'WY', 'state': 'Wyoming', 'count': 0 }
}


// const countsArr = [
//   { 'id': { 'id': 1, 'code': 'AL', 'state': 'Alabama', 'count': 0 } },
//   { 'id': { 'id': 2, 'code': 'AK', 'state': 'Alaska', 'count': 0 } },
//   { 'id': { 'id': 4, 'code': 'AZ', 'state': 'Arizona', 'count': 0 } },
//   { 'id': { 'id': 5, 'code': 'AR', 'state': 'Arkansas', 'count': 0 } },
//   { 'id': { 'id': 6, 'code': 'CA', 'state': 'California', 'count': 0 } },
//   { 'id': { 'id': 8, 'code': 'CO', 'state': 'Colorado', 'count': 0 } },
//   { 'id': { 'id': 9, 'code': 'CT', 'state': 'Connecticut', 'count': 0 } },
//   { 'id': { 'id': 10, 'code': 'DE', 'state': 'Delaware', 'count': 0 } },
//   { 'id': { 'id': 11, 'code': 'DC', 'state': 'District of Columbia', 'count': 0 } },
//   { 'id': { 'id': 12, 'code': 'FL', 'state': 'Florida', 'count': 0 } },
//   { 'id': { 'id': 13, 'code': 'GA', 'state': 'Georgia', 'count': 0 } },
//   { 'id': { 'id': 15, 'code': 'HI', 'state': 'Hawaii', 'count': 0 } },
//   { 'id': { 'id': 16, 'code': 'ID', 'state': 'Idaho', 'count': 0 } },
//   { 'id': { 'id': 17, 'code': 'IL', 'state': 'Illinois', 'count': 0 } },
//   { 'id': { 'id': 18, 'code': 'IN', 'state': 'Indiana', 'count': 0 } },
//   { 'id': { 'id': 19, 'code': 'IA', 'state': 'Iowa', 'count': 0 } },
//   { 'id': { 'id': 20, 'code': 'KS', 'state': 'Kansas', 'count': 0 } },
//   { 'id': { 'id': 21, 'code': 'KY', 'state': 'Kentucky', 'count': 0 } },
//   { 'id': { 'id': 22, 'code': 'LA', 'state': 'Louisiana', 'count': 0 } },
//   { 'id': { 'id': 23, 'code': 'ME', 'state': 'Maine', 'count': 0 } },
//   { 'id': { 'id': 24, 'code': 'MD', 'state': 'Maryland', 'count': 0 } },
//   { 'id': { 'id': 25, 'code': 'MA', 'state': 'Massachusetts', 'count': 0 } },
//   { 'id': { 'id': 26, 'code': 'MI', 'state': 'Michigan', 'count': 0 } },
//   { 'id': { 'id': 27, 'code': 'MN', 'state': 'Minnesota', 'count': 0 } },
//   { 'id': { 'id': 28, 'code': 'MS', 'state': 'Mississippi', 'count': 0 } },
//   { 'id': { 'id': 29, 'code': 'MO', 'state': 'Misouri', 'count': 0 } },
//   { 'id': { 'id': 30, 'code': 'MT', 'state': 'Montana', 'count': 0 } },
//   { 'id': { 'id': 31, 'code': 'NE', 'state': 'Nebraska', 'count': 0 } },
//   { 'id': { 'id': 32, 'code': 'NV', 'state': 'Nevada', 'count': 0 } },
//   { 'id': { 'id': 33, 'code': 'NH', 'state': 'New Hampshire', 'count': 0 } },
//   { 'id': { 'id': 34, 'code': 'NJ', 'state': 'New Jersey', 'count': 0 } },
//   { 'id': { 'id': 35, 'code': 'NM', 'state': 'New Mexico', 'count': 0 } },
//   { 'id': { 'id': 36, 'code': 'NY', 'state': 'New York', 'count': 0 } },
//   { 'id': { 'id': 37, 'code': 'NC', 'state': 'North Carolina', 'count': 0 } },
//   { 'id': { 'id': 38, 'code': 'ND', 'state': 'North Dakota', 'count': 0 } },
//   { 'id': { 'id': 39, 'code': 'OH', 'state': 'Ohio', 'count': 0 } },
//   { 'id': { 'id': 40, 'code': 'OK', 'state': 'Oklahoma', 'count': 0 } },
//   { 'id': { 'id': 41, 'code': 'OR', 'state': 'Oregon', 'count': 0 } },
//   { 'id': { 'id': 42, 'code': 'PA', 'state': 'Pennsylvania', 'count': 0 } },
//   { 'id': { 'id': 44, 'code': 'RI', 'state': 'Rhode Island', 'count': 0 } },
//   { 'id': { 'id': 45, 'code': 'SC', 'state': 'South Carolina', 'count': 0 } },
//   { 'id': { 'id': 46, 'code': 'SD', 'state': 'South Dakota', 'count': 0 } },
//   { 'id': { 'id': 47, 'code': 'TN', 'state': 'Tennessee', 'count': 0 } },
//   { 'id': { 'id': 48, 'code': 'TX', 'state': 'Texas', 'count': 0 } },
//   { 'id': { 'id': 49, 'code': 'UT', 'state': 'Utah', 'count': 0 } },
//   { 'id': { 'id': 50, 'code': 'VT', 'state': 'Vermont', 'count': 0 } },
//   { 'id': { 'id': 51, 'code': 'VA', 'state': 'Virginia', 'count': 0 } },
//   { 'id': { 'id': 53, 'code': 'WA', 'state': 'Washington', 'count': 0 } },
//   { 'id': { 'id': 54, 'code': 'WV', 'state': 'West Virginia', 'count': 0 } },
//   { 'id': { 'id': 55, 'code': 'WI', 'state': 'Wisconsin', 'count': 0 } },
//   { 'id': { 'id': 56, 'code': 'WY', 'state': 'Wyoming', 'count': 0 } }
// ]

// { 'id': { 'id': 56, 'WY': '0', 'state': 'Wyoming'}

// csv('restaurants.csv', data => {
//   // console.log(data)
//   countsArr.forEach(object => {
//     if(!isNaN(object[data.province])) {
//       object[data.province] += 1
//     }      
//   })
// })

csv('rest.csv').then(data => {
  // console.log(data[0])
  const stateCodes = data.map(obj => {
    return obj.province
  })
  // console.log(countsArr)

  for (let i = 0; i < stateCodes.length; i++) {
    if (countsArr[stateCodes[i]]) {
      countsArr[stateCodes[i]]['count'] += 1
    }
  }

  // countsArr.forEach(object => {
  //   if(data.province === object['id']['code']) {
  //     object['id']['count'] += 1
  //   }
  // })     
})


// console.log(countsArr)

// console.log(countsArr.find(el => el.id === 10))

// async function run() {

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

    // !!!


    // const max = d3.max(Object.entries(countsArr), subArr => subArr[1]['count'])
    // console.log(max)
    // const max = d3.max(countsArr, el => el.id.count)
    // const step = (max - min) / 30

    const min = d3.min(Object.entries(countsArr), subArr => subArr[1]['count'])
    // console.log(min)

    const max = d3.max(Object.entries(countsArr), subArr => subArr[1]['count'])
    // console.log(max)

    const step = max - min / 30


    // const color = d3.scaleThreshold()
    //   .domain([.2, .9, 1.5, 3.5, 10, 20, 100, 300, 600])
    //   .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f", "#33125e", "#200a3d", "#140529" ]);


    // const colorsScale = d3.scaleThreshold()
    //   .domain([50, 100, 200, 500, 750, 1000, 1250, 1750, 2250, 2750])
    //   .range(schemeGreens[9]);

    const colorsScale = d3.scaleThreshold()
      .domain([50, 100, 250, 500, 750, 1000, 1250, 1500])
      .range(schemeGreens[9]);

    // !!!
    // const colorsScale = d3.scaleThreshold()
    //   .domain(range(min, max, step))
    //   .range(schemeGreens[9]);


    const colors = [];
    // for (let i = min; i <= max - 20; i += step) {
    for (let i = 31; i <= 2787 - 20; i += step) {
      colors.push(i);
    }

    svg.append('g')
      .selectAll('path')
      // .data(counties)
      .data(state)
      .enter()
      .append('path')
      .attr('class', 'county')
      // .attr('fill', d => colorsScale(countsArr.find(el => Number(el.id.id) === Number(d.id))['id']['count']))
      .attr('fill', d => colorsScale(Object.entries(countsArr).find(subArr => Number(subArr[1]['id']) === Number(d.id))[1]['count']))
      // .attr('fill', d => console.log(d)) // 'd' here is same as 'states' on line 83
      .attr('d', path)
      .style('stroke', 'black')
      .style('stroke-width', '.5')
      .on('mouseover', (d, i) => {
        const { coordinates } = d.geometry;
        const [x, y] = coordinates[0][0][0];

        tooltip.classList.add('show');
        tooltip.style.left = x - 50 + 'px';
        tooltip.style.top = y - 50 + 'px';


        const counts = Object.entries(countsArr).find(subArr => Number(subArr[1]['id']) === Number(d.id))[1]['count'];
        const state = Object.entries(countsArr).find(subArr => Number(subArr[1]['id']) === Number(d.id))[1]['state'];

        tooltip.innerHTML = `
        <p>State: ${state}</p>
        <p>Count: ${counts}</p>
      `;

      }).on('mouseout', () => {
        tooltip.classList.remove('show');
      });

    // const colors = [50, 100, 250, 500, 750, 1000, 1250, 1500]


    const legendWidth = 300;
    const legendHeight = 20;

    const legendRectWidth = legendWidth / colors.length;
    const legend = d3.select('g')
      .append('svg')
      .attr('x', 330)
      .attr('y', 10)
      .attr('width', legendWidth)
      .attr('height', legendHeight)

    const x = d3.scaleLinear()
      .domain([50, 1500])
      .rangeRound([500, 1000]);

    legend.selectAll('rect')
      .data(colors)
      .enter()
      .append('rect')
      .attr('x', (_, i) => i * legendRectWidth)
      .attr('y', 0)
      .attr('width', legendRectWidth)
      .attr('height', legendHeight)
      .attr('fill', c => colorsScale(c))
    // .call(d3.axisBottom(x)
    // .tickSize(8)
    // .tickFormat(x => Math.round(x) + '%')
    // .tickValues(colorsScale.domain()))
    // .select(".domain")
    // .remove();


    // var newWidth = parseInt(select('rect').style("width")) * 4.1 + "px"

    // .on('mouseover', () => {
    //   // select('rect').attr('width', )
    //   select('rect').style("transform", 'scale("1.3")')

    //   // select('rect').attr("width", 400)

    // }).on('mouseout', () => {
    //   select('rect').attr('fill', 'initial')
    // })


  })
  // }


  // run()