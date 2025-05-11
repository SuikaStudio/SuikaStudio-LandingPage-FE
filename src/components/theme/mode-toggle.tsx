import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <div
        className="bg-[#6A994E] hover:bg-[#6a994eda] transform transition-all duration-200 ease-out hover:scale-105 active:scale-95 w-[60px] h-[60px] flex items-center justify-center rounded-full hover:cursor-pointer text-white"
        onClick={() =>
          setTheme(
            !document.documentElement.classList.contains("dark")
              ? "dark"
              : "light"
          )
        }
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
      {/* <DropdownMenu>
      <Button
        variant="outline"
        size="icon"
        className="hover:cursor-pointer"
        onClick={() =>
          setTheme(
            !document.documentElement.classList.contains("dark")
              ? "dark"
              : "light"
          )
        }
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </DropdownMenu> */}
    </>
  );
}
