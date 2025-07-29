import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#007bff", "#28a745", "#ffc107"]; // Màu Bootstrap

const ChiTieuChart = ({ userId }) => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    fetch(`https://backendflower-9t22.onrender.com/api/ThongKe/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const chartData = res.data.map((item) => ({
            thang: `T${item.thang}/${item.nam}`,
            tongChiTieu: item.tongChiTieu,
          }));
          setData(chartData);
        }
      })
      .catch((err) => console.error("Lỗi khi lấy thống kê:", err));
  }, [userId]);

  const renderChart = () => {
    if (chartType === "bar") {
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="thang" />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toLocaleString()} đ`} />
          <Legend />
          <Bar dataKey="tongChiTieu" fill="#007bff" />
        </BarChart>
      );
    } else if (chartType === "pie") {
      return (
        <PieChart>
          <Tooltip formatter={(value) => `${value.toLocaleString()} đ`} />
          <Legend />
          <Pie
            data={data}
            dataKey="tongChiTieu"
            nameKey="thang"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      );
    } else if (chartType === "area") {
      return (
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="thang" />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toLocaleString()} đ`} />
          <Legend />
          <Area
            type="monotone"
            dataKey="tongChiTieu"
            stroke="#28a745"
            fill="#c3f8d2"
          />
        </AreaChart>
      );
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">📊 Chi tiêu 3 tháng gần nhất</h3>
      <div className="text-center mb-3">
        <div className="btn-group">
          <button
            className={`btn btn-${
              chartType === "bar" ? "primary" : "outline-primary"
            }`}
            onClick={() => setChartType("bar")}
          >
            Biểu đồ cột
          </button>

          <button
            className={`btn btn-${
              chartType === "area" ? "warning" : "outline-warning"
            }`}
            onClick={() => setChartType("area")}
          >
            Biểu đồ miền
          </button>
        </div>
      </div>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>{renderChart()}</ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChiTieuChart;
