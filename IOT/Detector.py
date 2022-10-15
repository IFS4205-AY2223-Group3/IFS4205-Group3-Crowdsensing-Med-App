import cv2

import numpy as np
import time
import json
import datetime
import requests
from imutils.video import WebcamVideoStream
import Constants

np.random.seed(Constants.SEED_NUMBER)


class Detector:  # object detection class
    def __init__(self, videopath, configpath, modelpath, classespath):
        self.videopath = videopath
        self.configpath = configpath
        self.modelpath = modelpath
        self.classespath = classespath

        self.net = cv2.dnn_DetectionModel(self.modelpath, self.configpath)
        self.net.setInputSize(320, 320)
        self.net.setInputScale(1.0 / 127.5)
        self.net.setInputMean((127.5, 127.5, 127.5))
        self.net.setInputSwapRB(True)

        self.readClasses()

    def readClasses(self):  # read labels from coco.names file
        with open(self.classespath, "r") as f:
            self.classesList = f.read().splitlines()

        self.classesList.insert(0, "__Background")

        self.colorList = np.random.uniform(
            low=0, high=255, size=(len(self.classesList), 3)
        )

    def onVideo(self):
        cap = WebcamVideoStream(src=0).start()

        isLoop = True

        while isLoop:  # frames successfully captured
            image = cap.read()

            classLabelIDs, confidences, bboxs = self.net.detect(
                image, confThreshold=0.5
            )

            bboxs = list(bboxs)
            confidences = list(np.array(confidences).reshape(1, -1)[0])
            confidences = list(map(float, confidences))

            bboxIDx = cv2.dnn.NMSBoxes(
                bboxs, confidences, score_threshold=0.5, nms_threshold=0.2
            )  # remove overlapping boxes
            count = 0
            if len(bboxIDx) != 0:
                count = 0
                for i in range(0, len(bboxIDx)):

                    bbox = bboxs[np.squeeze(bboxIDx[i])]
                    classConfidence = confidences[np.squeeze(bboxIDx[i])]
                    classLabelID = np.squeeze(classLabelIDs[np.squeeze(bboxIDx[i])])
                    classLabel = self.classesList[classLabelID]
                    classColor = [int(c) for c in self.colorList[classLabelID]]

                    displayText = "{}:{:.2f}".format(classLabel, classConfidence)

                    x, y, w, h = bbox

                    if classLabel == "person":
                        cv2.rectangle(
                            image, (x, y), (x + w, y + h), color=classColor, thickness=1
                        )
                        cv2.putText(
                            image,
                            displayText,
                            (x, y - 10),
                            cv2.FONT_HERSHEY_PLAIN,
                            1,
                            classConfidence,
                            2,
                        )
                        count += 1

            cv2.imshow("Result", image)
            curr_time = datetime.datetime.now()
            formatted_time = curr_time.strftime("%Y-%m-%d %H:%M:%S") + "+8"
            print(count)
            print(formatted_time)
            data = {"time_recorded": formatted_time, "count": count}
            data_json = json.dumps(data)
            post_request = requests.post(
                url=Constants.URL,
                data=data_json,
                headers={
                    "Accept": Constants.HEADER_ACCEPT,
                    "Content-Type": Constants.HEADER_CONTENT_TYPE,
                    "Authorization": Constants.API_TOKEN,
                },
                verify=False,
            )
            total_seconds = Constants.TOTAL_TIME  # timer
            while total_seconds > 0:
                time.sleep(1)
                print("1 second passed")
                total_seconds -= 1
                key = cv2.waitKey(1) & 0xFF
                if key == ord("q"):
                    isLoop = False
                    break
            print("10 second passed")

            key = cv2.waitKey(1) & 0xFF
            if key == ord("q"):
                isLoop = False
                break

        cv2.destroyAllWindows()
