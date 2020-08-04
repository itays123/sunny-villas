// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from "https://jspm.dev/react@16.13.1";

// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from "https://jspm.dev/react-dom@16.13.1/server";

// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/react-dom.d.ts"
import ReactDOM from "https://jspm.dev/react-dom@16.13.1";

import MatUI from "https://jspm.dev/@material-ui/core@4.11.0";
import MenuIconComponent from "https://jspm.dev/@material-ui/icons@4.9.1/Menu";
import ForwardIconComponent from "https://jspm.dev/@material-ui/icons@4.9.1/Forward";

const MenuIcon = MenuIconComponent.default;
const ForwardIcon = ForwardIconComponent.default;

import { useRouter } from "https://deno.land/x/attain@1.0.6/react/AttainRouter.js";
import {
  useDocument,
  addMeta,
  addScript,
  setTitle,
} from "https://deno.land/x/attain@1.0.6/react/AttainReactUtils.js";

export {
  React,
  ReactDOM,
  ReactDOMServer,
  MatUI,
  useRouter,
  useDocument,
  addMeta,
  addScript,
  setTitle,
  MenuIcon,
  ForwardIcon,
};
