const HomeHeader = () => {
  return (
    <div>
      <footer className="mx-auto mt-12 max-w-screen-xl rounded-lg bg-white px-6 shadow-lg md:px-12 xl:px-6">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm font-bold text-gray-600 sm:text-center">
            © {new Date().getFullYear()}.{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              STI Policy Helpdesk
            </a>
            . All Rights Reserved.
          </span>
          <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-600 sm:mt-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                For support visit our contact centre
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default HomeHeader;
