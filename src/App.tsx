import Navbar from './components/Navbar'
import './App.css'
import Description from './pages/Description/Description'
import SideBar from './components/SideBar'

function App() {

  const markdownText = `# Welcome to StackEdit! 
  ![image](https://assets.leetcode.com/uploads/2018/10/12/knight.png)
  Hi! im your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.`
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
