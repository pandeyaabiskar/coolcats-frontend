import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/atoms/Button";
import PlusIcon from "./PlusIcon";
import MinusIcon from "./MinusIcon";
import { Card, notification, Spin } from "antd";
import { deviceWidth, THEME } from "../../../config";
import { MetaMaskContext } from "../../../hoc/Metamask";
import { generateCrowdsaleContract } from "../../../services/crowdSaleContract";
import { formatMetamaskError, formatWei } from "../../../helpers/formatters";

import Countdown from "react-countdown";
// import { getWhiteListUserByWallet } from '../../services';

const MINT_LIMIT = 2;
export default function MintPage() {
    const [fetchMintInfoLoading, setFetchMintInfoLoading] = useState(false);

    const [isMintLoading, setIsMintLoading] = useState(false);
    const [mintValue, setMintValue] = React.useState(0);
    const [mintPrice, setMintPrice] = React.useState(0);

    const [totalCap, setTotalCap] = React.useState(0);

    const [totalMinted, setTotalMinted] = React.useState(0);

    const [isMintPaused, setIsMintPaused] = React.useState(0);

    const [mintClosingTime, setMintClosingTime] = React.useState(0);
    const [mintOpeningTime, setMintOpeningTime] = React.useState(0);

    const [isSaleStarted, setIsSaleStarted] = useState(false);

    useEffect(() => {
        setIsSaleStarted(Date.now() >= mintOpeningTime * 1000);
    }, [mintOpeningTime]);

    const isSaleClosed = useMemo(() => {
        return Date.now() > mintClosingTime * 1000;
    }, [mintClosingTime]);

    const isSoldOut = useMemo(() => {
        return totalMinted === totalCap;
    }, [totalCap, totalMinted]);

    const publicSaleContract = React.useMemo(() => {
        return generateCrowdsaleContract();
    }, []);

    const { connect, isActive, account } = React.useContext(MetaMaskContext);

    React.useEffect(() => {
        fetchMintInfo();
    }, []);

    const fetchMintInfo = async () => {
        setFetchMintInfoLoading(true);
        try {
            const price = await publicSaleContract.getTokenPrice();
            const tokenSold = await publicSaleContract.getTokenSold();
            const tokenCap = await publicSaleContract.getTokenCap();
            const isPaused = await publicSaleContract.getPauseStatus();
            const mintOpeningTime = await publicSaleContract.getOpeningTime();
            const mintClosingTime = await publicSaleContract.getClosingTime();

            setMintOpeningTime(mintOpeningTime);
            setMintClosingTime(mintClosingTime);

            setMintPrice(price);
            setTotalCap(tokenCap);
            setTotalMinted(tokenSold);
            setIsMintPaused(isPaused);

            console.log({ tokenCap, tokenSold });
        } catch (error) {
            console.log("Error while fetching Price");
        } finally {
            setFetchMintInfoLoading(false);
        }
    };

    const mint = async () => {
        if (!mintValue) {
            notification.error({
                message: "Mint Quantity must be at least 1!",
            });
            return;
        }

        if (!account) {
            notification.error({
                message: "Please connect with your wallet first!",
            });
            return;
        }

        setIsMintLoading(true);
        try {
            const txn = await publicSaleContract.mintTokens(
                account ?? "",
                mintPrice,
                mintValue
            );
            notification.success({ message: "Successfully Minted!" });
            fetchMintInfo();
        } catch (error) {
            const errorMessage = formatMetamaskError(
                error,
                "Error while minting"!
            );
            notification.error({ message: errorMessage });
        } finally {
            setIsMintLoading(false);
        }
    };

    return (
        <>
            <Wrapper>
                <div className="membership-info top-wra">
                    <div className="membership-info-title content">
                        <h1 className="title">Mint NFT</h1>
                    </div>

                    {/* <ModalComponent isVisible={!isClosable} closable={isClosable} >
                        <ModalWrapper>
                            <div className="modal-content">
                                <div className='modal-heading'>
                                    <p>Minting starts in</p>
                                </div>
                                <div className="modal-timer">
                                    <div className="timer-wrapper">
                                        <div className="timer-item">
                                            <span>{hour}</span>
                                            <span className='duration'> h</span>
                                        </div> <p className='dot'>:</p>
                                        <div className="timer-item">
                                            <span>{minute}</span>
                                            <span className='duration'> m</span>
                                        </div> <p className='dot'>:</p>
                                        <div className="timer-item">
                                            <span>{second}</span>
                                            <span className='duration'> s</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='modal-subheading'>
                                    While waiting feel free to read about differnt member ship tiers and benefits <Link className="modal-link" to="/membership">here</Link>
                                </div>
                            </div>
                        </ModalWrapper>
                    </ModalComponent> */}
                    {fetchMintInfoLoading ? (
                        <Spin size="large" />
                    ) : isSoldOut ? (
                        <div className="minting-container">
                            <MemberCard className="card-container">
                                <div className="card-header">Mint Sold Out</div>
                                <div className="card-body">
                                    All the tokens has been sold out!!
                                </div>
                            </MemberCard>
                        </div>
                    ) : !isSaleStarted ? (
                        <div className="minting-container">
                            <MemberCard className="card-container">
                                <div className="card-header">
                                    Sale Not Started
                                </div>
                                <div className="card-body">
                                    <p>
                                        Sale has not started yet. Please visit
                                        us again later!
                                    </p>
                                    <br />
                                    <p
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: "24px",
                                        }}
                                    >
                                        <Countdown
                                            date={mintOpeningTime * 1000}
                                            onComplete={() =>
                                                setIsSaleStarted(true)
                                            }
                                        />
                                    </p>
                                </div>
                            </MemberCard>
                        </div>
                    ) : isSaleClosed ? (
                        <div className="minting-container">
                            <MemberCard className="card-container">
                                <div className="card-header">Mint Closed</div>
                                <div className="card-body">
                                    Sorry, minting time is closed!
                                </div>
                            </MemberCard>
                        </div>
                    ) : isMintPaused ? (
                        <div className="minting-container">
                            <MemberCard className="card-container">
                                <div className="card-header">Mint Paused</div>
                                <div className="card-body">
                                    Minting is currently paused, please visit us
                                    again. Sorry for your inconvenience.
                                </div>
                            </MemberCard>
                        </div>
                    ) : (
                        <div className="minting-container">
                            <MemberCard className="card-container">
                                <div className="card-header">Start mint</div>
                                <p className="card-body">
                                    <p>Total Cap : {totalCap}</p>
                                    <p>Total Minted : {totalMinted}</p>
                                    Select the number of NFTs you want to mint.
                                </p>
                                {/*<div className="membership">
                <div
                  className={
                    isGold ? "membership-option checked" : "membership-option"
                  }
                  onClick={(e) => handleMembershipOptionChange(e, "gold")}
                >
                  <div className={"membership-item"}>
                    {isGold ? (
                      <CheckBoxIcon fill={`${THEME.colors.brand}`} />
                    ) : (
                      <CheckBoxIcon fill={THEME.colors.contentMuted} />
                    )}
                    Gold - 0.3 ETH
                  </div>
                  <div className="membership-mint">898/1000 Minted</div>
                </div>

                <div
                  className={
                    isSilver ? "membership-option checked" : "membership-option"
                  }
                  onClick={(e) => handleMembershipOptionChange(e, "silver")}
                >
                  <div className={"membership-item"}>
                    {isSilver ? (
                      <CheckBoxIcon fill={`${THEME.colors.brand}`} />
                    ) : (
                      <CheckBoxIcon fill={THEME.colors.contentMuted} />
                    )}
                    Silver - 0.2 ETH
                  </div>
                  <div className="membership-mint">655/1000 Minted</div>
                </div>
              </div> */}
                                <div className="mint-container">
                                    <div>
                                        {mintValue <= 1 ? (
                                            <DButton className="mint-btn disabled">
                                                <MinusIcon
                                                    fill={`${THEME.colors.contentDisabled}`}
                                                />
                                            </DButton>
                                        ) : (
                                            <p
                                                className="mint-btn"
                                                onClick={() =>
                                                    setMintValue(mintValue - 1)
                                                }
                                            >
                                                <MinusIcon
                                                    fill={`${THEME.colors.interactive.surface.brand.primary.default}`}
                                                />
                                            </p>
                                        )}
                                    </div>

                                    <div className="mint-input">
                                        {mintValue}
                                    </div>
                                    <div>
                                        {mintValue >= MINT_LIMIT ? (
                                            <DButton className="mint-btn disabled">
                                                <PlusIcon
                                                    fill={`${THEME.colors.contentDisabled}`}
                                                />
                                            </DButton>
                                        ) : (
                                            <p
                                                className="mint-btn"
                                                onClick={() =>
                                                    setMintValue(mintValue + 1)
                                                }
                                            >
                                                <PlusIcon
                                                    fill={`${THEME.colors.interactive.surface.brand.primary.default}`}
                                                />
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="mint-info">
                                    <p>Maximum 2 per transaction</p>
                                </div>
                                <div className="connect-wallet">
                                    {isActive ? (
                                        <LButton
                                            onClick={mint}
                                            btnSize="large"
                                            btntype="primary"
                                            btntext={
                                                isMintLoading
                                                    ? "Minting...."
                                                    : `Mint at ${formatWei(
                                                          mintPrice * mintValue
                                                      )} ETH`
                                            }
                                            isdisabled={isMintLoading}
                                        />
                                    ) : (
                                        <LButton
                                            onClick={connect}
                                            btnSize="large"
                                            btntype="neutral"
                                            btntext="Connect your wallet"
                                        />
                                    )}
                                </div>
                            </MemberCard>
                        </div>
                    )}
                </div>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    margin: 226px auto 180px auto;
    gap: 128px;
    max-width: 1505px;

    @media screen and (max-width: ${deviceWidth.bp1920}) {
        margin: 226px auto 180px auto;
        gap: 128px;
        max-width: 1505px;
    }

    @media screen and (max-width: ${deviceWidth.bp1728}) {
        margin: 226px auto 180px auto;
        gap: 120px;
        max-width: 1456px;
    }

    @media screen and (max-width: ${deviceWidth.bp1536}) {
        margin: 218px auto 160px auto;
        gap: 112px;
        max-width: 1286px;
    }

    @media screen and (max-width: ${deviceWidth.bp1366}) {
        margin: 202px auto 160px auto;
        gap: 104px;
        max-width: 1200px;
    }

    @media screen and (max-width: ${deviceWidth.bp1280}) {
        margin: 188px auto 160px auto;
        gap: 96px;
        max-width: 912px;
    }

    @media screen and (max-width: ${deviceWidth.bp1024}) {
        margin: 172px auto 120px auto;
        gap: 80px;
        max-width: 648px;
    }

    @media screen and (max-width: ${deviceWidth.bp768}) {
        margin: 140px auto 120px auto;
        gap: 72px;
        max-width: 400px;
    }

    @media screen and (max-width: ${deviceWidth.bp480}) {
        margin: 140px auto 120px auto;
        gap: 64px;
        max-width: 400px;
    }

    @media screen and (max-width: ${deviceWidth.bp440}) {
        margin: 140px auto 120px auto;
        gap: 64px;
        max-width: 312px;
    }

    & .membership-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;

        gap: 128px;

        @media screen and (max-width: ${deviceWidth.bp1728}) {
            gap: 120px;
        }

        @media screen and (max-width: ${deviceWidth.bp1536}) {
            gap: 112px;
        }

        @media screen and (max-width: ${deviceWidth.bp1366}) {
            gap: 104px;
        }

        @media screen and (max-width: ${deviceWidth.bp1280}) {
            gap: 96px;
        }

        @media screen and (max-width: ${deviceWidth.bp1024}) {
            gap: 80px;
        }

        @media screen and (max-width: ${deviceWidth.bp768}) {
            gap: 72px;
        }

        @media screen and (max-width: ${deviceWidth.bp480}) {
            gap: 64px;
        }

        & .membership-info-title {
            & > h1 {
                ${THEME.typography.heading10}

                @media screen and (max-width: ${deviceWidth.bp1536}) {
                    ${THEME.typography.heading9}
                }

                @media screen and (max-width: ${deviceWidth.bp768}) {
                    ${THEME.typography.heading7}
                }
            }
        }

        // & > p {
        //     margin-top: 48px;
        // }
    }

    & .minting-container {
        display: flex;
        flex-direction: row;
        gap: 120px;

        @media (max-width: ${deviceWidth.tablet}) {
            gap: 64px;
            flex-direction: column;
        }
    }
`;
const MemberCard = styled(Card)`
    padding: 32px;
    height: fit-content;
    max-width: 540px;
    background: #ffffff;
    box-shadow: 0px 16px 64px rgba(30, 44, 106, 0.12);
    border-radius: 16px;
    display: flex;
    border: 0;
    text-align: left;
    & .ant-card-body {
        padding: 0;
    }

    & .card-header {
        ${THEME.typography.heading5}
        color: ${THEME.colors.contentSecondary};
        margin-bottom: 8px;
    }

    & .card-body {
        ${THEME.typography.body2}
        color: ${THEME.colors.contentMuted}
    }

    .membership {
        padding: 32px 0;
    }

    & .membership-option {
        display: flex;
        cursor: pointer;
        flex-direction: row;
        margin-top: 16px;
        place-items: center;
        border: 1px solid ${THEME.colors.borderSecondary};
        border-radius: 100px;
        justify-content: space-between;
        align-items: center;
        height: 59px;
        padding: 0 16px;
    }

    & .membership-option:first-child {
        margin-top: 0;
    }

    & .membership-option.checked {
        background: ${THEME.colors.secondary};
        border-color: ${THEME.colors.secondary};
    }

    & .membership-option.checked > .membership-item {
        color: ${THEME.colors.contentPrimary};
    }

    & .membership-option.checked > .membership-item > input {
        background: ${THEME.colors.surfaceSubtle};
    }

    & .membership-item {
        display: flex;
        flex-direction: row ${THEME.typography.strong4};
        font-size: 18px;
        justify-content: center;
        align-items: center;
        gap: 16px;
        font-weight: 600;
        color: ${THEME.colors.contentSecondary};
    }

    & .membership-mint {
        ${THEME.typography.label2}
        font-size: 14px;
        font-weight: 600;
        color: ${THEME.colors.contentMuted};
        @media screen and (max-width: ${deviceWidth.bp440}) {
            display: none;
        }
    }

    & .mint-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px;
        gap: 32px;
    }
    & .mint-btn {
        display: flex;
        cursor: pointer;
        height: 44px;
        width: 44px;
        border-radius: 100px;
        background: #d8deff;
        color: ${THEME.colors.contentPrimary};
        align-items: center;
        text-align: center;
        justify-content: center;
        user-select: none;
        font-weight: 600;
    }
    & .mint-btn.disabled {
        background: #f1f3f6;
        color: ${THEME.colors.contentMuted};
    }
    .danger {
        color: red;
        text-align: center;
    }
    .disabled {
        font-style: bold;
        background: #f1f3f6;
        color: ${THEME.colors.contentMuted};
        &:hover {
            background: #f1f3f6;
            color: ${THEME.colors.contentMuted};
        }
    }

    & .mint-input {
        ${THEME.typography.label6}
    }
    & .mint-info {
        ${THEME.typography.body2}
        color: ${THEME.colors.contentMuted};
        place-items: center;
        text-align: center;
        margin-top: 10px;
    }

    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }
