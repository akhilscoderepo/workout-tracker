import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import ExerciseListPage from "./components/ExerciseList/ExerciseListPage";
import NavBar from "./components/Common/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Workout from "./components/Workout/Workout";
import CreateTemplate from "./components/Templates/CreateTemplate";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="bg-slate-200 w-screen h-screen">
          <NavBar />
          <div>
            <Routes>
              <Route path="/exercise" element={<ExerciseListPage />} />
              <Route path="/workout" element={<Workout />} />
              <Route path="/createTemplate" element={<CreateTemplate />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
