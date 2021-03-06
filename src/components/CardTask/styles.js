import styled from 'styled-components';

import { Paper } from '@material-ui/core';

export const CardTaskContainer = styled(Paper)`
  width: 100%;
  position: relative;
  max-width: 700px;
  padding: 10px 20px;
  >div:first-child{
    width: 80%;
    p{
      font-family: Inter, sans-serif;
      font-size: 14px;
      text-align: justify;
    }
  }
  >div:last-child{
    position: absolute;
    top: 5px;
    right: 5px;
    ul{
      li:first-child{
          :hover,:focus{
          background: #A9BA5A;
        }
      }
      li:last-child{
        :hover,:focus{
          background: #E66353;
        }
      }
      li{
        font-family: Inter, sans-serif;
        font-size: 13px;
        color: #7d7c83;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        svg{
          width: 20px;
          height: 20px;
          fill: #7d7c83;
          transition: all 0.3s;
          margin-right: 10px; 
        }
        :hover,:focus{
          background: #FC8C29;
          color: white;
          svg{
            fill: #FFF;
          }
        }
      }
    }
    >button{
      background: transparent;
      border: 0;
      outline: none;
      padding: 0;
      svg{
        width: 23px;
        height: 24px;
        fill: #7d7c83;
      }
      :focus, :hover{
        svg{
          fill: #FC8C29;
        }
      }
    }
  }
  :hover, :focus{
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.133), 0 0.6px 2px rgba(0, 0, 0, 0.1);
  }
`;

export const DialogView = styled.div`
  width: 500px;
  height: 500px;
  @media(max-width: 1279px){
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  header{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 20px 5px;
    >button{
      position: absolute;
      top: 0;
      left: 0;
      :hover{
        background: transparent; 
      }
    }
    >span, div{
      display: flex;
      align-items: center;
      padding: 5px 10px;
      border-radius: 5px;
      color: white;
      svg{
        margin-right: 10px;
        fill: white;
      }
    }
    >span:last-child{
      background-color: #fc8c29;
      svg{
        animation: spin 1s infinite;
      }
    }
    >div:last-child{
      background-color: #a9ba5a;
    }
  }
  section{
    margin: 20px auto;
    p{
      font-family: Inter, sans-serif;
      text-align: justify;
      font-size: 14px;
    }
    p:last-child, span{
      text-align: center;
      margin-top: 20px;
      line-height: 20px;
      border-bottom: 1px solid #fc8c29;
      color: #fc8c29;
    }
    span:last-child{
      color: #a9ba5a;
      border-color: #a9ba5a;
    }
  }
`;

export const DialogDelete = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  header:first-child{
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    svg{
      width: 40px;
      height: 40px;
      fill: #e66353;
      animation: heartbeat 1s infinite;
      margin-right: 20px;
    }
    span{
      font-family: Noto Sans, sans-serif;
      font-weight: 400;
      font-size: 16px;
      color: #303030;
    }
  }
  div:last-child{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button{
      font-family: Inter, sans-serif;
      font-size: 14px;
      text-transform: capitalize; 
      padding: 7px 30px;
    }
    button:first-child{
      margin-right: 20px;
    }
    button:last-child{
      background-color: #e66353;
      color: white;
    }
  }
`;


export const DialogConclude = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  header:first-child{
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    svg{
      width: 40px;
      height: 40px;
      fill: #a9ba5a;
      animation: heartbeat 1s infinite;
      margin-right: 20px;
    }
    span{
      font-family: Noto Sans, sans-serif;
      font-weight: 400;
      font-size: 16px;
      color: #303030;
    }
  }
  div:last-child{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button{
      font-family: Inter, sans-serif;
      font-size: 14px;
      text-transform: capitalize;
      padding: 7px 30px;
    }
    button:first-child{
      margin-right: 20px;
    }
    button:last-child{
      background-color: #a9ba5a;
      color: white;
    }
  }
`;