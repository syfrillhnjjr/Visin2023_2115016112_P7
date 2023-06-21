google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(getSpreadsheetData);

function getSpreadsheetData() {
  var spreadsheets = [
    // Spreadsheet 1
    {
      spreadsheetId: '1kh865J7uGpI_FglAOGmOFKGGZatCn6Cc5oi-0l_0vgE',
      range: 'TS!A16:C20',
      chartId: 'chart1',
      title: 'Data perbandingan Penjualan Product Makanan Ringan Qty dan TotalPrice',
      width: 400,
      height: 300,
      chartType: 'BarChart',
      vAxis: '',
      hAxis: 'Products'
    },
    // Spreadsheet 2
    {
      spreadsheetId: '1kh865J7uGpI_FglAOGmOFKGGZatCn6Cc5oi-0l_0vgE',
      range: 'TS!A1:C13',
      chartId: 'chart2',
      title: 'Data Perbandingan Bulan Januari sampai bulan November',
      width: 400,
      height: 300,
      chartType: 'LineChart',
      vAxis: '',
      hAxis: 'Month'
    },
    // Spreadsheet 3
    { 
      spreadsheetId: '1tpXsHcZTL5dNl6LFahsH1LQAOb1hpycNmCAYfyirOSs',
      range: 'Data2!A1:C11',
      chartId: 'chart3',
      title: 'Data Perbandingan Kota UnitPrice dan TotalPrice',
      width: 400,
      height: 300,
      chartType: 'AreaChart',
      vAxis: '',
      hAxis: 'City'
    },
    // Spreadsheet 4
    {
      spreadsheetId: '1tpXsHcZTL5dNl6LFahsH1LQAOb1hpycNmCAYfyirOSs',
      range: 'Data3!A1:B6',
      chartId: 'chart4',
      title: 'Data Perbandingan Penjualan Total Price ',
      width: 400,
      height: 300,
      chartType: 'ColumnChart',
      vAxis: 'Product',
      hAxis: 'Produuct Whole Wheat jumlah Total Price Lebih Banyak dari yang lainnya'
    },
    // Tambahkan spreadsheet dan diagram lainnya di sini
  ];

  spreadsheets.forEach(function (spreadsheet) {
    var query = new google.visualization.Query(
      'https://docs.google.com/spreadsheets/d/' +
        spreadsheet.spreadsheetId +
        '/gviz/tq?gid=0&range=' +
        spreadsheet.range
    );
    query.send(function (response) {
      handleQueryResponse(response, spreadsheet);
    });
  });
}

function handleQueryResponse(response, spreadsheet) {
  if (response.isError()) {
    console.error('Error: ' + response.getMessage());
    return;
  }

  var data = response.getDataTable();
  drawChart(data, spreadsheet);
}

function drawChart(data, spreadsheet) {
  var options = {
    title: spreadsheet.title,
    width: spreadsheet.width,
    height: spreadsheet.height,
    vAxis: { title: spreadsheet.vAxis },
    hAxis: { title: spreadsheet.hAxis }
  };

  var chart;
  if (spreadsheet.chartType === 'ColumnChart') {
    chart = new google.visualization.ColumnChart(
      document.getElementById(spreadsheet.chartId)
    );
  } else if (spreadsheet.chartType === 'BarChart') {
    chart = new google.visualization.BarChart(
      document.getElementById(spreadsheet.chartId)
    );
  } else if (spreadsheet.chartType === 'LineChart') {
    chart = new google.visualization.LineChart(
      document.getElementById(spreadsheet.chartId)
    );
  } else if (spreadsheet.chartType === 'AreaChart') {
    chart = new google.visualization.AreaChart(
      document.getElementById(spreadsheet.chartId)
    );
  }
  
  chart.draw(data, options);
}
