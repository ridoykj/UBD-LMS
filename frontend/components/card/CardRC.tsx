// import './CardRC.css'

interface CardProps {
    title: string;
    content: string;
}

const CardRC = ({ content }: { content?: CardProps }) => {
    return (
        <>
            <div className="grid grid-cols-3 gap-6 m-6">
                <div className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]">
                    <div className="bg-white rounded-lg">
                        <div className="d-flex align-items-center p-2 ">
                            <p className="m-2 font-semibold text-slate-400">Total Profit</p>
                            <div className="flex flex-row">
                                <h5 className="mb-0 font-bold">$95,595</h5>
                                <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]">
                    <div className="bg-white rounded-lg ">
                        <div className="d-flex align-items-center p-2 ">
                            <p className="m-2 font-semibold text-slate-400">Total Profit</p>
                            <div className="flex flex-row">
                                <h5 className="mb-0 font-bold">$95,595</h5>
                                <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]">
                    <div className="bg-white rounded-lg ">
                        <div className="d-flex align-items-center p-2 ">
                            <p className="m-2 font-semibold text-slate-400">Total Profit</p>
                            <div className="flex flex-row">
                                <h5 className="mb-0 font-bold">$95,595</h5>
                                <p className="mb-0 ml-3 text-green-600 font-bold">+3.55%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardRC;
