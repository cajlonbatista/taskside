import styled from 'styled-components';

export const RegisterContainer = styled.div`
  margin-right: 20px;
  >span{
    font-family: Noto Sans , sans-serif;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;
    padding: 7px 13px;
    background-color: #FFF;
    border-radius: 5px;
    color: #fc8c29;
  }
`;

export const RegisterForm = styled.form`
  width: 500px;
  height: 630px;
  @media(max-width: 1279px){
    width: 100%;
  }
  header{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 10px 5px;
    h2{
      font-family: Inter, sans-serif;
      font-weight: 800;
    }
    >button{
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
    margin-top: 50px;
    >article{
      width: 100%;
      max-width: 400px;
      margin: 5px auto;
      display: grid;
      grid-gap: 5px;
      grid-template-columns: 1fr 1fr;
      @media(max-width: 500px){
        display: flex;
        flex-direction: column;
      }
      div{
        width: 100%;
        margin-right: 5px;
      }
    }
    div{
      width: 100%;
      max-width: 400px;
      margin: 7px auto;
      display: flex;
      align-items: center;
      position: relative;
      svg{
        position: absolute;
        fill: #7d7c83;
      }
      input{
        width: 100%;
        display: block;
        padding: 10px 25px 10px 40px;
        border-radius: 7px;
        border: 1.6px solid #7d7c83;
        outline: none;
        font-family: Inter, sans-serif;
        color: #000;
        transition: all 0.3s;
        :focus{
          border-color: #FC8C29;
        } 
      }
      input[type='date']{
        padding: 9px 10px 9px 40px;
      }
      input[type='number']{
        padding: 10px;
      }
      svg:first-child{
        left: 10px;
        width: 24px;
        height: 24px;
      }
      svg:last-child{
        right: 10px;
        cursor: pointer;
        :hover, :focus{
          fill: #FC8C29;
        }
      }
    }
  }
  >button{
    display: block;
    border: 0;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    border-radius: 10px;
    padding: 15px 20px;
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

export const Bounce = styled.section`

`;