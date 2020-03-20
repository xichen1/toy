import numpy as np
from skimage import io, filters, color, feature
import matplotlib.pyplot as plt
import cv2


def detect(img):
	h, w = img.shape
	img = filters.gaussian(img,sigma=2)

	after = np.copy(img)
	kernel0 = np.ones((20,20), np.uint8)
	after1 = cv2.morphologyEx(after, cv2.MORPH_OPEN, kernel0)
	# after1 = cv2.addWeighted(after,1,after1,-1,0)
	threshold = filters.threshold_otsu(after1)
	for i in range(h):
		for j in range(w):
			if (after1[i][j]<threshold):
				after1[i][j] = 0
			else:
				after1[i][j] = 255
	threshold_pic = after1

	edges = feature.canny(after1, sigma=0.5).astype(np.uint8)


	plt.imshow(edges)
	plt.show()
	contours, hierarchy = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE) 
	temp_contours = []
	for contour in contours:
		if cv2.contourArea( contour ) > 50*50 and cv2.contourArea( contour ) < 200*200:
			temp_contours.append(contour)
	car_plate = []
	for temp_contour in temp_contours:
		rect_tupple = cv2.minAreaRect(temp_contour)
		rect_width, rect_height = rect_tupple[1]
		if rect_width < rect_height:
			rect_width, rect_height = rect_height, rect_width
		aspect_ratio = rect_width / rect_height
		if aspect_ratio > 2 and aspect_ratio < 4:
			car_plate.append( temp_contour )
			rect_vertices = cv2.boxPoints( rect_tupple )
			rect_vertices = np.int0( rect_vertices )

	if len(car_plate)>=1:
		plate = car_plate[0]
		max_x = np.max(plate[:,0,0])
		max_y = np.max(plate[:,0,1])
		min_x = np.min(plate[:,0,0])
		min_y = np.min(plate[:,0,1])


	# plt.imshow(img, cmap='gray')
	# plt.show()
		return (min_x,min_y,max_x,max_y)
	else:
		return ()

def main():
	img = io.imread("input_sample/input0.jpg")
	gray = color.rgb2gray(img)
	range = detect(gray)
	if len(range) != 0:
		cv2.rectangle(img, (range[0], range[1]), (range[2], range[3]), (0, 255, 0), 3) 
		plt.imshow(img)
		plt.show()
	else:
		print("Cannot recognize!")
main()