`;

const LButton = styled(Button)`
    ${THEME.typography.label4}
    color: ${THEME.colors.primary};
    border-radius: 100px;
    height: 59px;
    width: 100%;
    margin-top: 32px;
`;
// disabled button
const DButton = styled.p`
    ${THEME.typography.label4}
    background: #F1F3F6;
    border-radius: 100px;
    color: ${THEME.colors.contentMuted};
    &:hover {
        background: #f1f3f6;
        color: ${THEME.colors.contentMuted};
    }
    &:focus {
        background: #f1f3f6;
        color: ${THEME.colors.contentMuted};
    }
    &:active {
        background: #f1f3f6;
        color: ${THEME.colors.contentMuted};
    }
`;
const Section = styled.section`
    color: ${THEME.colors.contentMuted};
    display: flex;
    align-items: center;
    text-align: left;

    gap: 64px;

    @media screen and (max-width: ${deviceWidth.bp1280}) {
        justify-content: space-evenly;
    }

    @media screen and (max-width: ${deviceWidth.bp768}) {
        flex-direction: column;
        gap: 64px;
    }

    & .membership-desc-item-media {
        & img {
            max-width: 200px;
        }
    }

    & .membership-nft-title {
        ${THEME.typography.strong4}
        color: ${THEME.colors.contentSecondary};
        margin: 16px 0 0 5px;
    }

    & .membership-nft-detail-wrapper {
        margin: 16px 0 16px 5px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    & .membership-nft-total-for-mint {
        ${THEME.typography.label2}
        color: ${THEME.colors.contentMuted};
    }

    & .membership-nft-price {
        ${THEME.typography.label2}
        color: ${THEME.colors.contentMuted};
    }

    & .membership-nft-perks-link {
        margin: 0 0 0 5px;
        ${THEME.typography.label2}
    }
`;
const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & .modal-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 64px;

        & .modal-heading {
            ${THEME.typography.heading8}

            & p {
                color: ${THEME.colors.contentSecondary};
            }
        }

        & .modal-timer {
            ${THEME.typography.heading10}
            color:${THEME.colors.contentSecondary};

            & .timer-wrapper {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }

            & .dot {
                color: ${THEME.colors.contentMuted};
                padding: 0 12px;
            }
        }

        & .modal-subheading {
            text-align: center;
            ${THEME.typography.body4}
            color: ${THEME.colors.contentSecondary};

            @media screen and (max-width: ${deviceWidth.bp768}) {
                ${THEME.typography.body3}
            }
        }

        & .modal-link {
            font-weight: 400;
            font-size: 14px;
            color: ${THEME.colors.brand};
        }

        & .duration {
            ${THEME.typography.heading8}
            color: ${THEME.colors.contentSecondary};
        }

        @media screen and (max-width: ${deviceWidth.bp1536}) {
            gap: 56px;

            & .modal-heading {
                ${THEME.typography.heading7}
            }
        }

        @media screen and (max-width: ${deviceWidth.bp768}) {
            gap: 40px;

            & .modal-heading {
                ${THEME.typography.heading6}
            }
        }
    }
`;
