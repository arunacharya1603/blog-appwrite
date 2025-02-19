import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      className: "text-blue-500 focus:bg-blue-500 focus:text-black",
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      className: "text-green-500 focus:bg-green-500 focus:text-black",
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      className: "text-orange-500 focus:bg-orange-500 focus:text-black",
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      className: "text-green-500 focus:bg-green-500 focus:text-black",
    },
  ];

  const handleNavigation = (slug) => {
    navigate(slug);
  };

  return (
    <header className='py-3 shadow bg-stone-800'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex ml-auto items-center">
            <ul className="flex flex-row gap-4 text-white">
              {navItems.map((item) => item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.slug)}
                    className='px-6 py-2 duration-200 hover:bg-blue-100 hover:text-stone-700 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null)}
              {authStatus && <LogoutBtn />}
            </ul>
          </div>

          {/* Mobile Dropdown */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white focus:outline-none">
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-2 bg-stone-500 text-white border-none">
                {navItems.map((item) => item.active && (
                  <DropdownMenuItem
                    key={item.name}
                    onSelect={() => handleNavigation(item.slug)}
                    className={`focus:bg-amber-600 focus:text-white font-semibold cursor-pointer ${item.className}`}
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
                {authStatus && (
                  <DropdownMenuItem className={`focus:bg-amber-600 focus:text-white`}>
                    <LogoutBtn className="w-full text-left" />
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;