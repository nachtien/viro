/// <reference types="react" />
import { ColorValue } from "react-native";
import { ViroBase } from "./ViroBase";
declare type Props = {
    text: string;
    color?: ColorValue;
    extrusionDepth?: number;
    outerStroke?: {
        type?: "None" | "Outline" | "DropShadow";
        width?: number;
        color?: ColorValue;
    };
    maxLines?: number;
    textClipMode?: "None" | "ClipToBounds";
    textLineBreakMode?: "WordWrap" | "CharWrap" | "Justify" | "None";
};
/**
 * Used to render a ViroText
 */
export declare class ViroText extends ViroBase<Props> {
    render(): JSX.Element;
}
export {};
