import { Component, ViewChild } from "@angular/core";
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexStroke,
    ApexGrid,
    ApexXAxis,
    ApexFill,
    ApexTooltip
} from "ng-apexcharts";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { GeneralService } from "src/app/services/general.service";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    grid: ApexGrid;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    colors: any;
};

@Component({
    selector: 'app-sessions-by-countries',
    templateUrl: './sessions-by-countries.component.html',
    styleUrls: ['./sessions-by-countries.component.scss']
})
export class SessionsByCountriesComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    Top_stores:any = {
        value:[],
        catagory:[],

    }
    filter_object = [
        {name:"This Week" ,value:1},
        {name:"This Month" ,value:2},
        {name:"This Year" ,value:3},
        {name:"All Time" ,value:4},

    ]
    filter:any = {
        name:"This Week",
        value:1
    }
    onFilter(item:any){
        this.filter = item
        let params:any  = {}
        params.country_id = this.generalService.selected_country
        params.type = item.value
        this.API_9(params)
    }
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        public generalService: GeneralService,


    ) {


        this.route.params.subscribe((paramss: any) => {
            console.log('build');


            let params:any  = {}

            params.country_id = this.generalService.selected_country
            params.type = this.filter.value


            this.API_9(params)


        });
        // this.chartOptions = {
        //     series: [
        //         {
        //             name: "Total Sessions:",
        //             data: [1026, 1554, 497, 1126, 908, 1512, 604, 1047, 1354, 826],
        //         }
        //     ],
        //     chart: {
        //         type: "bar",
        //         height: 480,
        //         toolbar: {
        //             show: false
        //         }
        //     },
        //     plotOptions: {
        //         bar: {
        //             horizontal: true
        //         }
        //     },
        //     dataLabels: {
        //         enabled: false
        //     },
        //     // colors: [
        //     //     "",
        //     // ],
        //     stroke: {
        //         width: 0,
        //         show: true,
        //         colors: ["transparent"]
        //     },
        //     xaxis: {
        //         categories: [
        //             "United State",
        //             "China",
        //             "Canada",
        //             "Indonesia",
        //             "Russia",
        //             "Japans",
        //             "Brazil",
        //             "United Kingdom",
        //             "Vietnam",
        //             "France"
        //         ],
        //         labels: {
        //             show: true,
        //             style: {
        //                 colors: "#a9a9c8",
        //                 fontSize: "14px"
        //             },
        //         },
        //         axisBorder: {
        //             show: false,
        //         },
        //         axisTicks: {
        //             show: false
        //         }
        //     },
        //     yaxis: {
        //         labels: {
        //             style: {
        //                 colors: "#a9a9c8",
        //                 fontSize: "14px"
        //             }
        //         },
        //         axisBorder: {
        //             show: false
        //         }
        //     },
        //     fill: {
        //         opacity: 1
        //     },
        //     tooltip: {
        //         y: {
        //             formatter: function(val) {
        //                 return val + " hours";
        //             }
        //         }
        //     },
        //     legend: {
        //         offsetY: 5,
        //         fontSize: "14px",
        //         position: "bottom",
        //         horizontalAlign: "center",
        //         labels: {
        //             colors: '#5B5B98'
        //         }
        //     },
        //     grid: {
        //         show: true,
        //         borderColor: "#EDEFF5",
        //         strokeDashArray: 5
        //     }
        // };
    }

    API_9(date: any) {


        this.http.get(`${environment.URL}/API_9`,{params:date}).subscribe({
            next: (data: any) => {

                this.Top_stores.value = []
                this.Top_stores.catagory = []
                data.data.orders.forEach((each:any) => {

                    this.Top_stores.value.push((each.y).toFixed(1))
                    this.Top_stores.catagory.push(each.x)
    
                    
                });

                this.chartOptions = {
                    series: [
                        {
                            name: "Total Stores:",
                            data:this.Top_stores.value,
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
                        categories:this.Top_stores.catagory,
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