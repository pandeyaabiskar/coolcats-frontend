import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected, THEME } from "../../config";
import { notification } from "antd";
import { InjectedConnector } from "@web3-react/injected-connector";

interface IProps {
    children?: React.ReactNode;
}

interface MetaMaskProps {
    isActive: boolean;
    account: string | undefined | null;
    isLoading: boolean;
    connect: () => Promise<void>;
    disconnect: () => void;
}

export const MetaMaskContext = React.createContext<Partial<MetaMaskProps>>({});

export const MetaMaskProvider: React.FC<IProps> = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    const [isLoading] = useState(true);
    const { activate, account, deactivate, library: provider } = useWeb3React();

    const isMetaMaskInstalled = () => {
        //@ts-ignore
        return typeof window?.ethereum !== "undefined";
    };
    const connect = async () => {
        console.log("Connecting to MetaMask Wallet");
        if (isMetaMaskInstalled()) {
            try {
                await activate(injected, (error: Error) => {
                    console.log("error in metamask conect ", error.name);
                    switch (error.name) {
                        case "UnsupportedChainIdError":
                            notification.error({
                                placement: "top",
                                message: "Please change to Ethernet mainnet.",
                                style: { width: 400 },
                            });
                            break;

                        case "UserRejectedRequestError":
                            notification.error({
                                placement: "top",
                                message: "Please Allow to connect on metamask.",
                            });
                            break;

                        default:
                            //@ts-ignore
                            if (error?.code === -32002) {
                                notification.error({
                                    placement: "top",
                                    message:
                                        "A request for connecting to metamask is processing. Please finish that first.",
                                });
                                break;
                            }
                            notification.error({
                                placement: "top",
                                message: "Unable to connect to your wallet",
                            });
                            break;
                    }
                });
            } catch (error) {
                notification.error({ message: "Error on Connecting" });
            }
        } else {
            notification.error({
                placement: "top",
                duration: 6,
                message: (
                    <span>
                        Please Download and Install Metamask Extension from this{" "}
                        <a
                            href="https://metamask.io/download/"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                textDecoration: "underline",
                                color: THEME.colors.brand,
                            }}
                        >
                            Link
                        </a>
                    </span>
                ),
            });
        }
    };

    const disconnect = () => {
        console.log("Deactivating...");

        try {
            deactivate();
        } catch (error) {
            notification.error({ message: "Error on disconnecting:" });
            console.log("Error on disconnecting: ", error);
        }
    };

    const handleIsActive = useCallback(() => {
        setIsActive(Boolean(account));
    }, [account]);

    useEffect(() => {
        handleIsActive();
    }, [handleIsActive]);

    const values = useMemo(
        () => ({
            isActive,
            account,
            isLoading,
            connect,
            disconnect,
        }),
        // eslint-disable-next-line
        [isActive, isLoading, connect, account]
    );

    return (
        <MetaMaskContext.Provider value={values}>
            {children}
        </MetaMaskContext.Provider>
    );
};

export function useMetaMask() {
    const context = React.useContext(MetaMaskContext);

    if (context === undefined) {
        throw new Error(
            "useMetaMask hook must be used with a MetaMaskProvider component"
        );
    }

    return context;
}
