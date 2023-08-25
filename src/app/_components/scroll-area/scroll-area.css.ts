import { style } from "@vanilla-extract/css"

export const scrollAreaCorner = style({
  background: "var(--black-a8)",
});

export const scrollAreaRoot = style({
  width: "200px",
  height: "225px",
  borderRadius: "4px",
  overflow: "hidden",
  boxShadow: "0 2px 10px var(--black-a7)",
  backgroundColor: "white",
  "vars": {
    "--scrollbar-size": "10px",
  },
});

export const scrollAreaThumb = style({
  flex: "1",
  background: "var(--mauve-10)",
  borderRadius: "var(--scrollbar-size)",
  position: "relative",
  "::before": {
    content: "",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "100%",
    height: "100%",
    minWidth: "44px",
    minHeight: "44px",
  },
});

export const scrollAreaViewport = style({
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
});

export const tag = style({
  color: "var(--mauve-12)",
  fontSize: "13px",
  lineHeight: "18px",
  marginTop: "10px",
  borderTop: "1px solid var(--mauve-6)",
  paddingTop: "10px",
});

export const text = style({
  color: "var(--violet-11)",
  fontSize: "15px",
  lineHeight: "18px",
  fontWeight: "500",
});

export const scrollAreaScrollbar = style({
  display: "flex",
  userSelect: "none",
  touchAction: "none",
  padding: "2px",
  background: "var(--black-a6)",
  transition: "background 160ms ease-out",
  ":hover": {
    background: "var(--black-a8)",
  },
  "selectors": {
    "&[data-orientation='horizontal']": {
      flexDirection: "column",
      height: "var(--scrollbar-size)",
    },
    "&[data-orientation='vertical']": {
      width: "var(--scrollbar-size)",
    },
  },
});

