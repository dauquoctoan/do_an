import { IDataChart } from "features/report/CustomerInfomation/InterfaceCustomerReport";

export const AnswerReportBarChart = (
    data?: IDataChart[],
  ) => ({
    chart: {
      type: 'column',
      style: {
        fontFamily: 'Poppins, sans-serif',
      },
    },
    title: {
      text: 'THỐNG KÊ SỐ LƯỢNG CÂU TRẢ LỜI',
    },
    xAxis: {
      type: 'category',
      crosshair: true,
      title: {
        text: '',
      },
      labels: {
        style: {
          fontSize: '9px',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Số lượng câu trả lời',
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
        name: 'Số lượng câu trả lời',
        data: data,
      },
    ],
  })