import Snowfall from "react-snowfall";
import Routes from "./routes";
import { useTheme } from "./components/theme/theme-provider";

const App = () => {
  const { theme } = useTheme();

  return (
    <>
      <Snowfall
        color={theme === "light" ? "#c4d0ff" : "#dee4fd"}
        snowflakeCount={400}
        speed={[0.5, 2]}
        wind={[1, 2]}
        radius={[0.5, 3]}
      />
      <Routes />
    </>
  );
};

export default App;
