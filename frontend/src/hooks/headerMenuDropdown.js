import { useEffect } from 'react';

export const handleMouseEnter = (e) => {
  const dropdown = e.currentTarget;
  dropdown.classList.add('show');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  if (dropdownMenu) {
    dropdownMenu.classList.add('show');
  }
};

export const handleMouseLeave = (e) => {
  const dropdown = e.currentTarget;
  dropdown.classList.remove('show');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  if (dropdownMenu) {
    dropdownMenu.classList.remove('show');
  }
};

export const useDropdownInit = () => {
  useEffect(() => {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('mouseenter', handleMouseEnter);
      dropdown.addEventListener('mouseleave', handleMouseLeave);
    });

    // Bootstrap dropdowns need to be initialized to handle hover properly
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(dropdownToggle => {
      dropdownToggle.addEventListener('click', (e) => e.preventDefault());
    });

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      dropdowns.forEach(dropdown => {
        dropdown.removeEventListener('mouseenter', handleMouseEnter);
        dropdown.removeEventListener('mouseleave', handleMouseLeave);
      });
      dropdownToggles.forEach(dropdownToggle => {
        dropdownToggle.removeEventListener('click', (e) => e.preventDefault());
      });
    };
  }, []);
};