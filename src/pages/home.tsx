import { ModeToggle } from "../components/theme/mode-toggle";

const Home = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-end sm:items-center justify-center bg-suika-white dark:bg-suika-dark p-8">
        <img
          src="/suika-front.png"
          className="w-[100px] py-5 sm:py-7 transform transition-all duration-200 ease-out hover:scale-105 active:scale-95 hover:cursor-pointer"
        />
        <div className="flex flex-row items-center justify-center gap-5 border-b-2 border-suika-green pb-3">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight sm:text-5xl text-end sm:text-center">
            Under Construction
          </h1>
        </div>
        <p className="leading-7 mt-3 sm:text-xl text-center">
          Coming Soon
          <span>
            <br />
            XX-XX-2026
          </span>
        </p>
      </div>
      <div className="fixed bottom-5 right-5 z-50">
        <ModeToggle />
      </div>
    </>
  );
};

export default Home;
