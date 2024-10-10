import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles"
import  Button from "./ui/Button"
import Input from "./ui/Input"



const H1 = styled.h1`
font-size: 30px;
font-weight: 600;
background-color: yellow;
`

const StyledApp = styled.div`
background-color: lightblue;
padding: 20px;
`

const App = () => {
  return (
    <>
    <GlobalStyles/>
    <StyledApp>
          <H1>Woodland hotel</H1>
          <Button onClick={()=>alert("Check in")}>Check in</Button>
           <Button onClick={()=>alert("Check out")}>Check in</Button>
           <Input type='number' placeholder="Number of guests"></Input>
    </StyledApp>
</>
  )
}

export default App