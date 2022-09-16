import cv2 

import numpy as np
import time

np.random.seed(20)

class Detector: #object detection class
    def __init__(self, videopath, configpath, modelpath, classespath):
        self.videopath = videopath
        self.configpath = configpath
        self.modelpath = modelpath
        self.classespath = classespath

        self.net = cv2.dnn_DetectionModel(self.modelpath, self.configpath)
        self.net.setInputSize(320,320)
        self.net.setInputScale(1.0/127.5)
        self.net.setInputMean((127.5,127.5,127.5))
        self.net.setInputSwapRB(True)

        self.readClasses()

    def readClasses(self): #read labels from coco.names file
        with open(self.classespath,'r') as f:
            self.classesList = f.read().splitlines()

        self.classesList.insert(0, '__Background')

        self.colorList = np.random.uniform(low = 0, high = 255, size= (len(self.classesList), 3))
        #print(self.classesList)

    def onVideo(self):
        cap = cv2.VideoCapture(self.videopath)

        if (cap.isOpened() == False):
            print("Error opening file...")
            return
        (success, image) = cap.read()

        while success: #frames successfully captured
            classLabelIDs, confidences, bboxs = self.net.detect(image, confThreshold = 0.5)

            bboxs = list(bboxs)
            confidences = list(np.array(confidences).reshape(1,-1)[0])
            confidences = list(map(float,confidences))

            bboxIDx = cv2.dnn.NMSBoxes(bboxs, confidences, score_threshold = 0.5, nms_threshold = 0.2) #remove overlapping boxes

            if len(bboxIDx) != 0:
                for i in range (0, len(bboxIDx)):
                    
                    bbox = bboxs[np.squeeze(bboxIDx[i])]
                    classConfidence = confidences[np.squeeze(bboxIDx[i])]
                    classLabelID = np.squeeze(classLabelIDs[np.squeeze(bboxIDx[i])])
                    classLabel = self.classesList[classLabelID]
                    classColor = [int(c) for c in self.colorList[classLabelID]]

                    displayText = "{}:{:.2f}".format(classLabel, classConfidence)

                    x,y,w,h = bbox

                    if classLabel == 'person' :
                        cv2.rectangle(image, (x,y), (x+w, y+h), color = classColor, thickness = 1)
                        cv2.putText(image, displayText, (x, y-10), cv2.FONT_HERSHEY_PLAIN, 1, classConfidence, 2)\


            cv2.imshow("Result", image)

            key = cv2.waitKey(1) & 0xFF
            if key == ord("q"):
                break

            (success, image) = cap.read()
        cv2.destroyAllWindows()

