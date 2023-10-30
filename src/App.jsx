import { useEffect, useState } from "react";

/* toast */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../src/css/App.css";
import Router from "./routes/Router";
import useLoggedIn from "./hooks/useLoggedIn";
import Navbarpage from "./components/Navbar";
import { Spinner } from "react-bootstrap";
import Footer from "./components/Footer";
import { ThemeProvider } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loggedIn = useLoggedIn();
  useEffect(() => {
    (async () => {
      await loggedIn();
      setIsLoading(false);
    })();
  }, []);

  return (
    <ThemeProvider >
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="colored"
        />

        <header>
          <Navbarpage />
        </header>
        <main>
          {isLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <Router />
          )}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
