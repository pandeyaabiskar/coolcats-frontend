import styled from "styled-components";
import { deviceWidth, THEME } from "../../../config";
import { Link } from "react-router-dom";
import { socialContentData } from "../../../constants";

import { ReactComponent as TwitterIcon } from "../../../assets/icons/twitter.svg";
// import { ReactComponent as ChainIcon } from "../../../assets/icons/blockchain/chain1.svg";
import FooterBG from "../../../assets/images/footer-bg.png"
import { FOOTER } from "../../../constants/images";

export const Footer = () => {
  return (
    <FooterWrapper>
      <div className="container">
        <div className="footer-logo">
          <img src={FOOTER.LOGO} /> 
        </div>
        <div className="footer-text">
          <div className="subtitle">Don’t miss out on what’s new,</div>
          <div className="title">CONNECT WITH US!</div>
          <div></div>
        </div>
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
        <div className="footer-links">
          <div className="link">Terms and Conditions</div>
          <div className="link">Privacy Policy</div>
          <div className="link">Competition Rules</div>
          <div className="link">Patch Notes</div>
        </div>
        <div className="footer-copyright">
          © Cool Cats Group LLC
        </div>
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  width: 100%;
  background-image: url(${FooterBG});
  background-size: cover;

  .container {
    width: 80%;
    padding: 50px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
  }

  .footer-logo {
    display: flex;
    justify-content: center;
  }

  .footer-text > .subtitle{
    font-family: 'Herokid';
    font-style: normal;
    font-weight: 300;
    font-size: 30px;
    line-height: 55px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: #FAD121;
  }

  .footer-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin: auto;
  }

  .footer-text > .title {
    font-family: 'Herokid';
    font-style: normal;
    font-weight: 800;
    font-size: 90px;
    line-height: 92%;
    /* or 83px */

    display: flex;
    align-items: center;
    text-align: center;
    color: #FFFFFF;
  }

  .footer-links {
    display: flex;
    justify-content: center;
  }

  .footer-links > .link {
    font-family: 'Herokid';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 27px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.01em;
    color: #FFFFFF;
    padding: 0px 30px;
    text-transform: uppercase;
    border-right: 1px solid #FFFFFF;
    cursor: pointer;
  }

  .footer-links > .link:last-child {
    border-right: none;
  }

  .footer-copyright{
    display: flex;
    justify-content: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #C7C7C7;
  }
`;

const SocialContentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

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