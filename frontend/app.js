// import { select, json, geoPath, geoAlbers } from 'd3';
// import { feature } from 'topojson';

// const svg = select('svg');

// const projection = geoAlbers();
// const pathGenerator = geoPath().projection(projection);

// json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
//   .then(data => {
//     console.log(data)
//     const countries = feature(data, data.objects.countries);

//     svg.selectAll('path')
//       .data(countries.features)
//       .enter().append('path')
//       .attr('d', d => pathGenerator(d))
//   })




// import {select, json, geoPath, csv} from 'd3';
// import {feature} from 'topojson';
// import {csvParse} from 'd3-dsv';

// document.addEventListener('DOMContentLoaded', () => {



//   // csv('https://people.sc.fsu.edu/~jburkardt/data/csv/addresses.csv')
//   //   .then(data => {
//   //     console.log(data)
//   //   })



//   // slow startup, faster after loaded
//   csv('restaurants.csv')
//     .then(data => {
//       console.log(data)
//     })
  

//   csv('restaurants.csv', data => console.log(data))
  
// json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')

//   .then(data => {
//     console.log(data)
//     // const counties = feature(data, data.objects.counties).features;
//     const states = feature(data, data.objects.states).features
//     const state = states
//     // console.log(state)

//     const path = geoPath()

//     const svg = select('svg');

//     svg.selectAll('path')
//       // .data(counties)
//       .data(state)
//       .enter()
//       .append('path')
//       .attr('fill', 'red')
//       .attr('d', path)

//     path.append('text')
//       .attr('x', 300)
//       .attr('y', 300)
//       .attr('stroke', 'darkorange')
//       .attr('font-size', 50)
//       .text('hello there')
      
//   })

// })



// const counts = {
//   AK: 38,
//   AL: 144,
//   AR: 163,
//   AZ: 322,
//   CA: 2787,
//   CO: 412,
//   CT: 170,
//   DC: 117,
//   DE: 42,
//   FL: 1129,
//   GA: 498,
//   HI: 177,
//   IA: 172,
//   ID: 55,
//   IL: 620,
//   IN: 228,
//   KS: 70,
//   KY: 137,
//   LA: 204,
//   MA: 445,
//   MD: 330,
//   ME: 135,
//   MI: 476,
//   MN: 236,
//   MO: 270,
//   MS: 84,
//   MT: 49,
//   NC: 382,
//   ND: 31,
//   NE: 76,
//   NH: 83,
//   NJ: 424,
//   NM: 180,
//   NV: 169,
//   NY: 1533,
//   OH: 568,
//   OK: 176,
//   OR: 464,
//   PA: 704,
//   RI: 44,
//   SC: 161,
//   SD: 31,
//   TN: 292,
//   TX: 1255,
//   UT: 193,
//   VA: 340,
//   VT: 64,
//   WA: 558,
//   WI: 246,
//   WV: 87,
//   WY: 42
// }




import {feature} from 'topojson'
import {select, geoPath, min, max, scaleThreshold, range, schemePurples, schemeGreens, csv, json} from 'd3'


