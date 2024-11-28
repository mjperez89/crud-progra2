import * as echarts from 'echarts';

class GraphicsService {
    constructor() {
        this.getOptionChart1 = this.getOptionChart1.bind(this);
        this.getOptionChart2 = this.getOptionChart2.bind(this);
    }

   
    async getOptionChart1() {
        return {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [
                  120,
                  {
                    value: 200,
                    itemStyle: {
                      color: '#a90000'
                    }
                  },
                  150,
                  80,
                  70,
                  110,
                  130
                ],
                type: 'bar'
              }
            ]
          };
          
    }

    async getOptionChart2() {
        return {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              top: '5%',
              left: 'center'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                padAngle: 5,
                itemStyle: {
                  borderRadius: 10,
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [
                  { value: 1048, name: 'Search Engine' },
                  { value: 735, name: 'Direct' },
                  { value: 580, name: 'Email' },
                  { value: 484, name: 'Union Ads' },
                  { value: 300, name: 'Video Ads' }
                ]
              }
            ]
          };
    }

    async initCharts() {
     const chart1 = echarts.init(document.getElementById('chart1'));
     const chart2 = echarts.init(document.getElementById('chart2'));

     chart1.setOption(await this.getOptionChart1());
     chart2.setOption(await this.getOptionChart2());

     chart1.resize();
     chart2.resize();

    }

}

export const graphicsService = new GraphicsService()
export { GraphicsService }