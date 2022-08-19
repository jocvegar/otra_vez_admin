import { useUsers } from "../../services/user.service";
import _groupBy from "lodash/groupBy";

const { users } = useUsers();
export const chartColors = {
  default: {
    primary: "#00D1B2",
    info: "#209CEE",
    danger: "#FF3860",
  },
};

const randomChartData = (n) => {
  const data = [];

  for (let i = 0; i < n; i++) {
    data.push(Math.round(Math.random() * 200));
  }

  return data;
};

const datasetObject = (color, points) => {
  return {
    fill: false,
    borderColor: chartColors.default[color],
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: chartColors.default[color],
    pointBorderColor: "rgba(255,255,255,0)",
    pointHoverBackgroundColor: chartColors.default[color],
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: randomChartData(points),
    tension: 0.5,
    cubicInterpolationMode: "default",
  };
};

const usersetObject = (color, points) => {
  return {
    fill: false,
    borderColor: chartColors.default[color],
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: chartColors.default[color],
    pointBorderColor: "rgba(255,255,255,0)",
    pointHoverBackgroundColor: chartColors.default[color],
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: points,
    tension: 0.5,
    cubicInterpolationMode: "default",
  };
};

export const sampleChartData = (points = 9) => {
  const labels = [];

  for (let i = 1; i <= points; i++) {
    labels.push(`0${i}`);
  }

  return {
    labels,
    datasets: [
      datasetObject("primary", points),
      datasetObject("info", points),
      datasetObject("danger", points),
    ],
  };
};

export const usersChartData = () => {
  const groupBy = _groupBy(users.value, "department");
  const labels = Object.keys(groupBy);
  const points = Object.values(groupBy).map((point) => point.length);

  return {
    labels,
    datasets: [usersetObject("primary", points)],
  };
};
