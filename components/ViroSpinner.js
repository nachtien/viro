"use strict";
/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ViroSpinner
 */
"user strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViroSpinner = void 0;
const react_1 = __importDefault(require("react"));
const ViroProps_1 = require("./Utilities/ViroProps");
const ViroBase_1 = require("./ViroBase");
const ViroAnimations_1 = require("./Animation/ViroAnimations");
const ViroNode_1 = require("./ViroNode");
const ViroImage_1 = require("./ViroImage");
// Setup spinner assets
const ViroSpinner_1 = require("./Resources/viro_spinner_1.png");
const ViroSpinner_1a = require("./Resources/viro_spinner_1a.png");
const ViroSpinner_1_w = require("./Resources/viro_spinner_1_w.png");
const ViroSpinner_1a_w = require("./Resources/viro_spinner_1a_w.png");
/**
 * Composite control for a 2D Spinner
 */
class ViroSpinner extends ViroBase_1.ViroBase {
    render() {
        ViroProps_1.checkMisnamedProps("ViroSpinner", this.props);
        // Since transformBehaviors can be either a string or an array, convert the string to a 1-element array.
        let transformBehaviors = typeof this.props.transformBehaviors === "string"
            ? new Array(this.props.transformBehaviors)
            : this.props.transformBehaviors;
        return (<ViroNode_1.ViroNode {...this.props}>
        <ViroImage_1.ViroImage source={this._getImage1()} materials={this.props.materials} animation={{
                name: "_ViroSpinner_clockwiseZ",
                delay: 0,
                loop: true,
                run: true,
            }}/>

        {/* Set the position of this one to be .01 forward of the other view to help w/ z-fighting*/}

        <ViroImage_1.ViroImage position={[0, 0, 0.01]} source={this._getImage1a()} materials={this.props.materials} animation={{
                name: "_ViroSpinner_counterClockwiseZ",
                delay: 0,
                loop: true,
                run: true,
            }}/>
      </ViroNode_1.ViroNode>);
    }
    _getImage1() {
        const { type = "Dark" } = this.props;
        return type.toUpperCase() == "Light".toUpperCase()
            ? ViroSpinner_1
            : ViroSpinner_1_w;
    }
    _getImage1a() {
        const { type = "Dark" } = this.props;
        return type.toUpperCase() == "Light".toUpperCase()
            ? ViroSpinner_1a
            : ViroSpinner_1a_w;
    }
}
exports.ViroSpinner = ViroSpinner;
ViroAnimations_1.ViroAnimations.registerAnimations({
    _ViroSpinner_counterClockwiseZ: {
        properties: {
            rotateZ: "+=90",
        },
        duration: 250, //.25 seconds
    },
    _ViroSpinner_clockwiseZ: {
        properties: {
            rotateZ: "-=90",
        },
        duration: 250, //.25 seconds
    },
});
