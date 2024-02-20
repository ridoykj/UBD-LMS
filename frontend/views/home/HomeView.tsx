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

  const placeItemsE = [
    {
      title: 'Place',
      content:
        <>
          <div>
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
          <div>
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

          {/* <div>
            <h5 className="mb-0 font-bold text-xl"> Profile: {dashData?.profiles}</h5>
            <h5 className="mb-0 font-bold text-xl"> Department: {dashData?.departments}</h5>
            <h5 className="mb-0 font-bold text-xl"> Programme: {dashData?.programmes}</h5>
            <h5 className="mb-0 font-bold text-xl"> Batch: {dashData?.batches}</h5>
            <h5 className="mb-0 font-bold text-xl"> Course: {dashData?.courses}</h5>
          </div> */}
        </>
    },
  ]

  const placeItems = [
    {
      title: 'Sector',
      content:
        <>
          <h5 className="mb-0 font-bold text-2xl">{dashData?.sectors}</h5>
          {/* <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p> */}
        </>
    },
    {
      title: 'Building',
      content:
        <>
          <h5 className="mb-0 font-bold text-2xl">{dashData?.buildings}</h5>
          {/* <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p> */}
        </>
    },
    {
      title: 'Floor',
      content:
        <>
          <h5 className="mb-0 font-bold text-2xl">{dashData?.floors}</h5>
          {/* <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p> */}
        </>
    },
    {
      title: 'Room',
      content:
        <>
          <h5 className="mb-0 font-bold text-2xl">{dashData?.rooms}</h5>
          {/* <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p> */}
        </>
    },
  ]

  const orgItems = [
    {
      title: 'Profile',
      content: <h5 className="mb-0 font-bold text-2xl">{dashData?.profiles}</h5>
    }, {
      title: 'Department',
      content: <h5 className="mb-0 font-bold text-2xl">{dashData?.departments}</h5>
    }, {
      title: 'Programme',
      content: <h5 className="mb-0 font-bold text-2xl">{dashData?.programmes}</h5>
    }, {
      title: 'Batch',
      content: <h5 className="mb-0 font-bold text-2xl">{dashData?.batches}</h5>
    }, {
      title: 'Course',
      content: <h5 className="mb-0 font-bold text-2xl">{dashData?.courses}</h5>
    },
  ]

  const userItems = [
    {
      title: 'Coordinator',
      content: <h5 className="mb-0 font-bold text-2xl">{dashData?.coordinators}</h5>
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
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-200 pb-2">Place</p>
          {/* <CardRC contents={placeItems} /> */}
          <CardRC contents={placeItemsE} />
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-200 py-2">Organization</p>
          <CardRC contents={orgItems} />
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-200 py-2">Users</p>
          <CardRC contents={userItems} />
        </div>
      </div>
    </>
  )
}


