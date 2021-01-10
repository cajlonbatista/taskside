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

export const DialogDelete = styled.div`
  position: relative;
  overflow: hidden;
  header:first-child{
    justify-content: space-between;
    display: flex;
    align-items: baseline;
    svg{
      width: 40px;
      height: 40px;
      position: absolute;
      top: -5px;
      left: -5px;
    }
    span{
      font-family: Inter, sans-serif;
      margin-bottom: 20px;
      font-weight: 400;
      font-size: 18px;
      color: #7d7c83;
    }
  }
  div:last-child{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button:first-child{
      margin-right: 20px;
    }
  }
`;