const colors = {
  primary: "#FFFFFF",
  secondary: "#EFF2F6",
  tertiary: "#E8EBEF",
  brand: "#153AFB",
  inverse: "#383942",
  borderPrimary: "#EAEAEA",
  borderSecondary: "#EEEEEE",
  contentMuted: "#8E919B",
  contentDisabled: "#9A9EAA",
  contentSecondary: "#4F515C",
  contentPrimary: "#2D2E34",
  surfaceSubtle: "#D8DEFF",

  surfaceTertiary: "#F5F6FF",
  supportDanger: {
    primary: "#F3536B",
    secondary: "#FEE1E7",
  },
  supportWarning: {
    primary: "##FCE45",
    secondary: "#FFF8E7",
  },
  supportInfo: {
    primary: "#3E62FE",
    secondary: "#E3EDFF",
  },
  interactiveSurfacePrimary: {
    default: "#ffffff",
    hover: "#EAEDFF",
    active: "#CED6FF",
  },
  interactiveSurfaceSecondary: {
    default: "#EFF2F6",
    hover: "#F5F7FA",
    active: "#D5DAE1",
  },
  interactiveSurfaceBrandPrimary: {
    default: "#00AA13",
    hover: "#33BB42",
    active: "#067817",
  },
  interactiveSurfaceBrandSecondary: {
    default: "#DFF6E0",
    hover: "#EFF8F0",
    active: "#BDECC6",
  },
  interactiveSupportSuccessPrimary: {
    default: "#00D5B5",
    hover: "#84E1CC",
    active: "#04AF99",
  },

  interactive: {
    invalid: "#EC4453",

    surface: {
      brand: {
        primary: {
          default: "#153AFB",
          hover: "#2A4DFF",
          active: "##1033E8",
        },
        secondary: {
          default: "#D8DEFF",
          hover: "#EAEDFF",
          active: "#CED6FF",
        },
      },

      inverse: {
        secondary: {
          default: "#EFF2F6",
          hover: "#F5F7FA",
          active: "#DDE1E8",
        },
      },
    },

    support: {
      success: {
        secondary: {
          default: "#E8FBF7",
          hover: "#E8FBF7",
          active: "#B0F2E9",
        },
      },
      danger: {
        secondary: {
          default: "#FEE1E7",
          hover: "#FFF1F4",
          active: "#FFC6D0",
        },
      },
    },
  },
  overlay: {
    secondary: {
      light: "rgba(255, 255, 255, 0.4)",
      high: "rgba(255, 255, 255, 0.9)",
      tight: "rgba(255, 255, 255, 0.9)",
    },
  },
  shadow: {
    high: "0px 16px 16px rgba(30, 44, 106, 0.12)",
  },
};

const font = {
  herokid: "'Herokid', sans-serif",
};

const typographyBase = {
  fontStyle: "normal",
  fontFamily: "'Herokid', sans-serif",
};

const typographyDisplay = {
  fontFamily: "'Herokid', sans-serif",
  color: colors.contentPrimary,
  fontWeight: 800,
  letterSpacing: "-0.02em",
};

const typographyHeading = {
  ...typographyBase,
  fontWeight: "800",
  color: colors.contentPrimary,
  letterSpacing: "-0.02em",
};
const typographyBody = {
  ...typographyBase,
  fontWeight: "400",
  color: colors.contentSecondary,
};
const typographyLabel = {
  ...typographyBase,
  fontWeight: 600,
  color: colors.contentSecondary,
};
const typographyStrong = {
  ...typographyBase,
  fontWeight: 700,
};
const typographybackquote = {
  fontFamily: "'DM Serif Display', sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
};

