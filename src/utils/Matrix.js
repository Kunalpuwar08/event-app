import { Dimensions } from "react-native";

const SCREEN_HEIGHT = 736;
const SCREEN_WIDTH = 414;

const { height=0, width=0 } = Dimensions?.get("window") || {};

export default function(units = 1) {
  return (width / SCREEN_WIDTH) * units;
}

const scale = (size) => (height / SCREEN_HEIGHT) * size;

export { scale };