import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import img from "public/assets/images/acts-logo.png";

const HomeHeader = () => {
  const { user } = useUser();

  console.log({ user });
  return (
    <div>
      <header className="flex w-full justify-center">
        <nav className="absolute z-10 mx-auto w-full max-w-screen-2xl px-6 md:px-12 xl:px-6">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-2 md:gap-0 md:py-4">
            <input
              aria-hidden="true"
              type="checkbox"
              name="toggle_nav"
              id="toggle_nav"
              className="peer hidden"
            />
            <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-max">
              <a
                href="#home"
                aria-label="logo"
                className="flex items-center space-x-2"
              >
                <div aria-hidden="true" className="flex items-center space-x-5">
                  <Image
                    src={img}
                    className="mx-auto h-12 w-auto"
                    alt="logo"
                    width={90}
                    height={40}
                  />
                  {/* <div className="h-6 w-2 bg-primary"></div> */}
                </div>
                <span className="pl-2 font-bold text-gray-700">
                  STI Policy Help Desk
                </span>
              </a>

              <div className="relative flex max-h-10 items-center lg:hidden">
                <label
                  role="button"
                  htmlFor="toggle_nav"
                  aria-label="humburger"
                  id="hamburger"
                  className="relative  -mr-6 p-6"
                >
                  <div
                    aria-hidden="true"
                    id="line"
                    className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300 "
                  ></div>
                  <div
                    aria-hidden="true"
                    id="line2"
                    className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300 "
                  ></div>
                </label>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden"
            ></div>
            <div className="absolute left-0 top-full z-20 w-full origin-top translate-y-1 scale-95 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100  bg-white p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 peer-checked:visible peer-checked:scale-100 peer-checked:opacity-100 lg:relative lg:flex lg:w-7/12 lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:peer-checked:translate-y-0">
              <div className="w-full text-gray-600 lg:w-auto lg:pr-4 lg:pt-0">
                <ul className="flex flex-col gap-6 font-medium tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
                  <li>
                    <Link
                      href="contact"
                      className="block rounded-full bg-blue-200/70 px-6 py-1 font-bold text-sky-600 transition"
                    >
                      <span>
                        Welcome to STI help desk. For support visit our contact
                        centre
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="mt-12 lg:mt-0">
                {user ? (
                  <Link
                    href="/submissions"
                    className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                  >
                    <span className="relative text-sm font-semibold text-white">
                      Go to Dashboard
                    </span>
                  </Link>
                ) : (
                  <Link
                    href="/sign-in"
                    className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                  >
                    <span className="relative text-sm font-semibold text-white">
                      Get Started
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HomeHeader;
