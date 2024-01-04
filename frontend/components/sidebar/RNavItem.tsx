import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaRegUser } from "react-icons/fa";
const navCss = `relative flex flex-row items-center h-11 border-l-4 border-transparent pr-6 text-gray-600 
focus:outline-none 
hover:bg-gray-50 hover:text-gray-800 hover:border-indigo-500 hover:text-indigo-500 hover:font-bold hover:no-underline `

type subItemType = { name: string, icon: any, route: string }

const navLinkClasses = ({ isActive }: any) => {
    return `${isActive ? 'bg-gray-100 border-l-green-600 text-green-600 font-bold ' : ''}${navCss}`;
};

function NavLinkItem({ name, icon, route }: { name: string, icon: any, route: string, }) {
    const handleClick = () => {
        document.title = name;
    };

    return (
        <NavLink className={navLinkClasses} to={route} onClick={handleClick}>
            <div>
                <span className="inline-flex justify-center items-center ml-4">
                    {icon}
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">{name}</span>
            </div>
        </NavLink>
    );
}

// Component to display the Chevron icon based on the isOpen state
function ChevronIcon({ isOpen }: { isOpen: boolean }) {
    return isOpen ? <FaChevronUp size={20} className="pr-2" /> : <FaChevronDown size={20} className="pr-2" />;
}

// Dropdown button component
function DropdownButton({ name, icon, isDropdownOpen, toggleDropdown }: { name: string, icon: any, isDropdownOpen: boolean, toggleDropdown: () => void }) {
    return (
        <button className={`${navCss} w-full flex justify-between items-center`} onClick={toggleDropdown}>
            <div className="flex items-center">
                <span className="inline-flex justify-center items-center ml-4">
                    {icon}
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">{name}</span>
            </div>
            <ChevronIcon isOpen={isDropdownOpen} />
        </button>
    );
}

// Component to display the list of sub items
function SubItemList({ subItems }: { subItems: subItemType[] }) {
    return (
        <ul className="bg-gray-50 ml-4">
            {subItems.map((item) => (
                <li key={item.route}>
                    <NavLinkItem name={item.name} icon={item.icon} route={item.route} />
                </li>
            ))}
        </ul>
    );
}

function RNavItem({ name, icon, route, subItems }: { name: string, icon: any, route: string, subItems?: subItemType[] }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <>
            {subItems && subItems.length > 0 ? (
                <>
                    <DropdownButton name={name} icon={icon} isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />
                    {isDropdownOpen && <SubItemList subItems={subItems} />}
                </>
            ) : (
                <NavLinkItem name={name} icon={icon} route={route} />
            )}
        </>
    );
}

export default RNavItem;