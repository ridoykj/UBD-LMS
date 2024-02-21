import CardRC from "Frontend/components/card/CardRC";
import IDashBoardRptDTO from "Frontend/generated/com/itbd/application/dto/custom/IDashBoardRptDTO";
import { OrganizationDtoCrudService } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";

import Chart from "react-apexcharts";

export default function HomeView() {
  const [dashData, setDashData] = useState<IDashBoardRptDTO>();

  const data = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  };

  const placeItems = [
    {
      title: 'Place',
      content:
        <>
          <div className="w-full h-full">
            <Chart
              options={{
                chart: {
                  id: "basic-bar"
                },
                xaxis: {
                  categories: ['Sector', 'Building', 'Floor', 'Room']
                },
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    horizontal: true,
                  }
                },
                dataLabels: {
                  enabled: true
                },
              }}
              series={[
                {
                  name: "Place",
                  data: [
                    dashData?.sectors ?? 0,
                    dashData?.buildings ?? 0,
                    dashData?.floors ?? 0,
                    dashData?.rooms ?? 0
                  ]
                }
              ]}
              type="bar"
              height={200} />
          </div>
        </>
    },
    {
      title: 'Organization',
      content:
        <>
          <div className="w-full h-full">
            <Chart
              options={{
                chart: {
                  id: "basic-bar"
                },
                xaxis: {
                  categories: ['Profile', 'Department', 'Programme', 'Batch', 'Course']
                },
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    horizontal: true,
                  }
                },
                dataLabels: {
                  enabled: true
                },
              }}
              series={[
                {
                  name: "Organization",
                  data: [
                    dashData?.profiles ?? 0,
                    dashData?.departments ?? 0,
                    dashData?.programmes ?? 0,
                    dashData?.batches ?? 0,
                    dashData?.courses ?? 0
                  ]
                }
              ]}
              type="bar"
              height={200} />
          </div>
        </>
    },
    {
      title: 'Users',
      content:
        <>
          <div className="w-full h-full">
            <Chart
              options={{
                chart: {
                  id: "basic-bar"
                },
                xaxis: {
                  categories: ['Authnication', 'Coordinator', 'Student',]
                },
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    horizontal: true,
                  }
                },
                dataLabels: {
                  enabled: true
                },
              }}
              series={[
                {
                  name: "Organization",
                  data: [
                    0,
                    dashData?.coordinators ?? 0,
                    0,
                  ]
                }
              ]}
              type="bar"
              height={200} />
          </div>
        </>
    },
  ]

  useEffect(() => {
    OrganizationDtoCrudService.getDashBoardRpt()
      .then((res) => {
        console.log('allData', res);
        setDashData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <>
      <div className="bg-[#f9fbfe] h-full">
        <div className="p-6">
          <CardRC contents={placeItems} />
        </div>
      </div>
    </>
  )
}


