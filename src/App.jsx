import BackGround from "./components/BackGround";
import styled from "styled-components";

import Form from "./components/Form";

function App() {
  return (
    <BackGround>
      <AppContainer>
        <Form />
      </AppContainer>
    </BackGround>
  );
}

export default App;
const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
