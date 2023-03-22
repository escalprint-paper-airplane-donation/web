import { createGlobalStyle } from "styled-components";
import colors from "shared/assets/colors";

const GlobalStyle = createGlobalStyle`
/***
    The new CSS reset - version 1.8.4 (last updated 14.2.2023)
    GitHub page: https://github.com/elad2412/the-new-css-reset
***/

/*
    Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
    - The "symbol *" part is to solve Firefox SVG sprite bug
 */
    *:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol *)) {
    all: unset;
    display: revert;
}

/* Preferred box-sizing value */
*,
*::before,
*::after {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent;
    font-family: "Pretendard", Gothic, sans-serif;
    color:${colors.gray900};
    font-size: 62.5%;
    word-break: keep-all;
}

html, body, #root {
    height: 100%;
    overflow: hidden;
}

body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#root {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}


/* Reapply the pointer cursor for anchor tags */
a, button {
    cursor: revert;
}

a {
    text-decoration: none;
    color: inherit;
}

button {
    border: none;
    background-color: transparent;
    color: inherit;
    user-select: none;

    :focus {
      outline: 0;
      box-shadow: none !important;
    }

    :hover {
      cursor: pointer;
    }
}

/* Remove list styles (bullets/numbers) */
ol, ul, menu {
    list-style: none;
}

/* For images to not be able to exceed their container */
img {
    max-inline-size: 100%;
    max-block-size: 100%;
}

/* removes spacing between cells in tables */
table {
    border-collapse: collapse;
}

/* Safari - solving issue when using user-select:none on the <body> text input doesn't working */
input, textarea {
    -webkit-user-select: auto;
}

input {
    appearance: none;
    box-shadow: none;
    outline: none;
    border-radius: 0;

    :focus {
        outline: 0;
        box-shadow: none !important;
    }
}

textarea, p {
    overflow-wrap: break-word;
}

/* revert the 'white-space' property for textarea elements on Safari */
textarea {
    appearance: none;
    /* -webkit-appearance: none;
    -moz-appearance: none; */
    resize: none;
    box-shadow: none;
    outline: none;
    border-radius: 0;
    /* -webkit-box-shadow: none;
    -moz-box-shadow: none; */
    white-space: revert;
}

/* minimum style to allow to style meter element */
meter {
    -webkit-appearance: revert;
    appearance: revert;
}

/* preformatted text - use only for this feature */
:where(pre) {
    all: revert;
}

/* reset default text opacity of input placeholder */
::placeholder {
    color: unset;
}

/* remove default dot (•) sign */
::marker {
    content: initial;
}

/* fix the feature of 'hidden' attribute.
   display:revert; revert to element instead of attribute */
:where([hidden]) {
    display: none;
}

/* revert for bug in Chromium browsers
   - fix for the content editable attribute will work properly.
   - webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element*/
:where([contenteditable]:not([contenteditable="false"])) {
    -moz-user-modify: read-write;
    -webkit-user-modify: read-write;
    overflow-wrap: break-word;
    -webkit-line-break: after-white-space;
    -webkit-user-select: auto;
}

/* apply back the draggable feature - exist only in Chromium and Safari */
:where([draggable="true"]) {
    -webkit-user-drag: element;
}

/* Revert Modal native behavior */
:where(dialog:modal) {
    all: revert;
}
`;

export default GlobalStyle;
