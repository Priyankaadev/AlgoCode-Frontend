import Navbar from './components/Navbar'
import './App.css'
import Description from './pages/Description/Description'
import SideBar from './components/SideBar'
import SampleProblem1 from './constants/SampleProblem1'
function App() {

  const markdownText = SampleProblem1.problemStatement;
  return (
    <>
    <Navbar />
    <SideBar />
     <Description descriptionText={markdownText}>
     </Description>
     </>
  )
}

export default App
