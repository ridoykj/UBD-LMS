import CardRC from "Frontend/components/card/CardRC";

export default function HomeView() {

  const items = [
    {
      title: 'Total Profit',
      content:
        <>
          <h5 className="mb-0 font-bold text-xl">$95,595</h5>
          <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p>
        </>
    },
    {
      title: 'Total Profit',
      content:
        <>
          <h5 className="mb-0 font-bold text-xl">$95,595</h5>
          <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p>
        </>
    },
    {
      title: 'Total Profit',
      content:
        <>
          <h5 className="mb-0 font-bold text-xl">$95,595</h5>
          <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p>
        </>
    },
    {
      title: 'Total Profit',
      content:
        <>
          <h5 className="mb-0 font-bold text-xl">$95,595</h5>
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


