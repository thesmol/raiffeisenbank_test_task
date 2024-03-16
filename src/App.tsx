import { Body } from "vienna-ui";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routs } from "./router/routes";

function App() {
  return (
    <Body style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#ffed43",
      minHeight: '100vh',
      height: "fit-content",
      minWidth: "900px"
    }}>
      <BrowserRouter>
        <Routes>
          {routs.map((route) =>
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          )}
          <Route path="*" element={<Navigate to="users" replace />} />
        </Routes>
      </BrowserRouter>
    </Body >
  );
}

export default App
