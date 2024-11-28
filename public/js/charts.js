async function initCharts() {
  const chart1 = echarts.init(document.getElementById('chart1'));
  const chart2 = echarts.init(document.getElementById('chart2'));
  const chart3 = echarts.init(document.getElementById('chart3'));

  const { patientsByProvince, categoriesByProvince, patientsByCategory } = await fetch('/graphics/data')
    .then(res => res.json())
    .catch(error => console.error("Error obteniendo datos de gráficos:", error));

  // Data para gráfico de Barras
  // const barChartLabels = patientsByProvince.map(item => item.province);
  const barChartData = patientsByProvince.map(item => item.count);
  // calculamos el valor máximo para cambiar el color
  const maxCount = Math.max(...barChartData);

  const barChartOptions = {
    title: {
      text: 'Pacientes por Provincia',
      left: 'center',
      textStyle: { color: '#ffffff' },
    },
    backgroundColor: 'transparent',
    grid: {
      left: '15%', // Ajustamos para nombre de provincia largos
      right: '10%',
      bottom: '10%',
      top: '15%',
    },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#ffffff' },
      axisLine: { lineStyle: { color: '#ffffff' } },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
    },
    yAxis: {
      type: 'category',
      data: patientsByProvince.map(item => item.province),
      axisLabel: { color: '#ffffff' },
      axisLine: { lineStyle: { color: '#ffffff' } },
    },
    series: [
      {
        type: 'bar',
        data: patientsByProvince.map(item => ({
          value: item.count,
          itemStyle: {
            color: item.count === maxCount ? '#ff0000' : '#6cc24a', // Marcamos el valor mas alto
          },
        })),
      },
    ],
  };

  const treemapChartOptions = {
    title: {
      text: 'Categorías por Provincia',
      left: 'center',
      textStyle: { color: '#ffffff' },
    },
    backgroundColor: 'transparent',
    tooltip: {
      formatter: function (info) {
        const path = info.treePathInfo;
        const province = path.length > 1 ? path[1].name : 'Provincia sin nombre'; // validamos data
        const category = path.length > 2 ? path[2].name : 'Categoría sin nombre'; // validamos data
        return `
          <strong>Provincia:</strong> ${province}<br>
          <strong>Categoría:</strong> ${category}<br>
          <strong>Pacientes:</strong> ${info.value}
        `;
      },
      textStyle: { color: '#000000' },
    },
    series: {
      type: 'treemap',
      data: categoriesByProvince.reduce((result, item) => {
        const provinceIndex = result.findIndex(prov => prov.name === item.province);
        if (provinceIndex === -1) {
          // Agregamos provincia
          result.push({
            name: item.province,
            children: [
              {
                name: item.category,
                value: item.count,
              },
            ],
          });
        } else {
          // si existe provincia, agregamos categoría
          result[provinceIndex].children.push({
            name: item.category,
            value: item.count,
          });
        }
        return result;
      }, []),
      label: {
        show: true,
        formatter: '{b}',
        color: '#ffffff',
      },
      itemStyle: {
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    },
  };

  const categoryPieChartData = patientsByCategory.map(item => ({
    value: item.count,
    name: item.category
  }));

  const categoryPieChartOptions = {
    backgroundColor: 'transparent',
    title: {
      text: 'Pacientes por Categoría',
      textStyle: { color: '#ffffff' },
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      textStyle: { color: '#000000' }
    },
    // legend: {
    //   textStyle: { color: '#ffffff' }
    // },
    series: [
      {
        name: 'Categories',
        type: 'pie',
        radius: ['20%', '80%'],
        data: categoryPieChartData,
        label: { color: '#ffffff' },
        labelLine: { lineStyle: { color: '#ffffff' } }
      }
    ]
  };

  chart1.setOption(barChartOptions);
  chart2.setOption(treemapChartOptions);
  chart3.setOption(categoryPieChartOptions);

  window.addEventListener('resize', () => {
    chart1.resize();
    chart2.resize();
    chart3.resize();
  });
}

// inicializamos los gráficos luego de que el DOM está cargado
document.addEventListener('DOMContentLoaded', initCharts);
