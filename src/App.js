import {BrowserRouter as Router, Route, Routes}  from 'react-router-dom'
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackForm from "./components/FeedbackForm"
import AboutPages from './pages/AboutPages'
import { FeedbackProvider } from './context/FeedbackContext'//not a default expart hence the {}
import AboutIconLink from './components/AboutIconLink'


function App () {



return (
  <FeedbackProvider>
    <Router> 
      <Header />
      <div className="container">
        <Routes> 
          <Route exact path='/' element={
              <>
                <FeedbackForm>
                </FeedbackForm>

                <FeedbackStats> 
                </FeedbackStats>

                <FeedbackList>
                </FeedbackList> 
                <AboutIconLink />
              </>

          }>
            
          </Route>
          <Route path='/about' element={
            <>
              <AboutPages />
            </>
          }> 
          </Route>
        </Routes>

        </div>
    </Router>
  </FeedbackProvider>
)}
export default App