/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from "web3";

export const humanize = (s: string): string => {
    if (typeof s !== "string") return s;

    return s
        .replace(/^[\s_]+|[\s_]+$/g, "")
        .replace(/[_\s]+/g, " ")
        .replace(/-/g, " ")
        .replace(/^[a-z]/, function (m) {
            return m.toUpperCase();
        });
};

export function formatDecimals(
    tokenValue: string | number | null,
    maximumFractionDigits = 4
): string {
    if (tokenValue === null) return "-";
    if (!tokenValue || isNaN(Number(tokenValue)))
        return tokenValue?.toString?.();

    const stringValue: string = tokenValue.toLocaleString("en-US", {
        maximumFractionDigits: maximumFractionDigits,
        minimumIntegerDigits: 1,
    });

    return stringValue;
}

export function trimStr(
    str: string,
    trimStartCount = 10,
    endCount = 7
): string {
    if (str?.length > 20) {
        return str.substr(0, trimStartCount) + "....." + str.substr(-endCount);
    }

    return str;
}

export function copyToClipboard(content: string): boolean {
    try {
        const textarea = document.createElement("textarea");
        textarea.value = content;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();

        return true;
    } catch (e) {
        return false;
    }
}

export function formatMetamaskError(error: any, errorMessage: string): string {
    if (!error) {
        return errorMessage;
    } else if (error.code === 4001) {
        return "User denied the operation";
    } else if (error.code === 4100) {
        return "An error has occured! Please give permission to access your wallet.";
    } else if (error.code === -32603 || error.code === 32000)
        return "Error while processing transaction!";
    else return errorMessage;
}

export const roundDownDecimal = (
    number: string | number,
    decimalPlace = 4
): number => {
    if (!number) return 0;
    return (
        Math.floor(Number(number) * Math.pow(10, decimalPlace)) /
        Math.pow(10, decimalPlace)
    );
};

export const formatIntValue = (value: number | string): number | string => {
    if (!value) return 0;

    return Number(value).toLocaleString("fullwide", {
        useGrouping: false,
    });
};

export const formatWei = (value: number | string): string => {
    if (!value) return "0";

    const weiValue = formatIntValue(value);

    return formatDecimals(Web3.utils.fromWei(String(weiValue), "ether"));
};
