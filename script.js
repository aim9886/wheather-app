const data = [
    { x: 0, y: 30 },
    { x: 20, y: 50 },
    { x: 40, y: 80 },
    { x: 50, y: 10 },
    { x: 60, y: 70 },
    { x: 70, y: 80 },
    { x: 80, y: 8 },
  ];

  function drawLineChart(ctx, data) {
    const chartArea = { x: 60, y: 20, width: 220, height: 50 };

    // Calculate the scale of the chart
    const xScale = chartArea.width / (data.length - 1);
    const yScale = chartArea.height / 100;

    // Create a linear gradient for the area under the chart
    const gradient = ctx.createLinearGradient(
      chartArea.x,
      chartArea.y,
      chartArea.x,
      chartArea.y + chartArea.height
    );
    gradient.addColorStop(0, "rgba(184,184,184, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    // Begin drawing the chart
    ctx.beginPath();
    ctx.moveTo(chartArea.x, chartArea.y + chartArea.height);

    // Draw the line chart
    data.forEach((point, i) => {
      const x = chartArea.x + i * xScale;
      const y = chartArea.y + chartArea.height - point.y * yScale;
      ctx.lineTo(x, y);
    });

    // Close the path
    ctx.lineTo(chartArea.x + chartArea.width, chartArea.y + chartArea.height);
    ctx.lineTo(chartArea.x, chartArea.y + chartArea.height);
    ctx.closePath();

    // Fill the area under the chart with a gradient
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw the data points
    data.forEach((point, i) => {
      const x = chartArea.x + i * xScale;
      const y = chartArea.y + chartArea.height - point.y * yScale;
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "#09A8FA";
      ctx.strokeStyle = i !== 4 ? "#fff" : "#FFD15E";
      ctx.lineWidth = 5;
      ctx.fill();
      ctx.stroke();
    });
  }

  const canvas = document.getElementById("myChart");
  const ctx = canvas.getContext("2d");

  drawLineChart(ctx, data);

  var all1 = document.querySelector(".all1");
  var all2 = document.querySelector(".all2");
  var dash = document.querySelector(".dash");
  const clone = document.querySelector(".all1");
  console.log(clone);

  console.log(all1);
  console.log(all2);
  console.log(dash);

  function replace1() {
    setTimeout(() => {
      console.log("all1 is replaced by all2----");
      all1.style.display = "none";
      all2.style.display = "flex";
    }, 4800);
  }

  function replace2() {
    setTimeout(() => {
      console.log("all2 is replaced by dash----");
      all2.style.display = "none";
      dash.style.display = "flex";
    }, 10800);
  }

  replace1();
  replace2();

  function getData() {
    url_weather="https://api.iotkiit.in/items/weather";
    fetch(url_weather).then((response)=>{
      return response.json();
    }).then((data)=>{
      document.getElementById('temperature_value').insertAdjacentText('beforeend',parseFloat(data.data[0].temperature).toFixed(0));
      document.getElementById('humidity_value').setAttribute('style',`--value: ${data.data[0].humidity}; font-size: 30px`)
      document.getElementById('humidity_value').insertAdjacentText('beforeend',parseFloat(data.data[0].humidity).toFixed(0)).setAttribute('style','font-size: 30px');
    })

    url_energy="https://api.iotkiit.in/items/energy_meter";
    fetch(url_energy).then((response)=>{
      return response.json();
    }).then((data)=>{
      console.log(data);
      document.getElementById('pv').insertAdjacentText('beforeend',parseFloat(data.data[0].power).toFixed(1));
      document.getElementById('vv').insertAdjacentText('beforeend',parseFloat(data.data[0].voltage).toFixed(1));
      document.getElementById('fv').insertAdjacentText('beforeend',parseFloat(data.data[0].frequency).toFixed(1));
      // document.getElementById('facv').insertAdjacentText('beforeend',parseFloat(data.data[0].powerFactor).toFixed(1));
    })
  }

  getData();