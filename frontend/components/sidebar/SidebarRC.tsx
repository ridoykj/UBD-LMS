import React, { useState } from "react";
import { Link } from "react-router-dom";


type subItemType = { name: string, route: string}

const SidebarRC = ({ name, route }: { name: string, route: string, subItems?: subItemType[] }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <button onClick={toggleDropdown}>Dropdown</button>
                    {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            <li>
                                <Link to="/dropdown-item-1">Dropdown Item 1</Link>
                            </li>
                            <li>
                                <Link to="/dropdown-item-2">Dropdown Item 2</Link>
                            </li>
                            <li>
                                <Link to="/dropdown-item-3">Dropdown Item 3</Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default SidebarRC;
