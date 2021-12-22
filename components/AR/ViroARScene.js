"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViroARScene = void 0;
const ViroBase_1 = require("@components/ViroBase");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
// @ts-ignore
const resolveAssetSource_1 = __importDefault(require("react-native/Libraries/Image/resolveAssetSource"));
const ViroConstants_1 = require("../ViroConstants");
const ViroCameraModule = react_native_1.NativeModules.ViroCameraModule;
class ViroARScene extends ViroBase_1.ViroBase {
    constructor() {
        super(...arguments);
        this.onTrackingFirstInitialized = false;
    }
    _onCameraARHitTest(event) {
        var hitTestEventObj = {
            hitTestResults: event.nativeEvent.hitTestResults,
            cameraOrientation: {
                position: [
                    event.nativeEvent.cameraOrientation[0],
                    event.nativeEvent.cameraOrientation[1],
                    event.nativeEvent.cameraOrientation[2],
                ],
                rotation: [
                    event.nativeEvent.cameraOrientation[3],
                    event.nativeEvent.cameraOrientation[4],
                    event.nativeEvent.cameraOrientation[5],
                ],
                forward: [
                    event.nativeEvent.cameraOrientation[6],
                    event.nativeEvent.cameraOrientation[7],
                    event.nativeEvent.cameraOrientation[8],
                ],
                up: [
                    event.nativeEvent.cameraOrientation[9],
                    event.nativeEvent.cameraOrientation[10],
                    event.nativeEvent.cameraOrientation[11],
                ],
            },
        };
        this.props.onCameraARHitTest &&
            this.props.onCameraARHitTest(hitTestEventObj);
    }
    _onARPointCloudUpdate(event) {
        this.props.onARPointCloudUpdate &&
            this.props.onARPointCloudUpdate(event.nativeEvent.pointCloud);
    }
    _onCameraTransformUpdate(event) {
        var cameraTransform = {
            // ** DEPRECATION WARNING ** The cameraTransform key will be deprecated in a future release,
            cameraTransform: {
                position: [
                    event.nativeEvent.cameraTransform[0],
                    event.nativeEvent.cameraTransform[1],
                    event.nativeEvent.cameraTransform[2],
                ],
                rotation: [
                    event.nativeEvent.cameraTransform[3],
                    event.nativeEvent.cameraTransform[4],
                    event.nativeEvent.cameraTransform[5],
                ],
                forward: [
                    event.nativeEvent.cameraTransform[6],
                    event.nativeEvent.cameraTransform[7],
                    event.nativeEvent.cameraTransform[8],
                ],
                up: [
                    event.nativeEvent.cameraTransform[9],
                    event.nativeEvent.cameraTransform[10],
                    event.nativeEvent.cameraTransform[11],
                ],
            },
            position: [
                event.nativeEvent.cameraTransform[0],
                event.nativeEvent.cameraTransform[1],
                event.nativeEvent.cameraTransform[2],
            ],
            rotation: [
                event.nativeEvent.cameraTransform[3],
                event.nativeEvent.cameraTransform[4],
                event.nativeEvent.cameraTransform[5],
            ],
            forward: [
                event.nativeEvent.cameraTransform[6],
                event.nativeEvent.cameraTransform[7],
                event.nativeEvent.cameraTransform[8],
            ],
            up: [
                event.nativeEvent.cameraTransform[9],
                event.nativeEvent.cameraTransform[10],
                event.nativeEvent.cameraTransform[11],
            ],
        };
        this.props.onCameraTransformUpdate &&
            this.props.onCameraTransformUpdate(cameraTransform);
    }
    _onPlatformUpdate(event) {
        this.props.onPlatformUpdate &&
            this.props.onPlatformUpdate(event.nativeEvent.platformInfoViro);
    }
    // TODO VIRO-3172: Remove in favor of deprecating onTrackingInitialized
    componentDidMount() {
        this.onTrackingFirstInitialized = false;
    }
    _onTrackingUpdated(event) {
        if (this.props.onTrackingUpdated) {
            this.props.onTrackingUpdated(event.nativeEvent.state, event.nativeEvent.reason);
        }
        // TODO VIRO-3172: Remove in favor of deprecating onTrackingInitialized
        if ((event.nativeEvent.state == ViroConstants_1.ViroConstants.TRACKING_LIMITED ||
            event.nativeEvent.state == ViroConstants_1.ViroConstants.TRACKING_NORMAL) &&
            !this.onTrackingFirstInitialized) {
            this.onTrackingFirstInitialized = true;
            if (this.props.onTrackingInitialized) {
                this.props.onTrackingInitialized();
            }
        }
    }
    /**
     * ##### DEPRECATION WARNING - this prop may be removed in future releases #####
     * @deprecated
     */
    _onTrackingInitialized(_event) {
        this.props.onTrackingInitialized && this.props.onTrackingInitialized();
    }
    /**
     * Gives constant estimates of the ambient light as detected by the camera.
     * Returns object w/ "intensity" and "color" keys
     */
    _onAmbientLightUpdate(event) {
        this.props.onAmbientLightUpdate &&
            this.props.onAmbientLightUpdate(event.nativeEvent.ambientLightInfo);
    }
    _onAnchorFound(event) {
        // TODO: this is in a different format than the other onAnchorFound methods
        this.props.onAnchorFound &&
            this.props.onAnchorFound(event.nativeEvent.anchor);
    }
    _onAnchorUpdated(event) {
        // TODO: this is in a different format than the other onAnchorUpdated methods
        this.props.onAnchorUpdated &&
            this.props.onAnchorUpdated(event.nativeEvent.anchor);
    }
    _onAnchorRemoved(event) {
        // TODO: this is in a different format than the other onAnchorRemoved methods
        this.props.onAnchorRemoved &&
            this.props.onAnchorRemoved(event.nativeEvent.anchor);
    }
    async findCollisionsWithRayAsync(from, to, closest, viroTag) {
        return await react_native_1.NativeModules.VRTSceneModule.findCollisionsWithRayAsync(react_native_1.findNodeHandle(this), from, to, closest, viroTag);
    }
    async findCollisionsWithShapeAsync(from, to, shapeString, shapeParam, viroTag) {
        return await react_native_1.NativeModules.VRTSceneModule.findCollisionsWithShapeAsync(react_native_1.findNodeHandle(this), from, to, shapeString, shapeParam, viroTag);
    }
    async performARHitTestWithRay(ray) {
        return await react_native_1.NativeModules.VRTARSceneModule.performARHitTestWithRay(react_native_1.findNodeHandle(this), ray);
    }
    async performARHitTestWithWorldPoints(origin, destination) {
        return await react_native_1.NativeModules.VRTARSceneModule.performARHitTestWithRay(react_native_1.findNodeHandle(this), origin, destination);
    }
    async performARHitTestWithPosition(position) {
        return await react_native_1.NativeModules.VRTARSceneModule.performARHitTestWithPosition(react_native_1.findNodeHandle(this), position);
    }
    async performARHitTestWithPoint(x, y) {
        return await react_native_1.NativeModules.VRTARSceneModule.performARHitTestWithPoint(react_native_1.findNodeHandle(this), x, y);
    }
    /**
     * ##### DEPRECATION WARNING - this prop may be removed in future releases #####
     * @deprecated
     */
    // async getCameraPositionAsync() {
    //   console.warn(
    //     "[Viro] ViroScene.getCameraPositionAsync has been DEPRECATED. Please use getCameraOrientationAsync instead."
    //   );
    //   var orientation = await NativeModules.VRTCameraModule.getCameraOrientation(
    //     findNodeHandle(this)
    //   );
    //   var position = [orientation[0], orientation[1], orientation[2]];
    //   return position;
    // }
    async getCameraOrientationAsync() {
        var orientation = await react_native_1.NativeModules.VRTCameraModule.getCameraOrientation(react_native_1.findNodeHandle(this));
        return {
            position: [orientation[0], orientation[1], orientation[2]],
            rotation: [orientation[3], orientation[4], orientation[5]],
            forward: [orientation[6], orientation[7], orientation[8]],
            up: [orientation[9], orientation[10], orientation[11]],
        };
    }
    async getCameraPositionAsync() {
        // TODO: Two functions with the same name??
        return await ViroCameraModule.getCameraPosition(react_native_1.findNodeHandle(this));
    }
    getChildContext() {
        return {
            cameraDidMount: (camera) => {
                if (camera.props.active) {
                    react_native_1.NativeModules.VRTCameraModule.setSceneCamera(react_native_1.findNodeHandle(this), react_native_1.findNodeHandle(camera));
                }
            },
            cameraWillUnmount: (camera) => {
                if (camera.props.active) {
                    react_native_1.NativeModules.VRTCameraModule.removeSceneCamera(react_native_1.findNodeHandle(this), react_native_1.findNodeHandle(camera));
                }
            },
            cameraDidUpdate: (camera, active) => {
                if (active) {
                    react_native_1.NativeModules.VRTCameraModule.setSceneCamera(react_native_1.findNodeHandle(this), react_native_1.findNodeHandle(camera));
                }
                else {
                    react_native_1.NativeModules.VRTCameraModule.removeSceneCamera(react_native_1.findNodeHandle(this), react_native_1.findNodeHandle(camera));
                }
            },
        };
    }
    render() {
        // Uncomment this line to check for misnamed props
        //checkMisnamedProps("ViroARScene", this.props);
        // Since anchorDetectionTypes can be either a string or an array, convert the string to a 1-element array.
        let anchorDetectionTypes = typeof this.props.anchorDetectionTypes === "string"
            ? new Array(this.props.anchorDetectionTypes)
            : this.props.anchorDetectionTypes;
        let timeToFuse = undefined;
        if (this.props.onFuse != undefined &&
            typeof this.props.onFuse === "object") {
            timeToFuse = this.props.onFuse.timeToFuse;
        }
        let displayPointCloud = false;
        let pointCloudImage = undefined;
        let pointCloudScale = undefined;
        let pointCloudMaxPoints = undefined;
        // parse out displayPointCloud prop
        if (this.props.displayPointCloud) {
            displayPointCloud = true;
            pointCloudImage = resolveAssetSource_1.default(this.props.displayPointCloud.imageSource);
            pointCloudScale = this.props.displayPointCloud.imageScale;
            pointCloudMaxPoints = this.props.displayPointCloud.maxPoints;
        }
        if (this.props.onTrackingInitialized && !this.onTrackingFirstInitialized) {
            console.warn("[Viro] ViroARScene.onTrackingInitialized() has been DEPRECATED. Please use onTrackingUpdated() instead.");
        }
        return (<VRTARScene {...this.props} canHover={this.props.onHover != undefined} canClick={this.props.onClick != undefined ||
                this.props.onClickState != undefined} canTouch={this.props.onTouch != undefined} canScroll={this.props.onScroll != undefined} canSwipe={this.props.onSwipe != undefined} canDrag={this.props.onDrag != undefined} canPinch={this.props.onPinch != undefined} canRotate={this.props.onRotate != undefined} canFuse={this.props.onFuse != undefined} canCameraARHitTest={this.props.onCameraARHitTest != undefined} canARPointCloudUpdate={this.props.onARPointCloudUpdate != undefined} canCameraTransformUpdate={this.props.onCameraTransformUpdate != undefined} onHoverViro={this._onHover} onClickViro={this._onClickState} onTouchViro={this._onTouch} onScrollViro={this._onScroll} onSwipeViro={this._onSwipe} onDragViro={this._onDrag} onPinchViro={this._onPinch} onRotateViro={this._onRotate} onFuseViro={this._onFuse} onCameraARHitTestViro={this._onCameraARHitTest} onARPointCloudUpdateViro={this._onARPointCloudUpdate} onCameraTransformUpdateViro={this._onCameraTransformUpdate} onPlatformUpdateViro={this._onPlatformUpdate} onTrackingUpdatedViro={this._onTrackingUpdated} onAmbientLightUpdateViro={this._onAmbientLightUpdate} onAnchorFoundViro={this._onAnchorFound} onAnchorUpdatedViro={this._onAnchorUpdated} onAnchorRemovedViro={this._onAnchorRemoved} timeToFuse={timeToFuse} anchorDetectionTypes={anchorDetectionTypes} displayPointCloud={displayPointCloud} pointCloudImage={pointCloudImage} pointCloudScale={pointCloudScale} pointCloudMaxPoints={pointCloudMaxPoints}/>);
    }
}
exports.ViroARScene = ViroARScene;
// ViroARScene.childContextTypes = {
//   cameraDidMount: PropTypes.func,
//   cameraWillUnmount: PropTypes.func,
//   cameraDidUpdate: PropTypes.func,
// };
var VRTARScene = react_native_1.requireNativeComponent("VRTARScene", 
// @ts-ignore
ViroARScene, {
    nativeOnly: {
        canHover: true,
        canClick: true,
        canTouch: true,
        canScroll: true,
        canSwipe: true,
        canDrag: true,
        canPinch: true,
        canRotate: true,
        canFuse: true,
        canCameraARHitTest: true,
        canARPointCloudUpdate: true,
        canCameraTransformUpdate: true,
        onHoverViro: true,
        onClickViro: true,
        onTouchViro: true,
        onScrollViro: true,
        onSwipeViro: true,
        onDragViro: true,
        onPinchViro: true,
        onRotateViro: true,
        onFuseViro: true,
        onPlatformUpdateViro: true,
        onTrackingInitializedViro: true,
        onTrackingUpdatedViro: true,
        onAmbientLightUpdateViro: true,
        onAnchorFoundViro: true,
        onAnchorUpdatedViro: true,
        onAnchorRemovedViro: true,
        onCameraARHitTestViro: true,
        onARPointCloudUpdateViro: true,
        onCameraTransformUpdateViro: true,
        timeToFuse: true,
        pointCloudImage: true,
        pointCloudScale: true,
        pointCloudMaxPoints: true,
    },
});
