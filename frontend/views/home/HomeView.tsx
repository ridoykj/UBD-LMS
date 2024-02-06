import CardRC from "Frontend/components/card/CardRC";

export default function HomeView() {

  const placeItems = [
    {
      title: 'Sector',
      content:
        <>
          <h5 className="mb-0 font-bold text-2xl">2</h5>
          {/* <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p> */}
        </>
    },
    {
      title: 'Building',
      content:
        <>
          <h5 className="mb-0 font-bold text-2xl">6</h5>
          {/* <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p> */}
        </>
    },
    {
      title: 'Floor',
      content:
        <>
          <h5 className="mb-0 font-bold text-2xl">50</h5>
          {/* <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p> */}
        </>
    },
    {
      title: 'Room',
      content:
        <>
          <h5 className="mb-0 font-bold text-2xl">36</h5>
          {/* <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p> */}
        </>
    },
  ]

  const orgItems = [
    {
      title: 'Profile',
      content:
        <>
          <h5 className="mb-0 font-bold text-2xl">2</h5>
          {/* <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p> */}
        </>
    }, {
      title: 'Department',
      content:
        <>
          <h5 className="mb-0 font-bold text-2xl">6</h5>
          {/* <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p> */}
        </>
    }, {
      title: 'Programme',
      content:
        <>
          <h5 className="mb-0 font-bold text-2xl">50</h5>
          {/* <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p> */}
        </>
    }, {
      title: 'Batch',
      content:
        <>
          <h5 className="mb-0 font-bold text-2xl">36</h5>
          {/* <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p> */}
        </>
    }, {
      title: 'Course',
      content:
        <>
          <h5 className="mb-0 font-bold text-2xl">36</h5>
          {/* <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p> */}
        </>
    },
  ]

  return (
    <>
      <div className="bg-[#f9fbfe] h-full">
        <div className="p-6">
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-200 pb-2">Place</p>
          <CardRC contents={placeItems} />
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-200 py-2">Organization</p>
          <CardRC contents={orgItems} />
        </div>
      </div>
    </>
  )
}


