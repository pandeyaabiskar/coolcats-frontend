import { createGlobalStyle } from "styled-components";
import { THEME } from "../config";
import HerokidLight from '../assets/fonts/Herokid-Light.otf';
import HerokidRegular from '../assets/fonts/Herokid-Regular.otf';
import HerokidSemiBold from '../assets/fonts/Herokid-SemiBold.otf';
import HerokidBoldWide from '../assets/fonts/Herokid-BoldWide.otf';
import HerokidExtraBoldWide from '../assets/fonts/Herokid-ExtraBoldWide.otf';

export const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'Herokid';
    font-weight: 300;
    src: local('Herokid'), url(${HerokidLight}) format('truetype');
  }
  @font-face {
    font-family: 'Herokid';
    font-weight: 500;
    src: local('Herokid'), url(${HerokidRegular}) format('truetype');
  }
  @font-face {
    font-family: 'Herokid';
    font-weight: 600;
    src: local('Herokid'), url(${HerokidSemiBold}) format('truetype');
  }
  @font-face {
    font-family: 'Herokid';
    font-weight: 800;
    src: local('Herokid'), url(${HerokidBoldWide}) format('truetype');
  }
  @font-face {
    font-family: 'Herokid';
    font-weight: 900;
    src: local('Herokid'), url(${HerokidExtraBoldWide}) format('truetype');
  }

  html{
    scroll-behavior: smooth;
  }

  body {
    margin: 0px;
    padding: 0px;
    font-family: 'Herokid', sans-serif;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    overflow-x: hidden;
  }

  #root{
    width: 100%;
    overflow-x: hidden;
  }

  p, h1, h2, h3, h4,h5 {
    margin-bottom: 0;
  }

  button { 
    cursor: pointer;
  }

  ul, li {
    list-style-type: none;
    margin: 0px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover{
    color: #3E62FE;
  }


  & .social-icons-popover{
    & .ant-popover-inner-content {
      padding: 0px !important;
    }
  }

  & .select-dropdown-class{
    background: ${THEME.colors.primary};
    box-shadow: 0px 2px 20px rgba(30, 44, 106, 0.08);
    border-radius: 8px;
    padding: 8px;
    [aria-selected="true"],[aria-selected="false"]{
      margin-bottom: 4px;
      border-radius: 8px;

      :last-child {
        margin-bottom: 0;
      }

      :hover{
        background: ${THEME.colors.interactiveSurfacePrimary.hover};  
      }
    }
    [aria-selected="true"]{
      background: ${THEME.colors.interactiveSurfacePrimary.active};
    }
  }

  .ant-notification-notice-error  {
    background: #FEE1E7;
  }

  .ant-notification-notice  {
    border-radius: 100px;
    padding: 16px;

    & .ant-notification-notice-message  {
      margin-bottom: 0 !important;
    }
  }

  & .ant-modal-content {
    background: #231f20;
    padding: 20px 60px;
    border-radius: 8px;
  }

  .ant-modal-close-x {
    color: #ffffff;
  }

  & .ant-modal-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }

  .journey-btn-group {
    display: flex;
    gap: 5px;
  }
  
  .journey-btn {
    width: 190px;
    background: #fad121;
    border-radius: 73px;
    background: #fad121;
    border-radius: 73px;
    font-family: "Herokid";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;
    color: #231f20;
    padding: 10px 20px;
    padding-top: 15px;
    cursor: pointer;
  }

  .btn-outline {
    background-color: transparent;
    border: 1px solid #fad121;
    color: #fad121;
  }

  .btn-cancel {
    background-color: #EB515D;
    color: #ffffff;
  }

  .btn-slice-left {
    border-radius: 73px 0 0 73px;

  }

  .btn-slice-right {
    border-radius: 0px 73px 73px 0;
  }

  .modal-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .modal-subtitle {
    font-family: 'Herokid';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 30px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;

    color: #87C7EC;
  }

  .modal-title {
    font-family: 'Herokid';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;
    color: #FFFFFF;
  }

  .modal-info-text {
    font-family: 'Herokid';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 159.4%;
    /* or 26px */

    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;
  }

  .journey-stake-group {
    display: flex;
    gap: 40px;
  }

  .journey-stake {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .stake-text {
    font-family: 'Herokid';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 134.9%;
    /* or 27px */

    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;
  }

  .journey-input-group {
    display: flex;
    flex-direction: column;
    gap:20px;
  }

  .journey-input-text {
    font-family: 'Herokid';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;
  }

  .journey-input {
    width: 50%;
    margin: auto;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 10px 20px;
    font-family: 'Herokid';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;

    color: #383838;
  }

  ::placeholder {
    font-family: 'Herokid';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 159.4%;
    /* or 38px */

    color: #383838;
  }


  & .wallet-disconnect-popover  {
    & .ant-popover-inner  {
      border-radius: 8px;
      box-shadow: 0px 2px 20px rgba(30, 44, 106, 0.08);
    }

    & .ant-popover-inner-content  {
      width: 193px;

      & .ant-popover-message {
        padding-top: 0px;
        > .anticon {
          display: none;
        }

        > .ant-popover-message-title  {
          ${THEME.typography.label1}
          padding: 0;
          text-align: left;
        }
      }

      & .ant-popover-buttons  {
        & button {
          border-radius: 100px;
          padding: 6px 16px;
          height: auto;
          border: 0;
          margin: 0 12px 0 0;

          ${THEME.typography.label1}

          :first-child {
            color: ${THEME.colors.contentPrimary};
            background: ${THEME.colors.interactive.surface.inverse.secondary.default};

            :hover  {
              background: ${THEME.colors.interactive.surface.inverse.secondary.hover};
            }

            :active {
              background: ${THEME.colors.interactive.surface.inverse.secondary.active};
            }
          }

          :nth-child(2) {
            color: ${THEME.colors.brand};
            margin: 0;
            background: ${THEME.colors.interactive.surface.brand.secondary.default};

            :hover  {
              background: ${THEME.colors.interactive.surface.brand.secondary.hover};
            }

            :active {
              background: ${THEME.colors.interactive.surface.brand.secondary.active};
            }
          }
        }
      }

    }
  }
`;
