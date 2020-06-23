// import { select, json, geoPath, geoAlbersUsa } from 'd3';
// import { feature } from 'topojson';

// const svg = select('svg');

// const projection = geoAlbersUsa();
// const pathGenerator = geoPath().projection(projection);

// json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
//   .then(data => {
//     const countries = feature(data, data.objects.countries);

//     svg.selectAll('path')
//       .data(countries.features)
//       .enter().append('path')
//       .attr('d', d => pathGenerator(d));
//   })


import {select, json, geoPath, csv} from 'd3';
import {feature} from 'topojson';


csv('./restaurants.csv', function(data) {
  console.log(data)
})

json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
  .then(data => {
    const counties = feature(data, data.objects.counties).features;
 
    const path = geoPath()

    const svg = select('svg');

    svg.selectAll('path')
      .data(counties)
      .enter()
      .append('path')
      .attr('fill', 'red')
      .attr('d', path)
      
  })
