import { useEffect, useState } from "react";
import Chart from "react-google-charts";

function PointsChartPage() {
  const [pointsChartData, setPointsChartData] = useState<number[]>([]);

  const fetchData = async () => {
    await fetch("http://localhost:8080/points-chart-data", {
      method: "GET",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPointsChartData(data);
      })
      .catch((error) => {
        console.log("Error fetching points chart data", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data: (string | number)[][] = [["Point Range", "Number of Drivers"]];
  for (let i = 0; i < pointsChartData.length; i++) {
    const pointRange: string = i * 100 + " - " + (i * 100 + 99);
    const numberOfDrivers: number = pointsChartData[i];
    data.push([pointRange, numberOfDrivers]);
  }

  return (
    <div>
      <h1 className="h1 text-center">Points Chart</h1>
      <Chart chartType="PieChart" data={data} />
    </div>
  );
}

export default PointsChartPage;
