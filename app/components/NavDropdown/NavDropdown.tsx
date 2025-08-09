import { Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import WrapperDropdown from '../WrapperDropdown';
import { useState } from 'react';

type NavOption = {
  name: string;
  path: string;
  isActive: boolean;
};

type NavDropdownProps = {
  options: NavOption[];
};

export default function NavDropdown({ options }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  const openDropdown = () => setIsOpen(true);

  const activeOption = options.find((op) => op.isActive);
  return (
    <WrapperDropdown
      isOpen={isOpen}
      handleClose={closeDropdown}
      handleOpen={openDropdown}
      toggleContent={
        <div className="flex items-center justify-between px-3 py-1 border rounded border-neutral-400 dark:border-gray-700 dark:bg-gray-800">
          {activeOption?.name}
          <ChevronDown
            size={16}
            className="text-gray-700 dark:dark:text-gray-400"
          />
        </div>
      }
    >
      <nav className="pt-1.5">
        <ul className="rounded shadow-3xl dark:shadow-none bg-white dark:bg-gray-800">
          {options.map((op) => (
            <NavDropdownOption
              key={op.name}
              {...op}
              handleCloseDropdown={closeDropdown}
            />
          ))}
        </ul>
      </nav>
    </WrapperDropdown>
  );
}

function NavDropdownOption({
  name,
  path,
  isActive,
  handleCloseDropdown,
}: NavOption & { handleCloseDropdown: () => void }) {
  return (
    <li>
      <Link to={path} onClick={handleCloseDropdown}>
        <div className="relative pl-8 py-2 pr-4">
          {isActive && (
            <Check
              size={16}
              className="absolute left-0 ml-2 mt-1 text-gray-700 dark:text-gray-400"
            />
          )}
          <span className={isActive ? 'font-medium' : ''}>{name}</span>
        </div>
      </Link>
    </li>
  );
}
