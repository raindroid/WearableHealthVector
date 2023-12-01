import { Box, SxProps, Theme, styled } from "@mui/material";
import { Palette, PaletteColor } from "@mui/material/styles";

interface GenBoxProps {
  variant?: string;
  bgColor?: string;
  color?: string;
  opacity?: string;
  borderRadius?: string | number;
  shadow?: string | number;
}

const ALL_PALETTE_COLORS = [
  "primary",
  "secondary",
  "error",
  "warning",
  "info",
  "success",
] as const;
type PaletteColorTuple = typeof ALL_PALETTE_COLORS;
type PaletteColorType = PaletteColorTuple[number];

function isPaletteColorType(color: string): color is PaletteColorType {
  return ALL_PALETTE_COLORS.includes(color as PaletteColorType);
}

export default styled(Box)<GenBoxProps>(
  ({ theme, bgColor, color, opacity, borderRadius, shadow }) => {
    const { palette, shape, shadows } = theme;

    const { grey } = palette;
    const { borderRadius: radius } = shape;

    const greyColors: { [key: string]: string } = {
      "grey-100": grey[100],
      "grey-200": grey[200],
      "grey-300": grey[300],
      "grey-400": grey[400],
      "grey-500": grey[500],
      "grey-600": grey[600],
      "grey-700": grey[700],
      "grey-800": grey[800],
      "grey-900": grey[900],
    };

    const otherColors: { [key: string]: string } = {
      paper: palette.background.paper,
      background: palette.background.default,
      active: palette.action.active,
      hover: palette.action.hover,
      selected: palette.action.selected,
      disabled: palette.action.disabled,
      focus: palette.action.focus,
      "text.primary": palette.text.primary,
      "text.secondary": palette.text.secondary,
      "text.disabled": palette.text.disabled,
    };

    let backgroundValue: string | undefined = bgColor;

    if (bgColor !== undefined && isPaletteColorType(bgColor)) {
      backgroundValue = palette[bgColor as PaletteColorType].main;
    } else if (
      bgColor !== undefined &&
      Object.keys(greyColors).includes(bgColor)
    ) {
      backgroundValue = greyColors[bgColor];
    } else if (
      bgColor !== undefined &&
      Object.keys(otherColors).includes(bgColor)
    ) {
      backgroundValue = otherColors[bgColor];
    }

    // color value
    let colorValue: string | undefined = color;

    if (color !== undefined && isPaletteColorType(color)) {
      colorValue = palette[color as PaletteColorType].main;
    } else if (color !== undefined && Object.keys(greyColors).includes(color)) {
      colorValue = greyColors[color];
    } else if (
      color !== undefined &&
      Object.keys(otherColors).includes(color)
    ) {
      colorValue = otherColors[color];
    }

    // borderRadius value
    let borderRadiusValue: string | number | undefined = borderRadius ?? radius;

    // boxShadow value
    let boxShadowValue: string | undefined =
      typeof shadow === "string" ? shadow : undefined;

    if (typeof shadow === "number" && shadows.length > shadow) {
      boxShadowValue = shadows[shadow];
    }

    return {
      opacity,
      background: backgroundValue,
      color: colorValue,
      borderRadius: borderRadiusValue,
      boxShadow: boxShadowValue,
    };
  }
);
