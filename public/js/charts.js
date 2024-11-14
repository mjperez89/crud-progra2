async function initCharts() {
  const chart1 = echarts.init(document.getElementById('chart1'));
  const chart2 = echarts.init(document.getElementById('chart2'));
  const chart3 = echarts.init(document.getElementById('chart3'));

  const { patientsByProvince, categoriesByProvince, patientsByCategory } = await fetch('/graphics/data')
    .then(res => res.json())
    .catch(error => console.error("Error obteniendo datos de gráficos:", error));

  // Data para gráfico de Barras
  const barChartLabels = patientsByProvince.map(item => item.province);
  const barChartData = patientsByProvince.map(item => item.count);
  // calculamos el valor máximo para cambiar el color
  const maxCount = Math.max(...barChartData);

  const barChartOptions = {
    backgroundColor: 'transparent',
    title: {
      text: 'Pacientes por provincia',
      textStyle: {
        color: '#ffffff'  // Título en blanco
      }
    },
    xAxis: {
      type: 'category',
      data: barChartLabels,
      axisLabel: {
        color: '#ffffff'  // provs en blanco
      },
      axisLine: {
        lineStyle: {
          color: '#ffffff'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#ffffff',  // pacientes en blanco
        formatter: '{value}',  // muestro solo enteros
      },
      axisLine: {
        lineStyle: {
          color: '#ffffff'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      interval: 1,  // defino intervalo de cantidad de pacientes
    },
    series: [
      {
        data: barChartData.map(value => ({
          value,
          itemStyle: {
            color: value === maxCount ? '#ff0000' : '#6cc24a'  // rojo para el máximo valor, sino verde
          }
        })),
        type: 'bar'
      }
    ]
  };

  // Data para gráfico de Torta
  const pieChartData = categoriesByProvince.map(item => ({
    value: item.count,
    name: `${item.category} (${item.province})`
  }));

  const pieChartOptions = {
    backgroundColor: 'transparent',
    title: {
      text: 'Categorías por provincia',
      textStyle: {
        color: '#ffffff'
      },
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      textStyle: {
        color: '#000000'
      }
    },
    // legend: {
    //   textStyle: {
    //     color: '#ffffff'
    //   }
    // },
    series: [
      {
        name: 'Categories',
        type: 'pie',
        radius: ['40%', '70%'],
        data: pieChartData,
        label: {
          color: '#ffffff'
        },
        labelLine: {
          lineStyle: {
            color: '#ffffff'
          }
        }
      }
    ]
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
        radius: ['40%', '70%'],
        data: categoryPieChartData,
        label: { color: '#ffffff' },
        labelLine: { lineStyle: { color: '#ffffff' } }
      }
    ]
  };

  chart1.setOption(barChartOptions);
  chart2.setOption(pieChartOptions);
  chart3.setOption(categoryPieChartOptions);
}

// inicializamos los gráficos luego de que el DOM está cargado
document.addEventListener('DOMContentLoaded', initCharts);
