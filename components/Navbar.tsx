import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Menu } from 'lucide-react';
import Image from 'next/image';
import Logo from '../assets/Logo.png';

const menuItems = [
  { name: 'MEMBROS', href: '/membros' },
  { name: 'PUBLICAÇÕES', href: '/publicações' },
  { name: 'GALERIA', href: '/galeria' },
  { name: 'EDITAIS', href: '/editais' },
  { name: 'EVENTOS', href: '/eventos' },
  { name: 'SOBRE', href: '/sobre' },
  { name: 'FAZER PARTE', href: '/inscreva-se' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image src={Logo} width={40} height={40} alt="Logo do Chapter" />
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  className={`hover:text-violet-500 font-bold ${
                    pathname === item.href ? 'text-violet-500' : 'text-white'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.href
                      ? 'bg-violet-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
