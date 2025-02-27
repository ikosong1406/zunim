import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { fetchOrders } from "./OrdersData";
import Colors from "./Colors";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isoWeeksInYear from "dayjs/plugin/isoWeeksInYear";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(isoWeek);
dayjs.extend(isoWeeksInYear);
dayjs.extend(advancedFormat);

const SalesChart = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders(); // Fetch data from backend
        setOrders(data); // Store data in state
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const [timeframe, setTimeframe] = useState("daily");
  const [chartData, setChartData] = useState({ options: {}, series: [] });

  useEffect(() => {
    const getChartData = () => {
      let labels = [];
      let data = [];
      let salesData = {};

      if (timeframe === "daily") {
        salesData = orders.reduce((acc, order) => {
          const date = dayjs(order.date).format("YYYY-MM-DD");
          acc[date] = (acc[date] || 0) + order.total;
          return acc;
        }, {});
        labels = Object.keys(salesData).sort(
          (a, b) => new Date(a) - new Date(b)
        );
        data = labels.map((label) => salesData[label]);
      } else if (timeframe === "weekly") {
        salesData = orders.reduce((acc, order) => {
          const week = dayjs(order.date).isoWeek();
          const year = dayjs(order.date).year();
          const weekLabel = `${year}-W${week}`;
          acc[weekLabel] = (acc[weekLabel] || 0) + order.total;
          return acc;
        }, {});
        labels = Object.keys(salesData).sort((a, b) => {
          const [yearA, weekA] = a.split("-W");
          const [yearB, weekB] = b.split("-W");
          return new Date(yearA, 0, weekA * 7) - new Date(yearB, 0, weekB * 7);
        });
        data = labels.map((label) => salesData[label]);
      } else if (timeframe === "monthly") {
        salesData = orders.reduce((acc, order) => {
          const month = dayjs(order.date).format("YYYY-MM");
          acc[month] = (acc[month] || 0) + order.total;
          return acc;
        }, {});
        labels = Object.keys(salesData).sort(
          (a, b) => new Date(a) - new Date(b)
        );
        data = labels.map((label) => salesData[label]);
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
        },
        series: [
          {
            name: "Sales",
            data,
          },
        ],
      };
    };

    setChartData(getChartData());
  }, [timeframe]);

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
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={300}
      />
    </div>
  );
};

export default SalesChart;
