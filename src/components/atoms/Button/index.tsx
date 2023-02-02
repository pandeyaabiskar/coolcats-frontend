import React from "react";
// import { Button as ButtonComponent, ButtonProps, Spin } from 'antd'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { THEME } from "../../../config/theme";
import { ButtonProps } from "@mui/material";

import {
  ButtonUnstyled as ButtonComponent,
  buttonUnstyledClasses,
} from "@mui/base";

interface IProps extends ButtonProps {
  btntext: string;
  btnIcon?: any;
  isdisabled?: boolean;
  className?: string;
  to?: string;
  isExternalLink?: boolean;
  btntype?: "primary" | "secondary" | "neutral";
  btnSize?: "large" | "medium" | "small" | "very-small";
}

export const Button: React.FC<IProps> = (props: IProps) => {
  const { btntext, btnIcon, isdisabled, to, isExternalLink, className } = props;
  const ButtonContent = () => {
    return (
      <ButtonWrapper {...props} className={className} disabled={isdisabled}>
        {btnIcon}
        <span>{btntext}</span>
      </ButtonWrapper>
    );
  };

  if (isExternalLink) {
    return (
      <a target="_blank" href={to || "#"} rel="noreferrer">
        <ButtonContent />
      </a>
    );
  }

  if (!!to) {
    return (
      <Link to={to || "#"}>
        <ButtonContent />
      </Link>
    );
  }
  return <ButtonContent />;
};

const ButtonWrapper = styled(ButtonComponent)<IProps>`
  cursor: pointer;
  border-radius: 100px;
  color: ${({ btntype }: IProps) =>
    btntype === "secondary" ? THEME.colors.brand : THEME.colors.primary};
  background: ${({ btntype }: IProps) =>
    btntype === "neutral"
      ? THEME.colors.inverse
      : btntype === "secondary"
      ? THEME.colors.surfaceSubtle
      : THEME.colors.brand};

  padding: ${({ btnSize }: IProps) =>
    btnSize === "very-small"
      ? "6px 16px"
      : btnSize === "medium"
      ? "12px 24px"
      : btnSize === "small"
      ? "8px 20px"
      : "16px 32px"};
  border-radius: 100px;
  font-family: ${THEME.font.herokid};
  font-weight: 600;
  font-size: ${({ btnSize }: IProps) =>
    btnSize === "very-small"
      ? "14px"
      : btnSize === "small"
      ? "16px"
      : btnSize === "medium"
      ? "16px"
      : "18px"};
  line-height: ${({ btnSize }: IProps) =>
    btnSize === "very-small"
      ? "21px"
      : btnSize === "small"
      ? "24px"
      : btnSize === "medium"
      ? "24px"
      : "27px"};

  border: 0;
  box-shadow: none;
  height: fit-content;
  width: fit-content;

  &:hover {
    color: ${({ btntype }: IProps) =>
      btntype === "secondary" ? THEME.colors.brand : THEME.colors.primary};
    background-color: ${({ btntype }: IProps) =>
      btntype === "neutral"
        ? "#444651"
        : btntype === "secondary"
        ? "#EAEDFF"
        : "#5F79FF"};
  }
  & :active,
  :focus {
    color: ${({ btntype }: IProps) =>
      btntype === "secondary" ? THEME.colors.brand : THEME.colors.primary};
    background-color: ${({ btntype }: IProps) =>
      btntype === "neutral"
        ? "#323543"
        : btntype === "secondary"
        ? "#CED6FF"
        : "#324EDF"};
  }
  &.${buttonUnstyledClasses.disabled} {
    /* opacity: 0.5; */
    cursor: not-allowed;
    background: #f5f5f5;
    border-color: #d9d9d9;
    box-shadow: none;
    color: rgba(0, 0, 0, 0.25);
    text-shadow: none;
  }

  /* @media screen and (max-width: 768px) {
    font-size: 18px;
    line-height: '24px';
    padding: 12px;
    min-width: 240px;
  } */
`;

export default Button;
