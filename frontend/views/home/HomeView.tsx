import CardRC from "Frontend/components/card/CardRC";
import IDashBoardRptDTO from "Frontend/generated/com/itbd/application/dto/custom/IDashBoardRptDTO";
import { OrganizationDtoCrudService } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";

export default function HomeView() {
  const [dashData, setDashData] = useState<IDashBoardRptDTO>();

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
          <CardRC contents={placeItems} />
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-200 py-2">Organization</p>
          <CardRC contents={orgItems} />
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-200 py-2">Users</p>
          <CardRC contents={userItems} />
        </div>
      </div>
    </>
  )
}


