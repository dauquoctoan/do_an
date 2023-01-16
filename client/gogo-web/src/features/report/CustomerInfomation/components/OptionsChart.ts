import { IDataChart } from '../InterfaceCustomerReport'

export const oCountCustomerLineChart = (
  data?: IDataChart[],
  categories?: Array<string>,
  type?: string
) => ({
  chart: {
    type: type,
    style: {
      fontFamily: 'Poppins, sans-serif',
    },
  },
  title: {
    text: 'TỔNG SỐ KHÁCH THAM GIA CÁC CHƯƠNG TRÌNH',
  },

  yAxis: {
    title: {
      text: 'Số lượng',
    },
  },

  xAxis: {
    categories: categories,
  },
  legend: {
    itemStyle: {
      font: '9pt Trebuchet MS, Verdana, sans-serif',
    },
    itemHoverStyle: {
      color: 'gray',
    },
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
        enabled: false,
      },
    },
    line: {
      dataLabels: {
        enabled: true,
        style: {
          font: '9pt Trebuchet MS, Verdana, sans-serif',
        },
      },
    },
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    shared: true,
    useHTML: true,
  },
  series: data,

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      },
    ],
  },
})

export const oProvinceVicinitytPieChart = (data?: any) => ({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    style: {
      fontFamily: 'Poppins, sans-serif',
    },
    plotShadow: false,
    type: 'pie',
  },
  title: {
    text: 'TỈ LỆ KHÁCH HÀNG CÁC TỈNH LÂN CẬN',
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  accessibility: {
    point: {
      valueSuffix: '%',
    },
  },
  legend: {
    itemStyle: {
      font: '9pt Trebuchet MS, Verdana, sans-serif',
    },
    itemHoverStyle: {
      color: 'gray',
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<br>{point.percentage:.1f} %',
        distance: -50,
        filter: {
          property: 'percentage',
          operator: '>',
          value: 4,
        },
      },
      showInLegend: true,
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      name: 'Brands',
      colorByPoint: true,
      data: data,
    },
  ],
})

export const oResidentLBColumnChart = (data?: any) => ({
  chart: {
    type: 'column',
    style: {
      fontFamily: 'Poppins, sans-serif',
    },
  },
  title: {
    text: 'TỈ LỆ DÂN CƯ QUẬN LONG BIÊN',
  },
  xAxis: {
    type: 'category',
    crosshair: true,
    labels: {
      style: {
        fontSize: '9px',
      },
    },
  },
  yAxis: {
    title: {
      text: '%',
    },
  },
  credits: {
    enabled: false,
  },
  legend: {
    itemStyle: {
      font: '9pt Trebuchet MS, Verdana, sans-serif',
    },
    itemHoverStyle: {
      color: 'gray',
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
      dataLabels: {
        enabled: true,
      },
    },
  },
  series: [
    {
      name: 'Tỉ lệ dân cư',
      data: data,
    },
  ],
})

export const oAgePieChart = (data?: any) => {
  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      style: {
        fontFamily: 'Poppins, sans-serif',
      },
      type: 'pie',
    },
    title: {
      text: 'TỈ LỆ ĐỘ TUỔI KHÁCH HÀNG TỚI SAVICO',
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>',
    },
    legend: {
      itemStyle: {
        font: '9pt Trebuchet MS, Verdana, sans-serif',
      },
      itemHoverStyle: {
        color: 'gray',
      },
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<br>{point.percentage:.1f} %',
          distance: -50,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4,
          },
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Chiếm',
        colorByPoint: true,
        data: data,
      },
    ],
  }
}

export const oGenderPieChart = (data?: any) => {
  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      style: {
        fontFamily: 'Poppins, sans-serif',
      },
    },
    title: {
      text: 'TỈ LỆ GIỚI TÍNH KHÁCH HÀNG TỚI SAVICO',
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>',
    },
    legend: {
      itemStyle: {
        font: '9pt Trebuchet MS, Verdana, sans-serif',
      },
      itemHoverStyle: {
        color: 'gray',
      },
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<br>{point.percentage:.1f} %',
          distance: -50,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4,
          },
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: data,
      },
    ],
  }
}

export const oChanelGenderPieChart = (data?: any) => {
  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      style: {
        fontFamily: 'Poppins, sans-serif',
      },
      type: 'pie',
    },
    title: {
      text: 'TỈ LỆ CÁC KÊNH KHÁCH HÀNG BIẾT TỚI SAVICO',
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>',
    },
    legend: {
      itemStyle: {
        font: '9pt Trebuchet MS, Verdana, sans-serif',
      },
      itemHoverStyle: {
        color: 'gray',
      },
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<br>{point.percentage:.1f} %',
          distance: -50,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4,
          },
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: data,
      },
    ],
  }
}
