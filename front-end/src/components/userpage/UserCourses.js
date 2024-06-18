import React from "react";
import ReactApexChart from "react-apexcharts";
import { enrolledCourses } from "../dummy/enrolled-courses";

const UserCourses = () => {
  return (
    <div>
      <h2 className="text-2xl font-serif font-bold mb-4">My Courses</h2>
      {enrolledCourses.map((course, index) => (
        <div
          key={index}
          className="mb-6 max-w-xl bg-gray-200 border border-b-gray-300 rounded-xl shadow-xl"
        >
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-36 mb-2 rounded-lg object-cover"
          />
          <div className="m-4">
            <h3 className="text-xl font-serif font-bold">{course.title}</h3>
            <p>Date Purchased: {course.datePurchased}</p>
          </div>
          <div className="flex flex-row justify-evenly">
            <div>
              <ReactApexChart
                options={{
                  chart: {
                    type: "radialBar",
                    height: 40,
                    offsetY: 2,
                    toolbar: {
                      show: false,
                    },
                  },
                  plotOptions: {
                    radialBar: {
                      startAngle: -90,
                      endAngle: 90,
                      hollow: {
                        size: "70%",
                      },
                      dataLabels: {
                        name: {
                          fontSize: "10px",
                        },
                        value: {
                          fontSize: "16px", // Adjusted font size
                        },
                        total: {
                          show: true,
                          label: "Your %",
                          fontSize: "14px", // Adjusted font size
                        },
                      },
                    },
                  },
                  colors: ["#2c5282"],
                }}
                series={[course.completed * 100]}
                type="radialBar"
              />
            </div>


            <div>
              <ReactApexChart
                options={{
                  chart: {
                    type: "radialBar",
                    height: 150,
                    offsetY: 10,
                    toolbar: {
                      show: false,
                    },
                  },
                  plotOptions: {
                    radialBar: {
                      startAngle: -90,
                      endAngle: 90,
                      hollow: {
                        size: "70%",
                      },
                      dataLabels: {
                        name: {
                          fontSize: "10px",
                        },
                        value: {
                          fontSize: "16px", // Adjusted font size
                        },
                        total: {
                          show: true,
                          label: "Avg User",
                          fontSize: "14px", // Adjusted font size
                        },
                      },
                    },
                  },
                  colors: ["#2c5282"],
                }}
                series={[course.avgComp * 100]}
                type="radialBar"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCourses;
