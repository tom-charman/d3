const margin = { top: 40, right: 20, bottom: 30, left: 100 },
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// Color palette for the ridgelines
const colors = d3.scaleOrdinal(d3.schemeCategory10);

// Parse CSV data
d3.csv("data/dummy.csv")
  .then(data => {
    // Process data: convert strings to numbers
    const processedData = data.map(d => {
      const chef = d.Chef;
      const values = Object.keys(d)
        .slice(1)
        .map(key => +d[key] || 0);
      return { chef, values };
    });

    // Define scales
    const xScale = d3.scaleLinear()
      .domain([0, 100]) // Percentage range
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(processedData.map(d => d.chef))
      .range([height, 0])
      .paddingInner(0.2); // Increase padding for overlapping effect

    // Define area generator for ridgeline
    const area = d3.area()
      .x((d, i) => xScale(i * 10)) // Adjust x-value based on percentage intervals
      .y0(yScale.bandwidth() / 2) // Adjust y0 to center the ridgeline
      .y1(d => -d * 10) // Adjust y1 based on the value and scaling factor
      .curve(d3.curveBasis); // Apply smoothing curve

    // Create SVG element
    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Draw ridgelines for each chef
    svg.selectAll(".chef")
      .data(processedData)
      .enter()
      .append("path")
      .attr("class", "chef")
      .attr("d", d => area(d.values))
      .attr("fill", (d, i) => colors(i)) // Assign different colors to each ridgeline
      .attr("opacity", 0.8) // Increase opacity for better visibility
      .attr("transform", (d, i) => `translate(0, ${yScale(d.chef) - i * 5})`); // Adjust position for overlapping effect

    // Add X-axis
    svg.append("g")
      .attr("class", "axis x")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d => `${d}%`))
      .selectAll("text")
      .style("font-size", "14px"); // Increase font size of x-axis labels

    // Add Y-axis labels for chefs
    svg.append("g")
      .attr("class", "axis y")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.35em")
      .attr("transform", "rotate(-45)")
      .style("font-family", "Arial, sans-serif")
      .style("font-size", "14px"); // Increase font size of y-axis labels

    // Add chart title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "20px") // Increase font size of chart title
      .style("font-weight", "bold")
      .text("Recipe Completeness by Chef");

    // Add modern style to the chart
    svg.selectAll(".axis path, .axis line")
      .style("fill", "none")
      .style("stroke", "#ccc")
      .style("shape-rendering", "crispEdges");

    svg.selectAll(".axis text")
      .style("fill", "#666");

    svg.selectAll(".chef")
      .style("mix-blend-mode", "multiply") // Apply color blending for a modern look
      .on("mouseover", function(event, d) {
        d3.select(this).attr("opacity", 1); // Increase opacity on hover
      })
      .on("mouseout", function(event, d) {
        d3.select(this).attr("opacity", 0.8); // Restore opacity on mouseout
      });
  })
  .catch(error => {
    console.error("Error loading data:", error);
  });
