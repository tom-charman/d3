const margin = { top: 20, right: 20, bottom: 30, left: 40 },
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// Parse CSV data
d3.csv("data/dummy.csv")
  .then(data => {

    // Process data: convert strings to numbers
    const processedData = data.map(d => {
      const chef = d.Chef;
      const values = Object.keys(d).slice(0, 11).map(v => {
        console.log(`Before conversion: ${typeof v}`);
        return +d[v] || 0; // convert to numbers
      })
      console.log(`After conversion: ${typeof values[0]}`);
      console.log(values)
      return { chef, values };
    });

    // Define scales
    const xScale = d3.scaleLinear()
      .domain([0, 100]) // Percentage range
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(processedData.map(d => d.chef))
      .range([height, 0])
      .paddingInner(0.1); // Add some padding between ridges

    // Define area generator for ridgeline
    const area = d3.area()
      .x(d => xScale(d.values))
      .y0(d => yScale(d.chef))
      .y1(d => yScale(d.chef) - yScale.bandwidth()); // Bottom of the ridge

    // Create SVG element
    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    console.log(processedData)
    // Draw ridgelines for each chef
    svg.selectAll(".chef")
      .data(processedData)
      .enter()
      .append("path")
      .attr("class", "chef")
      .attr("d", d => {
        return area(d);
      })
      .attr("fill", "#ccc") // Adjust fill color as desired
      .attr("opacity", 0.7); // Adjust opacity as desired

    // Add X-axis
    svg.append("g")
      .attr("class", "axis x")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(5)); // Adjust number of ticks as desired

    // Add Y-axis labels for chefs
    svg.append("g")
      .attr("class", "axis y")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .attr("text-anchor", "middle"); // Center chef names

  })
  .catch(error => {
    console.error("Error loading data:", error);
  });
