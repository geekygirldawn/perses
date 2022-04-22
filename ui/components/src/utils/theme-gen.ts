// Copyright 2022 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { ThemeOptions as MaterialThemeOptions } from '@mui/material';

/**
 * Populates shared ECharts theme properties from MUI theme colors and fonts
 * When MUI theme not available, defaults are taken from Prometheus colors and fonts
 * https://github.com/prometheus/prometheus/tree/main/web/ui/react-app/src/pages/graph
 */

export function getChartTheme(muiTheme: MaterialThemeOptions) {
  if (muiTheme.palette === undefined) return;
  // if (muiTheme.palette === undefined || muiTheme.palette.grey === undefined) return;

  const ltGrey = muiTheme.palette.grey ? muiTheme.palette.grey['300'] : '#dee2e6';

  const mdGrey = muiTheme.palette.grey ? muiTheme.palette.grey['600'] : '#545454';

  const chartTheme = {
    // backgroundColor: muiTheme.palette?.background?.default ?? 'transparent', // includes axis labels
    grid: {
      show: true,
      // backgroundColor: muiTheme.palette.background?.default ?? 'transparent',
      backgroundColor: muiTheme.palette.background?.paper ?? 'transparent', // canvas excluding axis labels
      borderColor: 'transparent',
      top: 10,
      right: 20,
      bottom: 0,
      left: 20,
      containLabel: true,
    },
    categoryAxis: {
      show: true,
      axisLabel: {
        show: true,
        color: muiTheme.palette.text?.primary,
        margin: 12,
      },
      axisTick: {
        show: false,
        length: 6,
        lineStyle: {
          color: mdGrey,
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: mdGrey,
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: [ltGrey],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [ltGrey],
        },
      },
    },
    valueAxis: {
      show: true,
      // boundaryGap: ['5%', '10%'],
      axisLabel: {
        color: muiTheme.palette.text?.primary,
        margin: 12,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 0.5,
          color: ltGrey,
          opacity: 0.9,
        },
      },
    },
    legend: {
      textStyle: {
        color: muiTheme.palette.text?.primary,
      },
    },
    toolbox: {
      show: true,
      top: 10,
      right: 10,
      iconStyle: {
        borderColor: muiTheme.palette.text?.primary,
      },
      emphasis: {
        iconStyle: {
          textFill: muiTheme.palette.text?.primary,
        },
      },
    },
    tooltip: {},
    line: {
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 4,
      smooth: false,
      lineStyle: {
        width: 1.5,
      },
      emphasis: {
        lineStyle: {
          width: 2,
        },
      },
    },
    bar: {
      barMaxWidth: 150,
      itemStyle: {
        barBorderWidth: 0,
        barBorderColor: ltGrey,
      },
    },
  };

  return chartTheme;
}
