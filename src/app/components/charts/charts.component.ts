import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as echarts from 'echarts';
import { ChartsServiceService } from 'src/app/services/charts-service.service';
import { environment } from "../../../environments/environment";



import { DatePipe } from '@angular/common';
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexTooltip,
    ApexGrid,
    ApexTitleSubtitle,
    ApexXAxis,
    ApexFill,
    ApexStroke
} from "ng-apexcharts";
import { HttpClient } from '@angular/common/http';
import { GeneralService } from 'src/app/services/general.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    series2: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    tooltip: ApexTooltip;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    legend: ApexLegend;
    colors: any;
    xaxis: ApexXAxis;
    stroke: ApexStroke;

    fill: ApexFill;
    title: ApexTitleSubtitle;
};
@Component({
    selector: 'app-charts',

    templateUrl: './charts.component.html',
    styleUrl: './charts.component.scss'
})
export class ChartsComponent {
    chart: any;
    charts: any = []
    full_screen_id: any
    user_id: any = "659fac2e37e9286a306d0ba6"
    now_date: any = new Date()
    yesterday_date: any = new Date()
    subcatagory_id: any = null




    chartOptions = {}
    private fullscreenElement: any;

    constructor(private chartsService: ChartsServiceService, private route: ActivatedRoute, private datePipe: DatePipe,
        private http: HttpClient,
        public themeService: CustomizerSettingsService,
        public router: Router,
        public generalService: GeneralService,) {

        this.route.params.subscribe(async (paramss: any) => {

            this.resetAll()





            if (this.generalService.all_countries.length <= 0 || !this.generalService.country_detail.country_name) {


                this.generalService.getCountries()

            } else {
                const country = generalService.all_countries?.filter((each: any) => each._id == this.generalService.selected_country)
                this.generalService.selected_currency = country[0].currency_sign

            }


            if (!this.generalService.selected_subcatagory._id || !this.generalService.selected_country ) {


                let user: any = localStorage.getItem('user')
                let parsed_user = JSON.parse(user)
                this.generalService.selected_catagory = parsed_user.catagory_detail[0]

                // setTimeout(() => {
                    
                    this.router.navigate(['/admin'])
                return

            }

            this.subcatagory_id = paramss.id
            this.charts = []
            this.getChartList(generalService.selected_subcatagory._id)

            let country = generalService.all_countries?.filter((each: any) => each._id == this.generalService.selected_country)
            this.generalService.country_detail = country[0]

            // this.generalService.selected_country = paramss.country






        });


    }


    ngOnInit() {
        this.generalService.activated_type = 2

        this.yesterday_date = new Date();
        this.yesterday_date.setMonth(this.yesterday_date.getMonth() - 1);

        // this.getCharts()


    }

    resetAll() {
        // this.chartOptions = null
        this.chartOptions2 = null
        this.chartOptions3 = null
        this.chartOptions4 = null
        this.chartOptions5 = null
        this.chartOptions6 = null

        this.device_usage = []
        this.top_providers.list = []
        this.top_users.list = []

        this.bussiness_detail = {
            total_revenue: null,
            total_orders: null,
            total_users: null,
            load: false
        }
        this.Ratings = {
            user: {},
            store: {},
            provider: {}
        }
        this.Preparation_time = {
            months: [],
            ontime_count: [],
            early_count: [],
            over_time: []
        }
        this.Delivery_time = {
            months: [],
            ontime_count: [],
            early_count: [],
            over_time: []
        }
        this.Average_delivery_time = {
            value: [],
            catagory: [],
        }
        this.Average_order_amount = {
            value: [],
            catagory: [],
        }
        this.filter1 = {
            name: "This Week",
            value: 1
        }
        this.filter2 = {
            name: "This Week",
            value: 1
        }
        this.filter3 = {
            name: "This Week",
            value: 1
        }
        this.filter4 = {
            name: "This Week",
            value: 1
        }
        this.filter5 = {
            name: "This Week",
            value: 1
        }
        this.filter7 = {
            name: "This Week",
            value: 1
        }
        this.filter8 = {
            name: "This Week",
            value: 1
        }
        this.filter6 = {
            name: "This Week",
            value: 1
        }
        this.filter9 = {
            name: "This Week",
            value: 1
        }

        this.filter10 = {
            name: "This Week",
            value: 1
        }
        this.filter11 = {
            name: "This Week",
            value: 1
        }
        this.filter12 = {
            name: "This Week",
            value: 1
        }
        this.filter13 = {
            name: "This Week",
            value: 1
        }
        this.filter14 = {
            name: "This Week",
            value: 1
        }
        this.filter15 = {
            name: "This Week",
            value: 1
        }
    }

