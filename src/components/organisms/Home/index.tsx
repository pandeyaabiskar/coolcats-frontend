import React, { useContext } from "react";
import Button from "../../atoms/Button";
import { MetaMaskContext } from "../../../hoc/Metamask";
import { Modal } from "antd";
import { limitCharacter } from "../../../helpers/limitCharacter";
import { deviceWidth } from "../../../config/theme";
import styled from "styled-components";
import { HOMEPAGE } from "../../../constants/images";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isStakeModalOpen, setIsStakeModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleStakeModal = () => {
    setIsStakeModalOpen(true);
    handleCancel();
  };
  const handleStakeModalCancel = () => {
    setIsStakeModalOpen(false);
  };

  const { connect, account, isActive, disconnect } =
    useContext(MetaMaskContext);

  return (
    <HomePageContainer>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div className="journey-info">
            <div className="journey-info-text">
              <div className="journey-title">
                <span>Journey #1</span> Live Now
              </div>
              <div className="journey-countdown">Journey Begins: 00:00:00</div>
            </div>
            <button className="journey-btn" onClick={showModal}>
              Join Journey
            </button>
          </div>
          <img src={HOMEPAGE.BG} width="100%" />

          <Modal
            centered
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            className="modal-container"
            width={900}
          >
            <div className="modal-text">
              <div className="modal-subtitle">Journey #1</div>
              <div className="modal-title">Help Save Blue!</div>
            </div>
            <div>
              <img src={HOMEPAGE.JOURNEYBG} width="539px" />
            </div>
            <div className="journey-btn" onClick={handleStakeModal}>
              Continue
            </div>
          </Modal>
          <Modal
            centered
            open={isStakeModalOpen}
            onCancel={handleStakeModalCancel}
            footer={null}
            className="modal-container"
            width={900}
          >
            <div className="modal-text">
              <div className="modal-subtitle">Journey #1</div>
              <div className="modal-title">Help Save Blue!</div>
            </div>
            <div className="modal-info-text">
              Blue has been sucked into a fracture, who is brave enough to
              follow him and help him?
            </div>
            <div className="journey-btn btn-outline">Select All</div>

            <div className="journey-stake-group">
              <div className="journey-stake">
                <img src={HOMEPAGE.NFTPLACEHOLDER} width="175px"/>
                <div className="stake-text">STAKE CATS +5% PER CAT</div>
              </div>
              <div className="journey-stake">
                <img src={HOMEPAGE.NFTPLACEHOLDER} width="175px"/>
                <div className="stake-text">STAKE PETS +5% PER PET</div>
              </div>
              <div className="journey-stake">
                <img src={HOMEPAGE.NFTPLACEHOLDER} width="175px"/>
                <div className="stake-text">STAKE FRACTURE</div>
              </div>
            </div>

            <div className="journey-input-group">
              <div className="journey-input-text">(Optional) What are the 4 numbers of Blue’s Address?</div>
              <input type="text" className="journey-input" placeholder="Answer..."/>
            </div>
            <div className="journey-btn-group">
              <div
                className="journey-btn btn-cancel btn-slice-left"
                onClick={handleStakeModalCancel}
              >
                Cancel
              </div>
              <div className="journey-btn btn-slice-right">Continue</div>
            </div>
          </Modal>
        </div>
      </>
    </HomePageContainer>
  );
}

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  .journey-info {
    width: 400px;
    height: 195px;
    padding: 40px;
    background: #231f20;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 10px 10px;
    position: absolute;
    top: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .journey-info-text {
    font-family: "Herokid";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 147.6%;
    /* or 30px */

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #ffffff;
  }

  .journey-info-text span {
    color: #87c7ec;
  }

  .journey-btn {
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
    text-align: center;
    text-transform: uppercase;
    color: #231f20;
    padding: 10px 20px;
    padding-top: 15px;
  }

  .modal-subtitle {
    font-family: "Herokid";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 30px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;

    color: #87c7ec;
  }

  .modal-title {
    font-family: "Herokid";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 60px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;
  }
`;
