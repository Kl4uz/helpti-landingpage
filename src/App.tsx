import LandingPage from "./pages/LandingPage";
import { SpeedInsights } from "@vercel/speed-insights/react"


function App() {
  return(
    <>
      <LandingPage />
      <SpeedInsights/>;
    </>
  ) 

}

export default App;