const typography = {
  display1: {
    ...typographyDisplay,
    fontSize: "88px",
    lineHeight: "105px",
  },
  display2: {
    ...typographyDisplay,
    fontSize: "72px",
    lineHeight: "90px",
    letterSpacing: "-0.02em",
  },

  heading10: {
    ...typographyHeading,
    fontSize: "56px",
    lineHeight: "73px",
  },
  heading9: {
    ...typographyHeading,
    fontSize: "50px",
    lineHeight: "70px",
  },
  heading8: {
    ...typographyHeading,
    fontSize: "44px",
    lineHeight: "62px",
  },
  heading7: {
    ...typographyHeading,
    fontSize: "32px",
    lineHeight: "45px",
  },
  heading6: {
    ...typographyHeading,
    fontSize: "28px",
    lineHeight: "40px",
  },
  heading5: {
    ...typographyHeading,
    fontSize: "24px",
    lineHeight: "30px",
  },
  heading4: {
    ...typographyHeading,
    fontSize: "22px",
    lineHeight: "28px",
  },
  heading3: {
    ...typographyHeading,
    fontSize: "21px",
    lineHeight: "26px",
  },
  heading2: {
    ...typographyHeading,
    fontSize: "18px",
    lineHeight: "22px",
  },
  heading1: {
    ...typographyHeading,
    fontSize: "16px",
    lineHeight: "20px",
  },

  body7: {
    ...typographyBody,
    fontSize: "28px",
    lineHeight: "46px",
  },
  body6: {
    ...typographyBody,
    fontSize: "24px",
    lineHeight: "38px",
  },
  body5: {
    ...typographyBody,
    fontSize: "21px",
    lineHeight: "35px",
  },
  body4: {
    ...typographyBody,
    fontSize: "18px",
    lineHeight: "28px",
  },
  body3: {
    ...typographyBody,
    fontSize: "16px",
    lineHeight: "25px",
  },
  body2: {
    ...typographyBody,
    fontSize: "14px",
    lineHeight: "22px",
  },
  body1: {
    ...typographyBody,
    fontSize: "12px",
    lineHeight: "20px",
  },
  label7: {
    ...typographyLabel,
    fontSize: "28px",
    lineHeight: "46px",
  },
  label6: {
    ...typographyLabel,
    fontSize: "24px",
    lineHeight: "38px",
  },
  label5: {
    ...typographyLabel,
    fontSize: "21px",
    lineHeight: "35px",
  },
  label4: {
    ...typographyLabel,
    fontSize: "18px",
    lineHeight: "28px",
  },
  label3: {
    ...typographyLabel,
    fontSize: "16px",
    lineHeight: "25px",
  },
  label2: {
    ...typographyLabel,
    fontSize: "14px",
    lineHeight: "22px",
  },
  label1: {
    ...typographyLabel,
    fontSize: "12px",
    lineHeight: "20px",
  },
  strong7: {
    ...typographyStrong,
    fontSize: "28px",
  },
  strong6: {
    ...typographyStrong,
    fontSize: "24px",
  },
  strong5: {
    ...typographyStrong,
    fontSize: "21px",
  },
  strong4: {
    ...typographyStrong,
    fontSize: "18px",
  },
  strong3: {
    ...typographyStrong,
    fontSize: "16px",
  },
  strong2: {
    ...typographyStrong,
    fontSize: "14px",
  },
  strong1: {
    ...typographyStrong,
    fontSize: "12px",
  },
  blockquote3: {
    ...typographybackquote,
    fontSize: "48px",
    lineHeight: "62px",
    letterSpacing: "-0.02em",
  },
  blockquote2: {
    ...typographybackquote,
    fontSize: "38px",
    lineHeight: "49px",
    letterSpacing: "-0.02em",
    color: "#000000",
  },
  blockquote1: {
    ...typographybackquote,
    fontSize: "28px",
    lineHeight: "38px",
    letterSpacing: "-0.02em",
    color: "#000000",
  },
};

export const THEME = { colors, typography, font };

export const deviceWidth = {
  desktopXl: "1920px",
  desktopLg: "1728px",
  desktopMd: "1536px",
  desktopXs: "1366px",
  tabletXl: "1280px",
  tablet: "1024px",
  tabletSm: "768px",
  mobile768: "768px",
  // mobile500: '480px',
  mobile500: "479px",
  mobileXs: "360px",

  bp1920: "1919px",
  bp1728: "1727px",
  bp1536: "1535px",
  bp1366: "1365px",
  bp1280: "1279px",
  bp1024: "1023px",
  bp768: "767px",
  bp480: "479px",
  bp440: "419px",
  bp360: "360px",
};
