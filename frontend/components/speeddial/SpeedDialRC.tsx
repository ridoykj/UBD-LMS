import React, { ReactElement, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

const buttonCss = 'relative w-[52px] h-[52px] text-gray-500 bg-white rounded-lg border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400';
const mainButtonCss = 'flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 ';
type ChildrenProps = {
    name: string;
    icon: ReactElement<any, any>;
    onClick: () => void;
}

const SpeedDialRC = ({ children }: { children: ChildrenProps[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-6 end-10 group">
            {isOpen && (
                <div className="flex flex-col items-center mb-4 space-y-2">
                    {
                        children.map((child, index) => (
                            <button key={index} type="button" className={buttonCss} onClick={child.onClick}>
                                {child.icon && React.cloneElement(child.icon, { className: "w-5 h-5 mx-auto" })}
                                <span className="absolute block mb-px text-sm font-medium -translate-y-1/2 -start-14 top-1/2 p-1 bg-blue-500 rounded-lg text-white text-right">{child.name}</span>
                            </button>)
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