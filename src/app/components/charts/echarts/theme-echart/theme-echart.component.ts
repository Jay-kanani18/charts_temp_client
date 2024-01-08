import { Component } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';
import { CoolTheme } from './cool-theme';

@Component({
    selector: 'app-theme-echart',
    templateUrl: './theme-echart.component.html',
    styleUrls: ['./theme-echart.component.scss']
})
export class ThemeEchartComponent {

    theme: string | ThemeOption;
    coolTheme = CoolTheme;
    options: EChartsOption = {
        // backgroundColor: 'white',
        title: {
        //   text: 'Customized Pie',
        //   left: 'center',
        //   top: 20,
        //   textStyle: {
        //     color: '#ccc'
        //   }
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 200, name: 'Direct' },
              { value: 300, name: 'Email' },
              { value: 400, name: 'Union Ads' },
              { value: 500, name: 'Video Ads' },
              { value: 600, name: 'Search Engine' }
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              color: 'rgba(0, 0, 0, 0'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(0, 0, 0, 0)'
              },
              smooth: 10,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      };

}