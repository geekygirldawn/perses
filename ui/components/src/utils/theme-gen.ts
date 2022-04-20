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

// TODO (sjcobb): figure out ECharts theme approach
// - don't actually need two ECharts themes since it can be 'generated' from theme primary and secondary colors

export function getChartTheme(muiTheme: MaterialThemeOptions) {
  console.log('getChartsTheme -> muiTheme: ', muiTheme);

  if (muiTheme.palette === undefined) return;
  // if (muiTheme.palette === undefined || muiTheme.palette.grey === undefined) return;

  const ltGrey = muiTheme.palette.grey ? muiTheme.palette.grey['300'] : '#dee2e6';

  const mdGrey = muiTheme.palette.grey ? muiTheme.palette.grey['600'] : '#545454';

  const chartTheme = {
    // // backgroundColor: muiTheme.palette?.background?.paper ?? 'transparent', // includes axis labels
    // backgroundColor: muiTheme.palette?.background?.default ?? 'transparent', // includes axis labels
    // // backgroundColor: '#FF0000', // red
    grid: {
      show: true,
      // backgroundColor: muiTheme.palette.background?.default ?? 'transparent', // canvas excluding axis labels
      backgroundColor: muiTheme.palette.background?.paper ?? 'transparent', // canvas excluding axis labels
      // backgroundColor: '#FFFF00', // yellow
      // borderColor: ltGrey,
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
        show: true,
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
        show: true,
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
        lineStyle: {
          color: ltGrey,
        },
      },
    },
  };

  // console.log('getChartsTheme -> chartTheme: ', chartTheme);
  return chartTheme;
}
