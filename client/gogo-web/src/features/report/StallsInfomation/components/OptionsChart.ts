export const oTotalOrderColumnChart = (
  data?: any,
  label = 'TỔNG SỐ HOÁ ĐƠN CỦA CÁC GIAN HÀNG',
  text = 'Gian hàng',
  yTitle = 'Số hoá đơn',
  series = 'Số hoá đơn',
) => ({
  chart: {
    type: 'column',
    style: {
      fontFamily: 'Poppins, sans-serif',
    },
  },
  title: {
    text: label,
  },
  xAxis: {
    type: 'category',
    crosshair: true,
    title: {
      text: text,
    },
    labels: {
      style: {
        fontSize: '9px',
      },
    },
  },
  yAxis: {
    title: {
      text: yTitle,
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
      name: series,
      data: data,
    },
  ],
})

export const oTotalExchangeGiftLineChart = (
  data?: any,
  title?: string,
  seriesName?: string
) => ({
  chart: {
    style: {
      fontFamily: 'Poppins, sans-serif',
    },
  },
  title: {
    text: title || 'TỔNG GIÁ TRỊ HOÁ ĐƠN ĐỔI QUÀ',
  },

  yAxis: {
    title: {
      text: 'Số lượng',
    },
  },

  xAxis: {
    type: 'category',
    crosshair: true,
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
  series: [
    {
      name: seriesName || 'Giá trị hoá đơn đổi quà',
      colorByPoint: true,
      data: data,
    },
  ],

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

export const oTotalExchangeGiftEventLineChart = (data?: any) => ({
  chart: {
    style: {
      fontFamily: 'Poppins, sans-serif',
    },
  },
  title: {
    text: 'TỔNG SỐ HOÁ ĐƠN ĐỔI QUÀ TRONG CHƯƠNG TRÌNH',
  },

  yAxis: {
    title: {
      text: 'Số lượng',
    },
  },

  xAxis: {
    type: 'category',
    crosshair: true,
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
  series: [
    {
      name: 'Tống số hoá đơn đổi quà',
      colorByPoint: true,
      data: data,
    },
  ],

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
