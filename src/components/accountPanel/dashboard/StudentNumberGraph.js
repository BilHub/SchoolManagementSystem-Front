import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const StudentNumberGraph = () => {
  const StudentsNumberData = [
    {
      name: "August",
      numberOfStudents: 10,
    },
    {
      name: "September",
      numberOfStudents: 24,
    },
    {
      name: "October",
      numberOfStudents: 56,
    },
    {
      name: "November",
      numberOfStudents: 78,
    },
    {
      name: "December",
      numberOfStudents: 109,
    },
    {
      name: "January",
      numberOfStudents: 124,
    },
    {
      name: "February",
      numberOfStudents: 156,
    },
    {
      name: "March",
      numberOfStudents: 210,
    },
    {
      name: "April",
      numberOfStudents: 280,
    },
    {
      name: "May",
      numberOfStudents: 310,
    },
    {
      name: "June",
      numberOfStudents: 210,
    },
    {
      name: "July",
      numberOfStudents: 110,
    },
  ];

  return (
    <div>
      <LineChart width={600} height={300} data={StudentsNumberData}>
        <Line
          type="monotone"
          dataKey="numberOfStudents"
          stroke="#cbac21"
          strokeWidth={4}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};

export default StudentNumberGraph;
