from Detector import *
import os


def main():
    videopath = 0  # change to 0 for webcam

    configpath = "model_data/ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt"
    modelpath = "model_data/frozen_inference_graph.pb"
    classespath = "model_data/coco.names"

    detector = Detector(videopath, configpath, modelpath, classespath)
    detector.onVideo()


if __name__ == "__main__":
    main()
