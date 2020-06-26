import {feature} from 'topojson'
import {select, geoPath, min, max, scaleThreshold, range, schemePurples, schemeGreens, csv, json, event} from 'd3'

const tooltip = document.getElementById('tooltip');
const width = 960;
const height = 600;
const svg = select('#container').append('svg')
  .attr('width', width)
  .attr('height', height);

  const countsArr = [
    { 'AL': 0, 'id': 1, 'state': 'Alabama','num': 144},
    { 'AK': 0, 'id': 2, 'state': 'Alaska','num': 38},
    { 'AZ': 0, 'id': 4, 'state': 'Arizona','num': 322},
    { 'AR': 0, 'id': 5, 'state': 'Arkansas','num': 163},
    { 'CA': 0, 'id': 6, 'state': 'California','num': 2787},
    { 'CO': 0, 'id': 8, 'state': 'Colorado','num': 412},
    { 'CT': 0, 'id': 9, 'state': 'Connecticut','num': 170},
    { 'DE': 0, 'id': 10, 'state': 'Delaware','num': 42},
    { 'DC': 0, 'id': 11, 'state': 'District of Columbia','num': 117},
    { 'FL': 0, 'id': 12, 'state': 'Florida','num': 1129},
    { 'GA': 0, 'id': 13, 'state': 'Georgia','num': 498},
    { 'HI': 0, 'id': 15, 'state': 'Hawaii','num': 177},
    { 'ID': 0, 'id': 16, 'state': 'Idaho','num': 55},
    { 'IL': 0, 'id': 17, 'state': 'Illinois','num': 620},
    { 'IN': 0, 'id': 18, 'state': 'Indiana','num': 228},
    { 'IA': 0, 'id': 19, 'state': 'Iowa','num': 172},
    { 'KS': 0, 'id': 20, 'state': 'Kansas','num': 70},
    { 'KY': 0, 'id': 21, 'state': 'Kentucky','num': 137},
    { 'LA': 0, 'id': 22, 'state': 'Louisiana','num': 204},
    { 'ME': 0, 'id': 23, 'state': 'Maine','num': 135},
    { 'MD': 0, 'id': 24, 'state': 'Maryland','num': 330},
    { 'MA': 0, 'id': 25, 'state': 'Massachusetts','num': 445},
    { 'MI': 0, 'id': 26, 'state': 'Michigan','num': 476},
    { 'MN': 0, 'id': 27, 'state': 'Minnesota','num': 236},
    { 'MS': 0, 'id': 28, 'state': 'Mississippi','num': 84},
    { 'MO': 0, 'id': 29, 'state': 'Misouri','num': 270},
    { 'MT': 0, 'id': 30, 'state': 'Montana','num': 49},
    { 'NE': 0, 'id': 31, 'state': 'Nebraska','num': 76},
    { 'NV': 0, 'id': 32, 'state': 'Nevada','num': 169},
    { 'NH': 0, 'id': 33, 'state': 'New Hampshire','num': 83},
    { 'NJ': 0, 'id': 34, 'state': 'New Jersey','num': 424},
    { 'NM': 0, 'id': 35, 'state': 'New Mexico','num': 180},
    { 'NY': 0, 'id': 36, 'state': 'New York','num': 1533},
    { 'NC': 0, 'id': 37, 'state': 'North Carolina','num': 382},
    { 'ND': 0, 'id': 38, 'state': 'North Dakota','num': 31},
    { 'OH': 0, 'id': 39, 'state': 'Ohio','num': 568},
    { 'OK': 0, 'id': 40, 'state': 'Oklahoma','num': 176},
    { 'OR': 0, 'id': 41, 'state': 'Oregon','num': 464},
    { 'PA': 0, 'id': 42, 'state': 'Pennsylvania','num': 704},
    { 'RI': 0, 'id': 44, 'state': 'Rhode Island','num': 44},
    { 'SC': 0, 'id': 45, 'state': 'South Carolina','num': 161},
    { 'SD': 0, 'id': 46, 'state': 'South Dakota','num': 31},
    { 'TN': 0, 'id': 47, 'state': 'Tennessee','num': 292},
    { 'TX': 0, 'id': 48, 'state': 'Texas','num': 1255},
    { 'UT': 0, 'id': 49, 'state': 'Utah','num': 193},
    { 'VT': 0, 'id': 50, 'state': 'Vermont','num': 64},
    { 'VA': 0, 'id': 51, 'state': 'Virginia','num': 340},
    { 'WA': 0, 'id': 53, 'state': 'Washington','num': 558},
    { 'WV': 0, 'id': 54, 'state': 'West Virginia','num': 87},
    { 'WI': 0, 'id': 55, 'state': 'Wisconsin','num': 246},
    { 'WY': 0, 'id': 56, 'state': 'Wyoming','num': 42},
    

  ]

  csv('restaurants.csv', data => {
    // console.log(data)
    countsArr.forEach(object => {
      if(!isNaN(object[data.province])) {
        object[data.province] += 1
      }      
    })
  })
  
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

    // !!!
    // const min = d3.min(countsArr, el => el.num)
    // const max = d3.max(countsArr, el => el.num)
    // const step = (max - min) / 30
    


    // const color = d3.scaleThreshold()
    //   .domain([.2, .9, 1.5, 3.5, 10, 20, 100, 300, 600])
    //   .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f", "#33125e", "#200a3d", "#140529" ]);
    
    // 60 steps
    // const colorsScale = d3.scaleThreshold()
    //   .domain([0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450, 2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950, 3000])
    //   .range(['#FFFFFF', '#FBFBFA', '#F7F8F6', '#F3F5F2', '#EFF1EE', '#EBEEEA', '#E7EBE6', '#E3E7E2', '#DFE4DE', '#DBE1D9', '#D8DDD5', '#D4DAD1', '#D0D7CD', '#CCD3C9', '#C8D0C5', '#C4CDC1', '#C0C9BD', '#BCC6B8', '#B8C3B4', '#B4BFB0', '#B1BCAC', '#ADB9A8', '#A9B5A4', '#A5B2A0', '#A1AF9C', '#9DAB98', '#99A893', '#95A58F', '#91A18B', '#8D9E87', '#8A9B83', '#86987F', '#82947B', '#7E9177', '#7A8E72', '#768A6E', '#72876A', '#6E8466', '#6A8062', '#667D5E', '#637A5A', '#5F7656', '#5B7352', '#57704D', '#536C49', '#4F6945', '#4B6641', '#47623D', '#435F39', '#3F5C35', '#3C5831', '#38552C', '#345228', '#304E24', '#2C4B20', '#28481C', '#244418', '#204114', '#1C3E10', '#193B0C']);

    // 30 steps
    // const colorsScale = d3.scaleThreshold()
    //   .domain([0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000])
    //   .range(['#FFFFFF', '#F7F8F6', '#EFF1EE', '#E7EBE6', '#DFE4DE', '#D8DDD5', '#D0D7CD', '#C8D0C5', '#C0C9BD', '#B8C3B4', '#B1BCAC', '#A9B5A4', '#A1AF9C', '#99A893', '#91A18B', '#8A9B83', '#82947B', '#7A8E72', '#72876A', '#6A8062', '#637A5A', '#5B7352', '#536C49', '#4B6641', '#435F39', '#3C5831', '#345228', '#2C4B20', '#244418', '#1C3E10']);

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


    // const colors = [];
    // for (let i = min; i <= max - 20; i += step) {
    //   colors.push(i);
    // }
    
    svg.append('g')
      .selectAll('path')
      // .data(counties)
      .data(state)
      .enter()
      .append('path')
      .attr('class', 'county')
      .attr('fill', d => colorsScale(countsArr.find(el => Number(el.id) === Number(d.id))['num']))
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
      
      
      const counts = countsArr.find(el => Number(el.id) === Number(d.id))['num'];
      const state = countsArr.find(el => Number(el.id) === Number(d.id))['state'];

      tooltip.innerHTML = `
        <p>State: ${state}</p>
        <p>Count: ${counts}</p>
      `;

    }).on('mouseout', () => {
      tooltip.classList.remove('show');
    });

    const colors = [50, 100, 250, 500, 750, 1000, 1250, 1500]
    
    
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
  



    //  svg
    //  .enter()
    //   .append("rect")
    //   // .attr("height", 8)
    //   // .attr("x", function (d) { return x(d[0]); })
    //   // .attr("width", function (d) { return x(d[1]) - x(d[0]); })
    //   // .attr("fill", function (d) { return color(d[0]); });
    //   .attr('height', 50)
    //   .attr('width', 500)
    //   .attr('fill', 'blue')

    // g.call(d3.axisBottom(x)
    //   .tickSize(13)
    //   .tickFormat(function (x) { return Math.round(x) + '%' })
    //   .tickValues(color.domain()))
    //   .select(".domain")
    //   .remove();

  })


