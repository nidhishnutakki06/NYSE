import React, { useEffect, useRef, useCallback } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawLandmarks, drawConnectors, POSE_CONNECTIONS } from "@mediapipe/drawing_utils";

export default function PostureTracker({ onPostureStatusChange }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const beepRef = useRef(null);

    const onResults = useCallback((results) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the video frame
        ctx.globalCompositeOperation = 'destination-over';
        // Maintain aspect ratio
        const videoRatio = results.image.width / results.image.height;
        const canvasRatio = canvas.width / canvas.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let xOffset = 0;
        let yOffset = 0;

        if (canvasRatio > videoRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / videoRatio;
            yOffset = (canvas.height - drawHeight) / 2;
        } else {
            drawHeight = canvas.height;
            drawWidth = canvas.height * videoRatio;
            xOffset = (canvas.width - drawWidth) / 2;
        }

        ctx.drawImage(results.image, xOffset, yOffset, drawWidth, drawHeight);

        ctx.globalCompositeOperation = 'source-over';

        if (!results.poseLandmarks) {
            ctx.restore();
            if (onPostureStatusChange) onPostureStatusChange(true);
            return;
        }

        // Draw Skeleton
        drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS,
            { color: 'rgba(203, 251, 94, 0.5)', lineWidth: 4 });
        drawLandmarks(ctx, results.poseLandmarks,
            { color: '#CBFB5E', lineWidth: 2, radius: 3 });

        // Landmarks
        const leftWrist = results.poseLandmarks[15];
        const rightWrist = results.poseLandmarks[16];
        const nose = results.poseLandmarks[0];

        // Posture rule: Both hands near head (y coordinate is smaller when higher on screen)
        // Adding a slight buffer for 'near'
        const leftCorrect = leftWrist.y < nose.y + 0.1;
        const rightCorrect = rightWrist.y < nose.y + 0.1;

        const postureCorrect = leftCorrect && rightCorrect;

        // Report status up
        if (onPostureStatusChange) {
            onPostureStatusChange(postureCorrect);
        }

        // Wrong posture → red overlay + beep
        if (!postureCorrect) {
            ctx.fillStyle = "rgba(239, 68, 68, 0.3)"; // Tailwind red-500 with opacity
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (beepRef.current && beepRef.current.paused) {
                beepRef.current.play().catch(e => console.log("Audio play prevented", e));
            }
        }

        ctx.restore();
    }, [onPostureStatusChange]);

    useEffect(() => {
        // Warning sound
        beepRef.current = new Audio(
            "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
        );

        const pose = new Pose({
            locateFile: (file) =>
                `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
            selfieMode: true
        });

        pose.onResults(onResults);

        let camera = null;
        if (videoRef.current) {
            camera = new Camera(videoRef.current, {
                onFrame: async () => {
                    if (videoRef.current) {
                        await pose.send({ image: videoRef.current });
                    }
                },
                width: 640,
                height: 480
            });
            camera.start();
        }

        return () => {
            if (camera) {
                camera.stop();
            }
            pose.close();
        };
    }, [onResults]);

    return (
        <div className="relative w-full h-full overflow-hidden rounded-xl bg-black">
            <video ref={videoRef} className="hidden" playsInline />
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
            />
        </div>
    );
}
