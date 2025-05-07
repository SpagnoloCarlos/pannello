import { NavLink, type NavLinkProps } from "react-router";

const SidebarLink = ({ children, to, className = "" }: NavLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 py-2 px-4 ${
          isActive ? "bg-gray-950" : "bg-gray-900"
        } rounded-md transition-color duration-200 hover:bg-gray-950 ${className}`
      }
    >
      {children}
    </NavLink>
  );
};

export default SidebarLink;
