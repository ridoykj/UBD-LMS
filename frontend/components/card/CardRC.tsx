// import './CardRC.css'

interface CardProps {
    title: string;
    content: any;
}

const CardRC = ({ contents }: { contents: CardProps[] }) => {
    return (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6 m-auto place-items-center">
            {
                contents.map((content, index) => {
                    return (
                        <div key={index} className="drop-shadow-[0_5px_5px_#dfe7ff] w-full">
                            <div className="bg-white rounded-lg">
                                <div className="d-flex align-items-center p-2">
                                    <p className="m-2 text-slate-400 font-sans">{content.title}</p>
                                    <div className="flex flex-row p-2">
                                        {content.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default CardRC;
