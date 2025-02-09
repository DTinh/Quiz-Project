import Header from './components/Header/Header';
import './App.scss'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import _ from 'lodash';
import AppRoutes from './routes/AppRoutes';
// import Footer from './components/Navigation/Footer';
function App() {
  return (
    <>
          <div className='app-container'>
            <div className='header-container'>
            <Header />
            </div>
            <div className='main-container'>
              <div className='sidenav-container'>
            
              </div>
              <div className='app-contain'>
                <AppRoutes />
              </div>
            </div>
          </div>
    </>

  );
}

export default App;
