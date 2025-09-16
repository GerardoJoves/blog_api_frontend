import { Check, ChevronDown } from 'lucide-react';
import WrapperDropdown from '../WrapperDropdown';
import React, { useState } from 'react';

type Option = {
  name: string;
  isActive: boolean;
  el: React.ReactNode;
};

type DropdownProps = {
  trigger: string | React.ReactNode;
  options: Option[];
};

export default function Dropdown({ trigger, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  const openDropdown = () => setIsOpen(true);

  return (
    <WrapperDropdown
      isOpen={isOpen}
      handleClose={closeDropdown}
      handleOpen={openDropdown}
      toggleContent={
        <div className="flex items-center justify-between px-3 py-1 border rounded border-neutral-400 dark:border-gray-700 dark:bg-gray-800">
          {trigger}
          <ChevronDown size={16} className="text-gray-700 dark:text-gray-400" />
        </div>
      }
    >
      <div className="pt-1.5">
        <ul className="rounded shadow-3xl dark:shadow-none bg-white dark:bg-gray-800">
          {options.map((op) => (
            <DropdownOption
              key={op.name}
              {...op}
              handleCloseDropdown={closeDropdown}
            />
          ))}
        </ul>
      </div>
    </WrapperDropdown>
  );
}

function DropdownOption({
  isActive,
  el,
  handleCloseDropdown,
}: Option & { handleCloseDropdown: () => void }) {
  return (
    <li>
      <div className="relative pl-8 py-2 pr-4">
        {isActive && (
          <Check
            size={16}
            className="absolute left-0 ml-2 mt-1 text-gray-700 dark:text-gray-400"
          />
        )}
        <div
          className={isActive ? 'font-medium' : ''}
          onClick={handleCloseDropdown}
        >
          {el}
        </div>
      </div>
    </li>
  );
}
