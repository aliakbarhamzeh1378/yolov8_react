import React, { useState, useRef, useEffect } from "react";
import cv from "@techstark/opencv-js";
import { Tensor, InferenceSession } from "onnxruntime-web";
import Loader from "./components/loader";
import { detectImage } from "./utils/detect";
import { download } from "./utils/download";
import "./style/App.css";

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState({ text: "Loading OpenCV.js", progress: null });

  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  // Configs
  const modelName = "yolov8n.onnx";
  const modelInputShape = [1, 3, 640, 640];
  const topk = 100;
  const iouThreshold = 0.45;
  const scoreThreshold = 0.25;

  useEffect(() => {
      const videoElement = videoRef.current;

      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoElement.srcObject = stream;
        } catch (err) {
          console.error("Error accessing the camera: ", err);
        }
      };

      startCamera();
    
  }, []);

  useEffect(() => {
    let intervalId;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      intervalId = setInterval(() => {
        // Capture video frame
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Start object detection
        detectImage(
          canvas,
          canvas,
          session,
          topk,
          iouThreshold,
          scoreThreshold,
          modelInputShape
        );
      }, 100); // Execute every 1 second
    

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, [session]);

  // wait until opencv.js initialized
  cv["onRuntimeInitialized"] = async () => {
    const baseModelURL = `${process.env.PUBLIC_URL}/model`;

    // create session
    const arrBufNet = await download(
      `${baseModelURL}/${modelName}`, // url
      ["Loading YOLOv8 Segmentation model", setLoading] // logger
    );
    const yolov8 = await InferenceSession.create(arrBufNet);
    const arrBufNMS = await download(
      `${baseModelURL}/nms-yolov8.onnx`, // url
      ["Loading NMS model", setLoading] // logger
    );
    const nms = await InferenceSession.create(arrBufNMS);

    // warmup main model
    setLoading({ text: "Warming up model...", progress: null });
    const tensor = new Tensor(
      "float32",
      new Float32Array(modelInputShape.reduce((a, b) => a * b)),
      modelInputShape
    );
    await yolov8.run({ images: tensor });

    setSession({ net: yolov8, nms: nms });
    setLoading(null);
  };

  return (
    <div className="App">
      {loading && (
        <Loader>
          {loading.progress ? `${loading.text} - ${loading.progress}%` : loading.text}
        </Loader>
      )}
      <div className="header">
        <h1>YOLOv8 Object Detection App</h1>
        <p>
          YOLOv8 object detection application live on browser powered by{" "}
          <code>onnxruntime-web</code>
        </p>
        <p>
          Serving: <code className="code">{modelName}</code>
        </p>
      </div>

      <div className="content">
        (
        <video
          ref={videoRef}
          width={modelInputShape[2]}
          height={modelInputShape[3]}
          autoPlay
          playsInline
        />
        )
        <canvas
          id="canvas"
          width={modelInputShape[2]}
          height={modelInputShape[3]}
          ref={canvasRef}
        />
      </div>

    </div>
  );
};

export default App;
