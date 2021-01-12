import styled from 'styled-components';


export const LandingContainer = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  animation: bounce .8s linear;
  @media(max-width: 700px){
    align-items: center;
    svg{
      display: none;
    }
  }
  header{
    width: 50%;
    padding: 20px;
    font-family: Inter, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid transparent;
    h1{
      font-size: 35px;
      animation: circles 5s infinite;
      font-weight: 600;
      color: #404040;
    }
    p{
      font-size: 16px;
      color: #b5b5b5;
    }
  }
  svg{
    position: absolute;
    width: 40%;
    bottom: 0;
    right: 10px; 
  }
`;