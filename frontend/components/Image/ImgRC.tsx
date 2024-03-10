import { ReactEventHandler } from "react";

const ImgRC = ({ imageUrl }: { imageUrl: string }) => {
    const handleError: ReactEventHandler<HTMLImageElement> = (e) => {
        if (e.target instanceof HTMLImageElement) {
            e.target.onerror = null;
            e.target.src = `images/default/no_image.png`;
        }
    };
    return (
        <img className="w-8 h-8 shrink-0 rounded-full ring-2 ring-blue-500 object-cover bg-no-repeat" src={imageUrl} alt="no_image" onError={handleError} />
    );
};

export default ImgRC;
