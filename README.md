# React Object Detection App


This is a React application that performs object detection using the YOLOv8 model and runs directly in the browser. It utilizes the `opencv-js` library for computer vision tasks and the `onnxruntime-web` library for running ONNX models.

## Getting Started
Follow the instructions below to run the React Object Detection App locally on your machine.

### Prerequisites
1. Node.js (version 12 or above).
2. Yarn (optional, but recommended)

### Installation
1. Clone the repository or download the source code:
```bash
git clone https://github.com/aliakbarhamzeh1378/yolov8_react.git
```

2. Navigate to the project directory:
```bash
cd yolov8_react.git
```
3. Install the dependencies using either `npm` or `yarn`:
```bash
# Using npm
npm install

# Using Yarn
yarn
```

## Usage
To start the React Object Detection App, use the following command:
```bash
# Using npm
npm start

# Using Yarn
yarn start
```
This command will start the development server and automatically open the app in your default web browser.

You should now see the app running and displaying the live camera feed with object detection overlays. Note that the first time you run the app, it may take some time to download the YOLOv8 model files.

## Customization

You can customize the behavior of the object detection app by modifying the following variables:

1. modelName: The name of the YOLOv8 model file.
2. modelInputShape: The shape of the model input.
3. topk: The number of top detections to keep.
4. iouThreshold: The threshold for intersection-over-union (IoU) during non-maximum suppression.
5. scoreThreshold: The minimum score threshold for object detection.
Feel free to adjust these variables according to your requirements.

**Note** : Make sure to place your YOLOv8 model files in the specified location (public/model).

## Acknowledgments
1. This app is built using React, OpenCV.js, and ONNX Runtime Web.
2. This object detection code are derived from the [YOLOv8 with onnxruntime-web](https://github.com/Hyuto/yolov8-onnxruntime-web) project and we replace webcam frame instead image.
3. Special thanks to the authors of the libraries and frameworks used in this project.

## References
- [React documentation](https://legacy.reactjs.org/docs/getting-started.html)
- [OpenCV.js documentation](https://docs.opencv.org/3.4.15/opencvjs_api.html)
- [ONNX Runtime Web documentation](https://onnxruntime.ai/docs/js/api/latest/)
- [YOLOv8 paper](https://arxiv.org/abs/2004.10934)


## License

[MIT](https://choosealicense.com/licenses/mit/)