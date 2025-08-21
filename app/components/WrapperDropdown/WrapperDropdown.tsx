import type { ReactNode } from 'react';

import useClickOutside from '~/hooks/useClickOutside';

interface WrapperDropdownProps {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  toggleContent: ReactNode;
  children: ReactNode;
}

export default function WrapperDropdown({
  isOpen,
  handleOpen,
  handleClose,
  toggleContent,
  children,
}: WrapperDropdownProps) {
  const dropDownRef = useClickOutside<HTMLDivElement>(handleClose);
  const toggle = () => (isOpen ? handleClose() : handleOpen());

  return (
    <div className="relative w-full flex" ref={dropDownRef}>
      <button
        className="w-full hover:cursor-pointer"
        type="button"
        onClick={toggle}
      >
        {toggleContent}
      </button>
      {isOpen && (
        <div className="absolute w-full top-full left-0 z-10">{children}</div>
      )}
    </div>
  );
}
