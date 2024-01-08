import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts';
import { ChartsServiceService } from 'src/app/services/charts-service.service';

@Component({
  selector: 'app-charts',

  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
  chart: any;
  charts: any
  full_screen_id: any
  user_id: any = "6583e077beb7fcf1f6ef7827"
  now_date: any = new Date()
  yesterday_date: any = new Date()
  subcatagory_id :any = null




  chartOptions = {}
  private fullscreenElement: any;

  constructor(private chartsService: ChartsServiceService, private route: ActivatedRoute,
  ) {

    this.route.params.subscribe((params: any) => {

      this.subcatagory_id =params.id
      this.getChartList(params.id)
    });


  }


  ngOnInit() {

    this.yesterday_date = new Date();
    this.yesterday_date.setMonth(this.yesterday_date.getMonth() - 1);

    // this.getCharts()


  }

  getChartList(id: any) {
    this.chartsService.getCharts(id).subscribe({
      next: (data: any) => {
        this.charts = data.data.charts

        if (this.charts.length > 0) {

          this.loadCharts()



        }

      }, error: (error) => {
        console.log(error);
      }
    })



  }

  toggleFullScreen() {
    if (document.fullscreenElement) {

    } else {
      this.fullscreenElement.requestFullscreen();
    }
  }


  loadCharts() {

    for (let i = 0; i < this.charts.length; i++) {


      const chart: any = this.charts[i];
      chart.load = false
      let from_date: any = (document.getElementById('from_date') as HTMLDataElement).value
      let to_date: any = (document.getElementById('to_date') as HTMLDataElement).value

      if (!from_date || !to_date) {
        from_date = "2023-12-14"
        to_date = "2023-12-15"
      }

      this.chartsService.getChartslist(from_date, to_date, this.user_id, chart._id).subscribe({
        next: (data: any) => {
          this.setChart(i, data.charts[0])
          chart.load = true

        }, error: (error) => {
          console.log(error);
        }
      })

    }


  }
  setChart(index: any, chart: any) {


    setTimeout(() => {

      // let item = data.charts
      // for (let i = 0; i < array.length; i++) {

      let x: any = []
      let y: any = []
      let type2_data: any = []
      chart.data.forEach((item: any) => {
        x.push(item.x);
        y.push(item.y);
        if (!item.label) item.label = "web"
        type2_data.push({ "name": item.label, "value": item.value })

      });



      var chartDom: any = document.getElementById(`chart${index}`)! as HTMLElement;
      var myChart = echarts.init(chartDom);
      var option: any;

      console.log(chart.type);

      if (Number(chart.type) == 0) {


        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'

            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          textStyle: {
            fontSize: 10
          },
          xAxis: [
            {
              type: 'category',
              data: x,
              axisTick: {
                alignWithLabel: true
              },

              axisLabel: {
                rotate: 45,

                formatter: function (value: any) {

                  return value.substring(0, 5) + '...';
                }
              },
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: '60%',
              data: y
            }
          ]
        };


      } else {
        option = {
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
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
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
              data: type2_data
            }
          ]
        };
      }

      option && myChart.setOption(option);




      // }
    }, 0)
  }

  fullScreen(id: any) {
    // this.full_screen_id = id

    // let el1 = (document.getElementById(`chart${id.toString()}`) as HTMLElement).classList.add('full-screen') 
    // let el2 = (document.getElementById(`chart${id.toString()}`) as HTMLElement).style.height = "100vh";
    // let el3 = (document.getElementById(`chart${id.toString()}`) as HTMLElement).style.zIndex = "1000000";

    // (document.getElementById(id.toString()) as HTMLElement).style.height = "100%"

  }




  // getCharts() {

  //   let from_date: any = (document.getElementById('from_date') as HTMLDataElement).value
  //   let to_date: any = (document.getElementById('to_date') as HTMLDataElement).value

  //   if (!from_date || !to_date) {
  //     from_date = "2023-12-14"
  //     to_date = "2023-12-15"
  //   }
  //   console.log(from_date);
  //   console.log(to_date);

  //   this.chartsService.getChartslist(from_date, to_date).subscribe({
  //     next: (data: any) => {
  //       this.charts = data.charts

  //       console.log(this.charts);




  // setTimeout(() => {

  //   let array = data.charts
  //   for (let i = 0; i < array.length; i++) {

  //     let x: any = []
  //     let y: any = []
  //     let type2_data:any = []
  //     array[i].data.forEach((item: any) => {
  //       x.push(item.x);
  //       y.push(item.y);
  //       if(!item.label) item.label = "web"
  //         type2_data.push({"name":item.label,"value":item.value})

  //     });

  //     console.log(type2_data);


  //     var chartDom: any = document.getElementById(`chart${i}`)! as HTMLElement;
  //     var myChart = echarts.init(chartDom);
  //     var option: any;

  //     if (Number(array[i].type) == 1) {
  //       console.log('hh2');


  //       option = {
  //         tooltip: {
  //           trigger: 'axis',
  //           axisPointer: {
  //             type: 'shadow'

  //           }
  //         },
  //         grid: {
  //           left: '3%',
  //           right: '4%',
  //           bottom: '3%',
  //           containLabel: true
  //         },
  //         textStyle:{
  //           fontSize:10
  //         },
  //         xAxis: [
  //           {
  //             type: 'category',
  //             data: x,
  //             axisTick: {
  //               alignWithLabel: true
  //             },

  //             axisLabel: {
  //               rotate: 45, 

  //               formatter: function (value:any) {

  //                 return value.substring(0, 5) + '...';
  //               } 
  //             },
  //           }
  //         ],
  //         yAxis: [
  //           {
  //             type: 'value'
  //           }
  //         ],
  //         series: [
  //           {
  //             name: '',
  //             type: 'bar',
  //             barWidth: '60%',
  //             data: y
  //           }
  //         ]
  //       };


  //     }else{
  //       console.log('hh');
  //       option = {
  //         tooltip: {
  //           trigger: 'item'
  //         },
  //         legend: {
  //           top: '5%',
  //           left: 'center'
  //         },
  //         series: [
  //           {
  //             name: 'Access From',
  //             type: 'pie',
  //             radius: ['40%', '70%'],
  //             avoidLabelOverlap: false,
  //             itemStyle: {
  //               borderRadius: 10,
  //               borderColor: '#fff',
  //               borderWidth: 2
  //             },
  //             label: {
  //               show: false,
  //               position: 'center'
  //             },
  //             emphasis: {
  //               label: {
  //                 show: true,
  //                 fontSize: 40,
  //                 fontWeight: 'bold'
  //               }
  //             },
  //             labelLine: {
  //               show: false
  //             },
  //             data: type2_data
  //           }
  //         ]
  //       };
  //     }

  //     option && myChart.setOption(option);




  //   }
  // }, 0)

  //     }, error: (error) => {
  //       console.log(error);
  //     }
  //   })


  // }
}
