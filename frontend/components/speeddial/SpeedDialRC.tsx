import React, { ReactElement, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { Tooltip as ReactTooltip } from "react-tooltip";

const buttonCss = 'relative w-[52px] h-[52px] text-gray-500 bg-white rounded-full border border-gray-200 hover:text-gray-900 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400';
const mainButtonCss = 'flex items-center justify-center text-white bg-pink-600 rounded-full w-14 h-14 hover:bg-pink-800 dark:bg-pink-600 dark:hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 focus:outline-none dark:focus:ring-pink-800 ';
type ChildrenProps = {
    name: string;
    icon: ReactElement<any, any>;
    onClick: () => void;
}

const SpeedDialRC = ({ children }: { children: ChildrenProps[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="absolute bottom-5 end-5 group">
            {isOpen && (
                <div className="flex flex-col items-center mb-4 space-y-2">
                    {
                        children.map((child, index) => (
                            <div key={`speed_dial_child_${index}`}>
                                <button type="button" className={buttonCss} data-tooltip-id={`speed_dial_child_${index}`} onClick={child.onClick}>
                                    {child.icon && React.cloneElement(child.icon, { className: "w-5 h-5 mx-auto" })}
                                    <span className="sr-only">{child.name}</span>
                                </button>
                                <ReactTooltip id={`speed_dial_child_${index}`} place="left" content={child.name} />
                            </div>)
                        )
                    }
                </div>)
            }
            <button type="button" className={mainButtonCss} onClick={toggleOpen}>
                <FaPlus className="w-5 h-5 transition-transform group-hover:rotate-45" />
                <span className="sr-only">Open actions menu</span>
            </button>
        </div>
    );
};

export default SpeedDialRC;