// function run() {

  // const counts = {
  //   'AL': 0,'AK': 0,'AZ': 0,'AR': 0,'CA': 0,'CO': 0,'CT': 0,'DE': 0,'FL': 0,'GA': 0,'HI': 0,'ID': 0,'IL': 0,'IN': 0,'IA': 0,'KS': 0,'KY': 0,'LA': 0,'ME': 0,'MD': 0,'MA': 0,'MI': 0,'MN': 0,'MS': 0,'MO': 0,'MT': 0,'NE': 0,'NV': 0,'NH': 0,'NJ': 0,'NM': 0,'NY': 0,'NC': 0,'ND': 0,'OH': 0,'OK': 0,'OR': 0,'PA': 0,'RI': 0,'SC': 0,'SD': 0,'TN': 0,'TX': 0,'UT': 0,'VT': 0,'VA': 0,'WA': 0,'WV': 0,'WI': 0,'WY': 0,'DC': 0
  // }
  const countsArr = [
    { 'AL': 0, 'id': 0, 'num': 42},
    { 'AK': 0, 'id': 1, 'num': 24},
    { 'AZ': 0, 'id': 2, 'num': 63},
    { 'AR': 0, 'id': 3, 'num': 34},
    { 'CA': 0, 'id': 4, 'num': 23},
    { 'CO': 0, 'id': 5, 'num': 12},
    { 'CT': 0, 'id': 6, 'num': 43},
    { 'DE': 0, 'id': 7, 'num': 47},
    { 'FL': 0, 'id': 8, 'num': 32},
    { 'GA': 0, 'id': 9, 'num': 33},
    { 'HI': 0, 'id': 10, 'num': 25},
    { 'ID': 0, 'id': 11, 'num': 33},
    { 'IL': 0, 'id': 12, 'num': 2},
    { 'IN': 0, 'id': 13, 'num': 7},
    { 'IA': 0, 'id': 14, 'num': 38},
    { 'KS': 0, 'id': 15, 'num': 37},
    { 'KY': 0, 'id': 16, 'num': 35},
    { 'LA': 0, 'id': 17, 'num': 34},
    { 'ME': 0, 'id': 18, 'num': 34},
    { 'MD': 0, 'id': 19, 'num': 44},
    { 'MA': 0, 'id': 20, 'num': 14},
    { 'MI': 0, 'id': 21, 'num': 42},
    { 'MN': 0, 'id': 22, 'num': 12},
    { 'MS': 0, 'id': 23, 'num': 34},
    { 'MO': 0, 'id': 24, 'num': 32},
    { 'MT': 0, 'id': 25, 'num': 31},
    { 'NE': 0, 'id': 26, 'num': 14},
    { 'NV': 0, 'id': 27, 'num': 14},
    { 'NH': 0, 'id': 28, 'num': 26},
    { 'NJ': 0, 'id': 29, 'num': 34},
    { 'NM': 0, 'id': 30, 'num': 36},
    { 'NY': 0, 'id': 31, 'num': 36},
    { 'NC': 0, 'id': 32, 'num': 36},
    { 'ND': 0, 'id': 33, 'num': 30},
    { 'OH': 0, 'id': 34, 'num': 33},
    { 'OK': 0, 'id': 35, 'num': 22},
    { 'OR': 0, 'id': 36, 'num': 11},
    { 'PA': 0, 'id': 37, 'num': 44},
    { 'RI': 0, 'id': 38, 'num': 35},
    { 'SC': 0, 'id': 39, 'num': 36},
    { 'SD': 0, 'id': 40, 'num': 37},
    { 'TN': 0, 'id': 41, 'num': 23},
    { 'TX': 0, 'id': 42, 'num': 34},
    { 'UT': 0, 'id': 43, 'num': 35},
    { 'VT': 0, 'id': 44, 'num': 36},
    { 'VA': 0, 'id': 45, 'num': 37},
    { 'WA': 0, 'id': 46, 'num': 38},
    { 'WV': 0, 'id': 47, 'num': 39},
    { 'WI': 0, 'id': 48, 'num': 30},
    { 'WY': 0, 'id': 49, 'num': 10},
    { 'DC': 0, 'id': 50, 'num': 12},
    { 'aDC': 0, 'id': 51, 'num': 13},
    { 'aDC': 0, 'id': 52, 'num': 13},
    { 'aDC': 0, 'id': 53, 'num': 13},
    { 'aDC': 0, 'id': 54, 'num': 13},
    { 'aDC': 0, 'id': 55, 'num': 13},
    { 'aDC': 0, 'id': 56, 'num': 13},

  ]

  csv('restaurants.csv', data => {
    countsArr.forEach(object => {
      if(!isNaN(object[data.province])) {
        object[data.province] += 1
      }
      
    })
  //   counts[data.province] += 1
  })
  
  console.log(countsArr)

  // console.log(countsArr.find(el => el.id === 10))



  

  


  // const eduResp = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json');
  // const educations = await eduResp.json();

  // const countiesResp =  json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
  //   .then()
  //           const states =  countiesResp.json();

  //           const path = geoPath();

  //           const data = feature(states, states.objects.states).features;


  json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
  .then(data => {
    // console.log(data)
    // const counties = feature(data, data.objects.counties).features;
    const states = feature(data, data.objects.states).features
    console.log(states)
    const state = states
    // console.log(state[0]['id'])

    const path = geoPath()

    const svg = select('svg');

    // const color = d3.scaleThreshold()
    //   .domain([.2, .9, 1.5, 3.5, 10, 20, 100, 300, 600])
    //   .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f", "#33125e", "#200a3d", "#140529" ]);

    // const min = Math.min(...Object.values(counts))
    // const max = Math.max(...Object.values(counts))
    const min = d3.min(countsArr, el => el.id)
    const max = d3.max(countsArr, el => el.id)
    const step = (max - min) / 8

    const colorsScale = d3.scaleThreshold()
      .domain(range(min, max, step))
      .range(schemeGreens[9]);


    // var color = d3.scaleThreshold()
    //   .domain([0, 1])
    //   .range(["red", "white", "green"]);

    svg.selectAll('path')
      // .data(counties)
      .data(state)
      .enter()
      .append('path')
      // .attr('fill', 'red')
      // .attr('fill', d => colorsScale(educations.find(edu => edu.fips === d.id).bachelorsOrHigher))
      // .attr('fill', d => colorsScale(countsArr.find(el => Number(el.id) === Number(d.id))))
      .attr('fill', d => colorsScale(countsArr.find(el => Number(el.id) === Number(d.id))['num']))

                                                      //  objArr.find(el => el.id === 24)[Object.getOwnPropertyNames(objArr[0])[0]]

      .attr('d', path)
      // .attr("fill", color(1))

    


  })






  // const minEdu = min(educations, edu => edu.bachelorsOrHigher);
  // const maxEdu = max(educations, edu => edu.bachelorsOrHigher);
  // const step = (maxEdu - minEdu) / 8;

  // const minCount = min(counts)
  // const maxCount = max(counts)
  // console.log(minCount)

  // const colorsScale = scaleThreshold()
  //   .domain(range(minEdu, maxEdu, step))
  //   .range(schemePurples[9]);

  // const colors = [];

  // for (let i = minEdu; i <= maxEdu; i += step) {
  //   colors.push(i);
  // }

  // const svg = select('svg')
    

  // svg.append('g')
  //   .selectAll('path')
  //   .data(data)
  //   .enter()
  //   .append('path')
        // .attr('class', 'county')
        // .attr('fill', d => colorsScale(educations.find(edu => edu.fips === d.id).bachelorsOrHigher))
    // .attr('d', path)

        // .attr('data-fips', d => d.id)
        // .attr('data-education', d => educations.find(edu => edu.fips === d.id).bachelorsOrHigher)


    // .on('mouseover', (d, i) => {
    //   const { coordinates } = d.geometry;
    //   const [x, y] = coordinates[0][0];

    //   const education = educations.find(edu => edu.fips === d.id);

    //   svg.classList.add('show');
    //   svg.style.left = x - 50 + 'px';
    //   svg.style.top = y - 50 + 'px';
    //   svg.setAttribute('data-education', education.bachelorsOrHigher);

    //   svg.innerHTML = `
    //     <p>${education.area_name} - ${education.state}</p>
    //     <p>${education.bachelorsOrHigher}%</p>
    //   `;
    // }).on('mouseout', () => {
    //   svg.classList.remove('show');
    // });



  // create the legend
  // const legendWidth = 200;
  // const legendHeight = 30;

  // const legendRectWidth = legendWidth / colors.length;
  // const legend = select('#container')
  //   .append('svg')
  //   .attr('id', 'legend')
  //   .attr('class', 'legend')
  //   .attr('width', legendWidth)
  //   .attr('height', legendHeight)

  // legend.selectAll('rect')
  //   .data(colors)
  //   .enter()
  //   .append('rect')
  //   .attr('x', (_, i) => i * legendRectWidth)
  //   .attr('y', 0)
  //   .attr('width', legendRectWidth)
  //   .attr('height', legendHeight)
  //   .attr('fill', c => colorsScale(c))
// }

// run()