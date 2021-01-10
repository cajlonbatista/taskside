import styled from 'styled-components';

export const MainContainer = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;
  padding-top: 130px;
  >main{
    footer{
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
`;

export const TaskCreate = styled.form`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  header{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 10px 5px;
    h2{
      font-family: Inter, sans-serif;
      margin-bottom: 20px;
      font-weight: 800;
    }
    p{
      font-family: Inter, sans-serif;
      color: #7d7c83;    
    }
    div{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    button{
      position: absolute;
      top: 0;
      left: 0;
      :hover{
        background: transparent; 
      }
    }
  }
  section{
    width: 100%;
    max-width: 400px;
    margin: 40px auto;  
    div{
      display: flex;
      align-items: center;
      margin: 10px auto;
    }
    input{
      width: 100%;
      padding: 7px 10px;
      border-radius: 7px;
      border: 1.6px solid #7d7c83;
      outline: none;
      font-family: Inter, sans-serif;
      transition: all 0.3s;
      color: #505050; 
      :focus{
        border-color: #FC8C29;
      } 
    }
    label{
      margin-right: 10px;
      font-family: Inter, sans-serif;
      color: #7d7c83;
    }
    input[type=date]{
      width: 100%;
      max-width: 200px;
    }
  }
  >button{
    display: block;
    border: 0;
    width: 100%;
    max-width: 200px;
    margin: 10px auto;
    border-radius: 10px;
    padding: 14px 20px;
    color: #FFF;
    font-family: Inter, sans-serif;
    font-weight: 600;
    font-size: 14px;
    margin-top: 50px;
    background: #FC8C29;
    outline: none;
    transition: all 0.3s;
    cursor: pointer;
    :focus{
      background: #EA8023;
    }
  }
`;