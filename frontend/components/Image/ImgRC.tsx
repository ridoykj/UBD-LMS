
import { useEffect, useRef, useState } from "react";
const ImgRC = ({ imageUrl }: { imageUrl: string }) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [imageSrc, setImageSrc] = useState<boolean>();
    useEffect(() => {
        if (imageRef.current && imageSrc) {
            imageRef.current.src = `images/default/no_image.png`;
        }
    }, [imageSrc]);
    return (
        <img ref={imageRef} className="w-8 h-8 shrink-0 rounded-full ring-2 ring-blue-500 object-cover bg-no-repeat" src={imageUrl} alt="no_image" onError={() => { setImageSrc(true); }} />
    );
};

export default ImgRC;
