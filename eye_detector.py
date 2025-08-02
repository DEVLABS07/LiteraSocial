import cv2

capture = cv2.VideoCapture(0)
while True:
    res,frame = capture.read()
    if not res:
        break
    cv2.imshow("Web Camera",frame)
    if cv2.waitKey(1) & 0xFF == ord('c'):
        break
    
    
capture.release()    
cv2.destroyAllWindows()