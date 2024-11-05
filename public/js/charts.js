async function initCharts() {
    // Initialize chart containers
    const chart1 = echarts.init(document.getElementById('chart1'));
    const chart2 = echarts.init(document.getElementById('chart2'));
  
    // Fetch chart data from your API endpoint
    const { patientsByProvince, categoriesByProvince } = await fetch('/graphics/data')
      .then(res => res.json())
      .catch(error => console.error("Error fetching chart data:", error));
  
    // Prepare data for the bar chart
    const barChartLabels = patientsByProvince.map(item => item.province);
    const barChartData = patientsByProvince.map(item => item.count);
  
    const barChartOptions = {
      xAxis: {
        type: 'category',
        data: barChartLabels
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: barChartData,
          type: 'bar'
        }
      ]
    };
  
    // Prepare data for the pie chart
    const pieChartData = categoriesByProvince.map(item => ({
      value: item.count,
      name: `${item.category} (${item.province})`
    }));
  
    const pieChartOptions = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Categories by Province',
          type: 'pie',
          radius: ['40%', '70%'],
          data: pieChartData
        }
      ]
    };
  
    // Set options and render the charts
    chart1.setOption(barChartOptions);
    chart2.setOption(pieChartOptions);
  }
  
  // Initialize charts after DOM is loaded
  document.addEventListener('DOMContentLoaded', initCharts);
  