    getChartList(id: any) {
        this.chartsService.getCharts(id).subscribe({
            next: (data: any) => {
                this.charts = data.data.charts

                if (this.charts.length > 0) {

                    let params: any = {}
                    params.country_id = this.generalService.selected_country

                    params.current_date = this.getdateForUTC(new Date)

                    params.type = 1

                    this.API_1(params)
                    this.API_2(params)
                    this.API_3(params)
                    this.API_4(params)
                    this.API_5(params)
                    this.API_6(params)
                    this.API_7(params)
                    this.API_8(params)
                    this.API_9(params)
                    this.API_10(params)
                    this.API_11(params)
                    this.API_12(params)
                    this.API_13(params)
                    this.API_14(params)
                    this.API_15(params)

                    // this.loadCharts()



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


    // loadCharts() {

    //     for (let i = 0; i < this.charts.length; i++) {


    //         const chart: any = this.charts[i];
    //         chart.load = false
    //         let from_date: any = (document.getElementById('from_date') as HTMLDataElement).value
    //         let to_date: any = (document.getElementById('to_date') as HTMLDataElement).value

    //         if (!from_date || !to_date) {
    //             from_date = "2023-12-14"
    //             to_date = "2023-12-15"
    //         }

    //         this.chartsService.getChartslist(from_date, to_date, this.user_id, chart._id).subscribe({
    //             next: (data: any) => {
    //                 this.setChart(i, data.charts[0])
    //                 chart.load = true

    //             }, error: (error) => {
    //                 console.log(error);
    //             }
    //         })

    //     }


    // }
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



    // public chartOptions: any;
    public chartOptions2: any;
    chartOptions3: any = null;
    chartOptions4: any = null;
    chartOptions5: any = null;
    public chartOptions9: Partial<ChartOptions>;
    public chartOptions10: Partial<ChartOptions>;
    public chartOptions11: any;
    public chartOptions12: any;
    public chartOptions13: any;
    public chartOptions14: any;


    device_usage: any = []
    top_users: any = {
        list: [],
        load: false
    }
    top_providers: any = {
        list: [],
        load: false
    }
    // currentDate: Date = new Date();
    // formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');
    orders = 0
    visited = 0



    peak_hours: any = {
        labels: [],
        values: [],
        load: false
    }

    Top_store_order: any = {
        value: [],
        catagory: [],
        load: false
    }


    promo_orders: any = []
    normal_orders: any = []
    Date: any = []

    order_type: any = {
        promo: [],
        normal: [],
        load: false,

    }

    selected_country: any = null

    bussiness_detail: any = {
        total_revenue: null,
        total_orders: null,
        total_users: null,
        load: false
    }

    platform_used: any = {
        load: false,
        data: []
    }
    people_visited: any = {
        load: false
    }

    top_sales: any = {
        items: [],
        modifiers: [],
        load: false

    }


    filter_object = [
        { name: "This Week", value: 1 },
        { name: "This Month", value: 2 },
        { name: "This Year", value: 3 },
        { name: "Last Year", value: 6 },
        // { name: "All Time", value: 4 },
        { name: "Custom", value: 5 },

    ]
    Top_stores: any = {
        value: [],
        catagory: [],
        load: false

    }
    selectedDateRange: any;




    Ratings: any = {
        user: { name: '', rating: 0, count: 0 },
        store: { name: '', rating: 0, count: 0 },
        provider: { name: '', rating: 0, count: 0 },
        load: false
    }

    Preparation_time: any = {
        months: [],
        ontime_count: [],
        early_count: [],
        over_time: [],
        load: false
    }
    Delivery_time: any = {
        months: [],
        ontime_count: [],
        early_count: [],
        over_time: [],
        load: false
    }
    Average_order_amount: any = {
        value: [],
        catagory: [],
        load: false


    }
    Average_delivery_time: any = {
        value: [],
        catagory: [],
        load: false

    }

    filter1: any = {
        name: "This Week",
        value: 1
    }
    filter2: any = {
        name: "This Week",
        value: 1
    }
    filter3: any = {
        name: "This Week",
        value: 1
    }
    filter4: any = {
        name: "This Week",
        value: 1
    }
    filter5: any = {
        name: "This Week",
        value: 1
    }
    filter7: any = {
        name: "This Week",
        value: 1
    }
    filter8: any = {
        name: "This Week",
        value: 1
    }
    filter6: any = {
        name: "This Week",
        value: 1
    }
    filter9: any = {
        name: "This Week",
        value: 1
    }

    filter10: any = {
        name: "This Week",
        value: 1
    }
    filter11: any = {
        name: "This Week",
        value: 1
    }
    filter12: any = {
        name: "This Week",
        value: 1
    }
    filter13: any = {
        name: "This Week",
        value: 1
    }
    filter14: any = {
        name: "This Week",
        value: 1
    }
    filter15: any = {
        name: "This Week",
        value: 1
    }


    currentDate: Date = new Date();
    formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMM yyyy');
    chartOptions6: any
    chartOptions15: any



    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
    getdateForUTC(date: Date) {
        date.setHours(0, 0, 0, 0);
        const diff = new Date(date).getTimezoneOffset() * 60000
        const secs = new Date(date).getTime()
        return new Date(secs - diff).toUTCString()

    }


    onFilter1(item: any) {

        this.filter1 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter1.name = "Custom"
            this.filter1.value = 5

        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter1.startDate = ''
            this.filter1.endDate = ''
        }
        this.API_2(params)
        this.API_4(params)
    }
    onFilter2(item: any) {
        this.filter2 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter2.name = "Custom"
            this.filter2.value = 5

        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter2.startDate = ''
            this.filter2.endDate = ''
        }
        this.API_13(params)
    }
    onFilter3(item: any) {
        this.filter3 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter3.name = "Custom"
            this.filter3.value = 5

        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter3.startDate = ''
            this.filter3.endDate = ''
        }
        this.API_8(params)

    }
    onFilter4(item: any) {
        this.filter4 = item

        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)


            this.filter4.name = "Custom"

            this.filter4.value = 5
        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter4.startDate = ''
            this.filter4.endDate = ''
        }
        this.API_7(params)
    }
    onFilter5(item: any) {
        this.filter5 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter5.name = "Custom"
            this.filter5.value = 5

        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter5.startDate = ''
            this.filter5.endDate = ''
        }
        this.API_14(params)
    }
    onFilter6(item: any) {
        this.filter6 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter6.name = "Custom"
            this.filter6.value = 5

        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter6.startDate = ''
            this.filter6.endDate = ''
        }
        this.API_10(params)
    }
    onFilter7(item: any) {
        this.filter7 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter7.name = "Custom"
            this.filter7.value = 5

        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter7.startDate = ''
            this.filter7.endDate = ''
        }
        this.API_11(params)
    }
    onFilter8(item: any) {
        this.filter8 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter8.name = "Custom"
            this.filter8.value = 5

        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter8.startDate = ''
            this.filter8.endDate = ''
        }
        this.API_12(params)
    }
    onFilter9(item: any) {
        this.filter9 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter9.name = "Custom"
            this.filter9.value = 5

        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter9.startDate = ''
            this.filter9.endDate = ''
        }
        this.API_3(params)
    }
    onFilter10(item: any) {
        this.filter10 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter10.name = "Custom"
            this.filter10.value = 5

        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter10.startDate = ''
            this.filter10.endDate = ''
        }
        this.API_5(params)
    }
    onFilter11(item: any) {
        this.filter11 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter11.name = "Custom"
            this.filter11.value = 5

        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter11.startDate = ''
            this.filter11.endDate = ''
        }
        this.API_6(params)
    }
    onFilter12(item: any) {
        this.filter12 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter12.name = "Custom"
            this.filter12.value = 5

        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter12.startDate = ''
            this.filter12.endDate = ''
        }
        this.API_9(params)
    }
    onFilter13(item: any) {
        this.filter13 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter13.name = "Custom"
            this.filter13.value = 5

        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter13.startDate = ''
            this.filter13.endDate = ''
        }
        this.API_5(params)
    }

    onFilter14(item: any) {
        this.filter14 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter14.name = "Custom"
            this.filter14.value = 5


        }

        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter14.startDate = ''
            this.filter14.endDate = ''

        }
        this.API_1(params)
    }
    onFilter15(item: any) {
        this.filter15 = item
        let params: any = {}
        if ((item.startDate && !item.endDate) || (!item.startDate && item.endDate)) {
            return

        }
        params.current_date = this.getdateForUTC(new Date)
        if (item.startDate && item.endDate) {
            params.startDate = this.getdateForUTC(item.startDate)
            params.endDate = this.getdateForUTC(item.endDate)
            this.filter15.name = "Custom"
            this.filter15.value = 5

        }
        params.country_id = this.generalService.selected_country
        params.type = item.value
        if (params.type != 5) {
            this.filter15.startDate = ''
            this.filter15.endDate = ''
        }
        this.API_15(params)
    }



    onDateRangeSelection(picker: any) {

        // You can access the start and end dates using this.selectedDateRange.start and this.selectedDateRange.end
    }
    API_1(date: any) {

        this.bussiness_detail.load = false


        this.http.post(`${environment.URL}/API_1`, { params: date }).subscribe({
            next: (data: any) => {


                this.bussiness_detail.load = true


                this.bussiness_detail.total_revenue = data.data.latest_data[0].total_revenue
                this.bussiness_detail.total_orders = data.data.latest_data[0].total_orders
                this.bussiness_detail.total_users = data.data.latest_data[0].total_users





            }, error: (error) => {
                console.log(error);
            }
        })
    }
    API_2(date: any) {

        this.platform_used.load = false
        this.http.post(`${environment.URL}/API_2`, { params: date }).subscribe({
            next: (data: any) => {
                this.platform_used.load = true
                this.platform_used.data = data.data.data

                setTimeout(() => {

                    var chartDom: HTMLElement = document.getElementById("chart3") as HTMLElement;
                    let myChart = echarts.init(chartDom);

                    data.data.data.splice(data.data.data.length - 1, 1)
                    data.data.data.map((each: any) => {
                        if (each.name == "") {
                            each.name = "web"
                        }

                    })

                    this.chartOptions3 = {
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
                                data: data.data.data
                            }
                        ]
                    };
                    this.chartOptions3 && myChart.setOption(this.chartOptions3);
                }, 1000);


            }, error: (error) => {
                console.log(error);
            }
        })
    }

    API_3(date: any) {

        this.top_sales.load = false

        this.http.post(`${environment.URL}/API_3`, { params: date }).subscribe({
            next: (data: any) => {

                this.top_sales.items = data.data.items.map((order: any) => order.y)
                this.top_sales.modifiers = data.data.modifiers.map((order: any) => order.y);



                this.top_sales.load = true

                this.chartOptions9 = {
                    series: [
                        {
                            name: "Item",
                            data: this.top_sales.items,
                        },
                        {
                            name: "Modifier",
                            data: this.top_sales.modifiers,
                        },
                        // {
                        //     name: "Refunds",
                        //     data: [8, 7, 6, 8, 9, 7, 7, 8, 6],
                        // }
                    ],
                    chart: {
                        type: "bar",
                        height: 550,
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 3,
                            horizontal: false,
                            columnWidth: "33%",
                            borderRadiusApplication: 'end',
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: ["#757fef", "#2db6f5", "#ee368c"],
                    stroke: {
                        width: 5,
                        show: true,
                        colors: ["transparent"]
                    },
                    xaxis: {
                        categories: [
                            "#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9", "#10"
                        ],
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px"
                            },
                        },
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            },
                        },
                        axisBorder: {
                            show: false,
                        },
                    },
                    fill: {
                        opacity: 1,
                    },
                    tooltip: {
                        shared: true,
                        intersect: false,
                        y: {
                            formatter: function (value, { series, seriesIndex, dataPointIndex }) {
                                // Check if it's an item or modifier based on seriesIndex
                                const isItem = seriesIndex === 0;
                                const itemName = isItem
                                    ? data.data.items[dataPointIndex].x
                                    : data.data.modifiers[dataPointIndex].x;

                                return `${itemName}( ${value})`;
                            },
                        },
                    },
                    legend: {
                        offsetY: 0,
                        position: "top",
                        fontSize: "14px",
                        horizontalAlign: "left",
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#EDEFF5"
                    }
                };


            }, error: (error) => {
                console.log(error);
            }
        })
    }

    API_4(date: any) {

        this.people_visited.load = false
        this.http.post(`${environment.URL}/API_4`, { params: date }).subscribe({
            next: (data: any) => {
                this.people_visited.load = true

                this.orders = data.data.orders[0]?.total_orders
                this.visited = data.data.analytic[0]?.total_visits

                // this.chartOptions = {
                //     series: [
                //         {
                //             name: "Visited",
                //             data: [2400, 1398, 5405, 3910, 4398, 3321, 2000]
                //         }
                //     ],
                //     series2: [
                //         {
                //             name: "Net Income",
                //             data: [24, 13, 30, 35, 40, 22, 15]
                //         }
                //     ],
                //     chart: {
                //         height: 90,
                //         width: 180,
                //         type: "bar",
                //         toolbar: {
                //             show: false
                //         }
                //     },
                //     plotOptions: {
                //         bar: {
                //             columnWidth: "15%",
                //             distributed: true,
                //         },
                //     },
                //     dataLabels: {
                //         enabled: false
                //     },
                //     colors: [
                //         "#FFBA69", "#757FEF"
                //     ],
                //     xaxis: {
                //         categories: [
                //             "Sat",
                //             "Sun",
                //             "Mon",
                //             "Tue",
                //             "Wed",
                //             "Thu",
                //             "Fri"
                //         ],
                //         axisBorder: {
                //             show: false
                //         },
                //         axisTicks: {
                //             show: false
                //         },
                //         labels: {
                //             show: false
                //         }
                //     },
                //     yaxis: {
                //         labels: {
                //             show: false
                //         }
                //     },
                //     grid: {
                //         borderColor: "#f2f2f2",
                //         strokeDashArray: 2,
                //         show: true
                //     },
                //     legend: {
                //         show: false
                //     },
                //     tooltip: {
                //         y: {
                //             formatter: function(val) {
                //                 return "$" + val + "K";
                //             }
                //         }
                //     }
                // };
            }, error: (error) => {
                console.log(error);
            }
        })
    }

    API_5(date: any) {


        this.peak_hours.load = false
        this.http.post(`${environment.URL}/API_5`, { params: date }).subscribe({
            next: (data: any) => {
                this.peak_hours.load = true

                this.peak_hours.labels = data.data.orders.map((order: any) => order.timeSlot)
                this.peak_hours.values = data.data.orders.map((order: any) => order.count);
                this.chartOptions11 = {
                    series: this.peak_hours.values,
                    chart: {
                        height: 607,
                        type: "polarArea"
                    },
                    stroke: {
                        width: 0,
                        colors: ["#ffffff"]
                    },
                    plotOptions: {
                        polarArea: {
                            rings: {
                                strokeWidth: 1,
                                strokeColor: '#EDEFF5',
                            },
                            spokes: {
                                strokeWidth: 1,
                                connectorColors: '#EDEFF5',
                            }
                        }
                    },
                    colors: [

                    ],
                    fill: {
                        opacity: 0.8
                    },
                    grid: {
                        show: false,
                        // strokeDashArray: 5,
                        // borderColor: "#EDEFF5"
                    },
                    legend: {
                        offsetY: 0,
                        fontSize: "14px",
                        position: "bottom",
                        horizontalAlign: "left",
                        labels: {
                            colors: '#5B5B98',
                        }
                    },
                    labels: this.peak_hours.labels
                };


            }, error: (error) => {
                console.log(error);
            }
        })
    }

    API_6(date: any) {


        this.order_type.load = false
        this.http.post(`${environment.URL}/API_6`, { params: date }).subscribe({
            next: (data: any) => {

                this.order_type.load = true
                let array1: any = []
                let array2: any[] = []
                let array3: string[] = []
                data.data.orders.forEach((each: any) => {
                    array1.push(each.Promo)
                    array2.push(each.Normal)
                    array3.push(`${each._id.date.month} - ${each._id.date.year}`)

                });

                this.order_type.promo = array1.slice(0, 12)
                this.order_type.normal = array2.slice(0, 12)
                this.Date = array3.slice(0, 12)
                this.chartOptions12 = {
                    series: [
                        // {
                        //     name: "Cost",
                        //     data: [30, 20, 40, 25, 18, 43, 15]
                        // },
                        {
                            name: "Normal",
                            data: this.order_type.normal
                        },
                        {
                            name: "Promo",
                            data: this.order_type.promo
                        }
                    ],
                    chart: {
                        type: "bar",
                        height: 550,
                        stacked: true,
                        toolbar: {
                            show: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false
                        }
                    },
                    xaxis: {
                        type: "category",
                        axisBorder: {
                            show: false,
                        },
                        categories: this.Date,
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            }
                        }
                    },
                    colors: [
                        "#165BAA", "#FF8C00", "#F765A3"
                    ],
                    legend: {
                        offsetY: 0,
                        position: "top",
                        fontSize: "14px",
                        horizontalAlign: "left",
                        labels: {
                            colors: '#5B5B98'
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            },
                        },
                        axisBorder: {
                            show: false,
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#EDEFF5"
                    }
                };
            }, error: (error) => {
                console.log(error);
            }
        })
    }
    API_7(date: any) {


        this.top_providers.load = false
        this.http.post(`${environment.URL}/API_7`, { params: date }).subscribe({
            next: (data: any) => {
                this.top_providers.load = true
                this.top_providers.list = data.data.orders
            }, error: (error) => {
                console.log(error);
            }
        })
    }
    API_8(date: any) {


        this.top_users.load = false
        this.http.post(`${environment.URL}/API_8`, { params: date }).subscribe({
            next: (data: any) => {
                this.top_users.load = true
                this.top_users.list = data.data.orders

            }, error: (error) => {
                console.log(error);
            }
        })
    }
    API_9(date: any) {


        this.Top_stores.load = false
        this.http.post(`${environment.URL}/API_9`, { params: date }).subscribe({
            next: (data: any) => {
                this.Top_stores.load = true

                this.Top_stores.value = []
                this.Top_stores.catagory = []
                data.data.orders.forEach((each: any) => {
                    if (each.y != null && each.x != null) {

                        this.Top_stores.value.push((each.y).toFixed(1))


                        this.Top_stores.catagory.push(each.x)
                    }


                });


                this.chartOptions13 = {
                    series: [
                        {
                            name: "Revenue",
                            data: this.Top_stores.value,
                        }
                    ],
                    chart: {
                        type: "bar",
                        height: 480,
                        toolbar: {
                            show: false
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    // colors: [
                    //     "",
                    // ],
                    stroke: {
                        width: 0,
                        show: true,
                        colors: ["transparent"]
                    },
                    xaxis: {
                        categories: this.Top_stores.catagory,
                        labels: {
                            show: true,
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px"
                            },
                        },
                        axisBorder: {
                            show: false,
                        },
                        axisTicks: {
                            show: false
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px"
                            }
                        },
                        axisBorder: {
                            show: false
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: (val: any,) => {
                                const formattedCurrency = this.generalService?.selected_currency;

                                return `${formattedCurrency} ${val}`;
                            }
                        }
                    },
                    legend: {
                        offsetY: 5,
                        fontSize: "14px",
                        position: "bottom",
                        horizontalAlign: "center",
                        labels: {
                            colors: '#5B5B98'
                        }
                    },
                    grid: {
                        show: true,
                        borderColor: "#EDEFF5",
                        strokeDashArray: 5
                    }
                };



            }, error: (error) => {
                console.log(error);
            }
        })
    }
    API_10(date: any) {


        this.Average_order_amount.load = false
        this.http.post(`${environment.URL}/API_10`, { params: date }).subscribe({
            next: (data: any) => {
                this.Average_order_amount.load = true
                // this.top_users = data.data.orders

                this.Average_order_amount.value = []
                this.Average_order_amount.catagory = []

                data.data.orders.forEach((each: any) => {

                    this.Average_order_amount.value.push((each.y).toFixed(1))
                    this.Average_order_amount.catagory.push(each.x)


                });


                this.chartOptions2 = {
                    series: [
                        {
                            name: "Order value",
                            data: this.Average_order_amount.value,
                        },
                        // {
                        //     name: "Order Value",
                        //     data: [15, 14, 13, 12, 11, 10, 9, 8, 7],
                        // },


                    ],
                    stroke: {
                        width: 5,
                        show: true,
                        colors: ["transparent"]
                    },
                    chart: {
                        type: "bar",
                        height: 550,
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 3,
                            horizontal: false,
                            columnWidth: "33%",
                            borderRadiusApplication: 'end',
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: ["#757fef", "#2db6f5", "#ee368c"],

                    xaxis: {
                        categories: this.Average_order_amount.catagory,
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px"
                            },
                        },
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            },
                        },
                        axisBorder: {
                            show: false,
                        },
                    },
                    fill: {
                        opacity: 1,
                    },

                    tooltip: {
                        y: {
                            formatter: (val: any,) => {
                                const formattedCurrency = this.generalService?.selected_currency;

                                return `${formattedCurrency} ${val}`;
                            }
                        }
                    },
                    legend: {
                        offsetY: 0,
                        position: "top",
                        fontSize: "14px",
                        horizontalAlign: "left",
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#EDEFF5"
                    }
                };


            }, error: (error) => {
                console.log(error);
            }
        })
    }
    API_11(date: any) {


        this.Delivery_time.load = false
        this.http.post(`${environment.URL}/API_11`, { params: date }).subscribe({
            next: (data: any) => {
                // this.top_users = data.data.orders

                this.Delivery_time.months = []
                this.Delivery_time.early_count = []
                this.Delivery_time.ontime_count = []
                this.Delivery_time.over_time = []
                this.Delivery_time.load = true


                let array1: any = []
                let array2: any[] = []
                let array3: string[] = []
                // data.data.orders.forEach((each: any) => {
                //     array1.push(each.Promo)
                //     array2.push(each.Normal)

                // });


                data.data.orders.forEach((each: any) => {
                    array3.push(`${each._id.date.month} - ${each._id.date.year}`)
                    this.Delivery_time.months.push(each._id)
                    this.Delivery_time.early_count.push(each.early_count)
                    this.Delivery_time.ontime_count.push(each.ontime_count)
                    this.Delivery_time.over_time.push(each.over_time)

                });

                this.chartOptions5 = {
                    series: [
                        {
                            name: "Early",
                            data: this.Delivery_time.early_count
                        },
                        {
                            name: "On Time",
                            data: this.Delivery_time.ontime_count
                        },
                        {
                            name: "Over Time",
                            data: this.Delivery_time.over_time
                        },

                    ],
                    chart: {
                        type: "bar",
                        height: 550,
                        stacked: true,
                        toolbar: {
                            show: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false
                        }
                    },

                    xaxis: {
                        type: "category",
                        axisBorder: {
                            show: false,
                        },
                        categories: array3,
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            }
                        }
                    },
                    colors: [
                        "#165BAA", "#A155B9", "#F765A3"
                    ],
                    legend: {
                        offsetY: 0,
                        position: "top",
                        fontSize: "14px",
                        horizontalAlign: "left",
                        labels: {
                            colors: '#5B5B98'
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            },
                        },
                        axisBorder: {
                            show: false,
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#EDEFF5"
                    }
                };

            }, error: (error) => {
                console.log(error);
            }
        })
    }
    API_12(date: any) {

        this.Preparation_time.load = false


        this.http.post(`${environment.URL}/API_12`, { params: date }).subscribe({
            next: (data: any) => {
                // this.top_users = data.data.orders
                this.Preparation_time.load = true


                this.Preparation_time.months = []
                this.Preparation_time.early_count = []
                this.Preparation_time.ontime_count = []
                this.Preparation_time.over_time = []

                let array3: string[] = []
                data.data.orders.forEach((each: any) => {
                    console.log(each);
                    this.Preparation_time.months.push(each._id)
                    array3.push(`${each._id.date.month} - ${each._id.date.year}`)

                    this.Preparation_time.early_count.push(each.early_count)
                    this.Preparation_time.ontime_count.push(each.ontime_count)
                    this.Preparation_time.over_time.push(each.over_time)

                });

                this.chartOptions4 = {
                    series: [
                        {
                            name: "Early",
                            data: this.Preparation_time.early_count
                        },
                        {
                            name: "On Time",
                            data: this.Preparation_time.ontime_count
                        },
                        {
                            name: "Over Time",
                            data: this.Preparation_time.over_time
                        },

                    ],
                    chart: {
                        type: "bar",
                        height: 550,
                        stacked: true,
                        toolbar: {
                            show: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false
                        }
                    },
                    xaxis: {
                        type: "category",
                        axisBorder: {
                            show: false,
                        },
                        categories: array3,
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            }
                        }
                    },
                    colors: [
                        "#165BAA", "#A155B9", "#F765A3"
                    ],
                    legend: {
                        offsetY: 0,
                        position: "top",
                        fontSize: "14px",
                        horizontalAlign: "left",
                        labels: {
                            colors: '#5B5B98'
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            },
                        },
                        axisBorder: {
                            show: false,
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#EDEFF5"
                    }
                };

            }, error: (error) => {
                console.log(error);
            }
        })
    }
    API_13(date: any) {


        this.Ratings.load = false
        this.http.post(`${environment.URL}/API_13`, { params: date }).subscribe({
            next: (data: any) => {


                this.Ratings.load = true

                if (data.data?.user.length > 0) {


                    this.Ratings.user.name = `${data.data?.user[0]?.user[0]?.first_name} ${data.data?.user[0]?.user[0]?.last_name}`
                    this.Ratings.user.rating = (data.data?.user[1]?.y / data.data?.user[0]?.y).toFixed(1)
                    this.Ratings.user.count = data.data?.user[0]?.y
                } else {
                    this.Ratings.user.name = ''
                    this.Ratings.user.ratings = 0
                    this.Ratings.user.count = 0

                }

                if (data.data?.provider.length > 0) {

                    this.Ratings.provider.name = data.data?.provider[0]?.provider[0].first_name + data.data?.provider[0]?.provider[0]?.last_name
                    this.Ratings.provider.rating = (data.data?.provider[1]?.y / data.data?.provider[0]?.y).toFixed(1)
                    this.Ratings.provider.count = data.data?.provider[0]?.y
                } else {

                    this.Ratings.provider.name = ''
                    this.Ratings.provider.ratings = 0
                    this.Ratings.provider.count = 0

                }

                if (data.data?.store.length > 0) {

                    this.Ratings.store.name = data.data?.store[0]?.store[0]?.name
                    this.Ratings.store.rating = (data.data?.store[1]?.y / data.data?.store[0]?.y).toFixed(1)
                    this.Ratings.store.count = data.data?.store[0]?.y

                } else {

                    this.Ratings.store.name = ''
                    this.Ratings.store.ratings = 0
                    this.Ratings.store.count = 0

                }







            }, error: (error) => {
                console.log(error);
            }
        })
    }
    API_14(date: any) {


        this.Average_delivery_time.load = false
        this.http.post(`${environment.URL}/API_14`, { params: date }).subscribe({
            next: (data: any) => {

                this.Average_delivery_time.load = true

                this.Average_delivery_time.value = []
                this.Average_delivery_time.catagory = []
                data.data.orders.forEach((each: any) => {

                    this.Average_delivery_time.value.push((each.y).toFixed(1))
                    this.Average_delivery_time.catagory.push(each.x)


                });


                this.chartOptions6 = {
                    series: [
                        {
                            name: "Delivey Time",
                            data: this.Average_delivery_time.value,
                        },
                        // {
                        //     name: "Order Value",
                        //     data: [15, 14, 13, 12, 11, 10, 9, 8, 7],
                        // },


                    ],
                    stroke: {
                        width: 5,
                        show: true,
                        colors: ["transparent"]
                    },
                    chart: {
                        type: "bar",
                        height: 550,
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 3,
                            horizontal: false,
                            columnWidth: "33%",
                            borderRadiusApplication: 'end',
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: ["#757fef", "#2db6f5", "#ee368c"],

                    xaxis: {
                        categories: this.Average_delivery_time.catagory,
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px"
                            },
                        },
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            },
                        },
                        axisBorder: {
                            show: false,
                        },
                    },
                    fill: {
                        opacity: 1,
                    },
                    tooltip: {
                        y: {
                            formatter: (val: any) => {
                                return `${val} min`;
                            }
                        }
                    },
                    legend: {
                        offsetY: 0,
                        position: "top",
                        fontSize: "14px",
                        horizontalAlign: "left",
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#EDEFF5"
                    }
                };



            }, error: (error) => {
                console.log(error);
            }
        })
    }
    API_15(date: any) {


        this.Top_store_order.load = false
        this.http.post(`${environment.URL}/API_15`, { params: date }).subscribe({
            next: (data: any) => {
                this.Top_store_order.load = true

                this.Top_store_order.value = []
                this.Top_store_order.catagory = []
                data.data.orders.forEach((each: any) => {

                    if (each.y != null && each.x != null) {

                        this.Top_store_order.value.push((each.y).toFixed(1))


                        this.Top_store_order.catagory.push(each.x)
                    }

                    // this.Top_store_order.value.push((each.y).toFixed(1))
                    // this.Top_store_order.catagory.push(each.x)


                });

                this.chartOptions15 = {
                    series: [
                        {
                            name: "Orders",
                            data: this.Top_store_order.value,
                        }
                    ],
                    chart: {
                        type: "bar",
                        height: 480,
                        toolbar: {
                            show: false
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    // colors: [
                    //     "",
                    // ],
                    stroke: {
                        width: 0,
                        show: true,
                        colors: ["transparent"]
                    },
                    xaxis: {
                        categories: this.Top_store_order.catagory,
                        labels: {
                            show: true,
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px"
                            },
                        },
                        axisBorder: {
                            show: false,
                        },
                        axisTicks: {
                            show: false
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px"
                            }
                        },
                        axisBorder: {
                            show: false
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        // y: {
                        //     formatter: function(val) {
                        //         return val + " hours";
                        //     }
                        // }
                    },
                    legend: {
                        offsetY: 5,
                        fontSize: "14px",
                        position: "bottom",
                        horizontalAlign: "center",
                        labels: {
                            colors: '#5B5B98'
                        }
                    },
                    grid: {
                        show: true,
                        borderColor: "#EDEFF5",
                        strokeDashArray: 5
                    }
                };



            }, error: (error) => {
                console.log(error);
            }
        })
    }


}
