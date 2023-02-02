import { Popconfirm, Popover } from "antd";
import styled from "styled-components";
import { THEME, deviceWidth } from "../../../config";
import { Button } from "../../atoms/Button";
import { MetaMaskContext } from "../../../hoc/Metamask";
import { useContext } from "react";
import { limitCharacter } from "../../../helpers/limitCharacter";
import { useDeviceType } from "../../../hooks";
import { Close, Menu } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useLayout } from "../../../hoc/LayoutProvider";
import { socialContentData } from "../../../constants";
import { IconButton } from "@mui/material";
import { HEADER } from "../../../constants/images";

export const NavBar = () => {
  const { connect, account, isActive, disconnect } =
    useContext(MetaMaskContext);
  const { windowSize } = useDeviceType();
  const { isMobileMenuVisible, setIsMobileMenuVisible } = useLayout();
  const navigate = useNavigate();

  const handleLinkClick = (link: string) => {
    if (!link) return;
    navigate(link);
    setIsMobileMenuVisible && setIsMobileMenuVisible(false);
  };

  return (
    <>
      <HeaderWrapper>
          <div className="container">
            <SocialContentWrapper>
              {socialContentData.map(({ Icon, title, link }, idx) => (
                <a
                  className="social"
                  key={`social_${idx}`}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon />
                </a>
              ))}
            </SocialContentWrapper>
            <div className="header-logo" onClick={() => handleLinkClick("/")}>
              <img src={HEADER.LOGO} />
            </div>
            <div className="header-btn">
              {isActive ? (
                // <span className='main-link'>
                <Popconfirm
                  overlayClassName={"wallet-disconnect-popover"}
                  okText={"Yes"}
                  onConfirm={disconnect}
                  title={"Disconnect Wallet?"}
                >
                  <Button
                    btntext={`${limitCharacter(account || "", 5, true)}`}
                    className="btn-wallet"
                    btntype="neutral"
                    btnSize="very-small"
                  />
                </Popconfirm>
              ) : (
                <Button
                  btntext="Connect"
                  className="btn-wallet"
                  onClick={() => {
                    connect && connect();
                  }}
                  btntype="neutral"
                  btnSize="very-small"
                />
              )}
            </div>
          </div>
      </HeaderWrapper>
      <NavbarWrapper>
        <div className="container">
          <div className="nav-link active">Home</div>
          <div className="nav-link">Nfts</div>
          <div className="nav-link">News</div>
          <div className="nav-link">About</div>
          <div className="nav-link">Tools</div>
          <div className="nav-link">Shop</div>
        </div>
      </NavbarWrapper>
    </>
  );
};

const HeaderWrapper = styled.div`
    background-color: #231f20;

  .container {
    width: 80%;
    height: 90px;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .header-logo {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .header-logo img {
    width: 80.88px;
    cursor: pointer;
  }

  .header-btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .btn-wallet {
    color: #fad121;
    border: 1px solid #fad121;
    background-color: transparent;
    font-weight: bold;
    width: 160px;
    height: 44px;
    border-radius: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    padding-top: 10px;
  }

  .btn-wallet:hover {
    color: #fad121;
    border: 1px solid #fad121;
  }
`;

const NavbarWrapper = styled.div`
  background-color: #ffffff;
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.1));

  .container {
    width: 50%;
    height: 44px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-link {
    font-family: 'Herokid';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 27px;
    display: flex;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    padding: 0px 25px;
    padding-top: 5px;
    height: 100%;
  }

  .active {
    background-color: #0094E3;
    color: #ffffff;
  }
`;



const SocialContentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;

  & .social {
    display: flex;
    align-items: center;
    padding: 12px 18px;
    border-radius: 8px;
    cursor: pointer;

    & > span {
      ${THEME.typography.body3}
      margin-left: 16px;
    }
    & > svg {
      width: 24px;
      height: 24px;
    }
  }
  & :hover {
    color: #fad121;
  }
`;
