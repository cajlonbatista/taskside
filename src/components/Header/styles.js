import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 10;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.133), 0 0.6px 2px rgba(0, 0, 0, 0.1);
  a{
    svg{
      width: 64px;
      height: 64px;
    }
  }
  div:last-child{
    display: flex;
    align-items: center;
    margin-right: 20px;
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
      }
      >button{
        background: transparent;
        border: 0;
        padding: 0px;
        outline: none;
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
        }
        >svg:first-child{
          width: 40px;
          height: 27px;
          transition: all 0.3s;
        }
        >svg:last-child{
          width: 10px;
          height: 10px;
        }
        :focus{
          p{
            color: #FC8C29;
          }
          svg{
            fill: #FC8C29;
          }
        }
      }
    }
  }
`;