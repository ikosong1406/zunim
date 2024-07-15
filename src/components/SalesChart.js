// src/components/SalesChart.js
import React, { useState } from "react";
import Chart from "react-apexcharts";
import salesData from "./SalesData";
import Colors from "./Colors";

const SalesChart = () => {
  const [timeframe, setTimeframe] = useState("daily");

  const getChartData = () => {
    let labels = [];
    let data = [];

    if (timeframe === "daily") {
      labels = salesData.daily.map((item) => item.date);
      data = salesData.daily.map((item) => item.sales);
    } else if (timeframe === "weekly") {
      labels = salesData.weekly.map((item) => item.week);
      data = salesData.weekly.map((item) => item.sales);
    } else if (timeframe === "monthly") {
      labels = salesData.monthly.map((item) => item.month);
      data = salesData.monthly.map((item) => item.sales);
    }

    return {
      options: {
        chart: {
          id: "sales-chart",
        },
        xaxis: {
          categories: labels,
        },
        stroke: {
          curve: "smooth",
        },
        // title: {
        //   text: "Sales Overview",
        //   align: "left",
        // },
      },
      series: [
        {
          name: "Sales",
          data,
        },
      ],
    };
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ color: Colors.dark }}>Sales Graph</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "20%",
            paddingRight: 20,
            paddingBottom: 15,
          }}
        >
          <button onClick={() => setTimeframe("daily")}>Daily</button>
          <button onClick={() => setTimeframe("weekly")}>Weekly</button>
          <button onClick={() => setTimeframe("monthly")}>Monthly</button>
        </div>
      </div>
      <Chart
        options={getChartData().options}
        series={getChartData().series}
        type="line"
        height={300}
      />
    </div>
  );
};

export default SalesChart;
