import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  position: fixed;
  background: #fc8c29;
  min-height: 80px;
  animation: slider 0.5s backwards;
  top: 0;
  z-index: 10;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.133), 0 0.6px 2px rgba(0, 0, 0, 0.1);
  a{
    display: flex;
    align-items: center;
    svg{
      width: 44px;
      height: 44px;
      margin-right: 10px;
    }
    font-family: Inter, sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: white;
  }
  
  div:last-child{
    display: flex;
    align-items: center;
    margin-right: 20px;
    article{
      display: flex;
      align-items: center;
      @media(max-width: 550px){
        display: none;
      }
      a{
        color: white;
        margin: auto 15px;
        font-family: Inter, sans-serif;
        font-size: 13px;
        font-weight: 400;
        svg{
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }
        :hover{
          svg{
            animation: jello 0.6s both;
          }
        }
      }
      margin: auto 10px;
    }
    >div{
      div ul{
        border-radius: 10px;
      }
      div li{
        font-family: Inter, sans-serif;
        font-size: 13px;
        color: #7d7c83;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        svg{
          fill: #7d7c83;
          transition: all 0.3s;
          margin-right: 10px;
        }
        :focus{
          background: #FC8C29;
          color: white;
          svg{
            fill: #FFF;
          }
        }
        :hover{
          svg{
            animation: jello 0.6s both;
          }
        }
      }
      >button{
        background: transparent;
        outline: none;
        border: 0;
        padding: 0;
        display: flex;
        position: relative;
        p{
          width: 100px;
          font-family: Inter, sans-serif;
          font-size: 13px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          transition: all 0.3s;
          padding: 0;
          margin-block-start: 0em;
          margin-block-end: 0em;
          color: #FFF;
        }
        >svg:first-child{
          width: 24px;
          height: 24px;
          fill: #FFF;
          margin-right: 5px;
        }
        >svg:last-child{
          width: 10px;
          height: 10px;
          position: absolute;
          bottom: -10px;
          right: 50%;
          fill: #FFF;
        }
        :hover{
          svg{
            animation: jello 0.6s both;
          }
        }
      }
    }
  }
`;