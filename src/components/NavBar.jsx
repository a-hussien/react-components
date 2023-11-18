import { NavLink } from "react-router-dom";

const links = [
    { name: 'Main', to: '/' },
    { name: 'Auto Complete', to: '/auto-complete' },
    { name: 'Text Editor', to: '/text-editor' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const NavBar = () => (
    <nav className="bg-white shadow dark:bg-gray-800">
        <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
            {links.map((link) => (
                <NavLink
                key={link.name}
                to={link.to}
                className={({isActive}) => classNames(
                    isActive
                    ? 'border-b-2 border-blue-500 font-bold'
                    : 'text-gray-800 transition-colors duration-300 transform mx-1.5 sm:mx-6'
                )}
                >
                {link.name}
                </NavLink>
            ))}
        </div>
    </nav>
)

export default NavBar