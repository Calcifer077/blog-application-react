import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  const [position, setPosition] = useState('');

  useEffect(
    function () {
      if (location.pathname === '/' || location.pathname === '/search') {
        setPosition('fixed');
      } else {
        setPosition('');
      }
    },
    [location.pathname],
  );

  return (
    <div
      className={`w-full ${position} bottom-0 flex h-32 items-center justify-between bg-gray-800 px-6 text-white`}
    >
      <div className="text-lg font-semibold">Blog Application</div>
      <div className="">
        <h1 className="text-base font-bold">Social</h1>
        <ul className="space-y-1">
          <li>
            <a
              href="https://github.com/Calcifer077"
              target="_blank"
              className="text-lg font-medium hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/mahesh-nashier-b05691249/"
              target="_blank"
              className="text-lg font-medium hover:underline"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
