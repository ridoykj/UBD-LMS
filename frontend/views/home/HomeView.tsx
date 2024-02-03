import CardRC from "Frontend/components/card/CardRC";

export default function HomeView() {

  const items = [
    {
      title: 'Sector',
      content:
        <>
          <h5 className="mb-0 font-bold text-xl">2</h5>
          <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p>
        </>
    },
    {
      title: 'Building',
      content:
        <>
          <h5 className="mb-0 font-bold text-xl">6</h5>
          <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p>
        </>
    },
    {
      title: 'Floor',
      content:
        <>
          <h5 className="mb-0 font-bold text-xl">50</h5>
          <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p>
        </>
    },
    {
      title: 'Room',
      content:
        <>
          <h5 className="mb-0 font-bold text-xl">36</h5>
          <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p>
        </>
    },
  ]

  return (
    <>
      <div className="bg-[#f9fbfe] h-full">
        <div className="p-6">
          <CardRC contents={items} />
        </div>
      </div>
    </>
  )
}


