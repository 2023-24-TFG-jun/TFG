
import subprocess
from flask import Blueprint, current_app
from imageai.Detection import VideoObjectDetection
import os
import cv2
    


def process_video(input_path):
    
    detector = VideoObjectDetection()
    detector.setModelTypeAsYOLOv3()
    detector.setModelPath(os.path.join("yolov3.pt"))
    detector.loadModel()

    base_output_filename = os.path.splitext(os.path.basename(input_path))[0] + 'YoloV3'
    temp_output_path = os.path.join(current_app.config['UPLOAD_FOLDER'], base_output_filename + "_temp")  

   
    detector.detectObjectsFromVideo(input_file_path=input_path,
                                    output_file_path=temp_output_path,
                                    frames_per_second=20, log_progress=True,
                                    minimum_percentage_probability=40,
                                    detection_timeout=120)

   
    final_output_path = os.path.join(current_app.config['UPLOAD_FOLDER'], base_output_filename + ".mp4")

   
    command = [
        'ffmpeg',
        '-y',
        '-i', temp_output_path + ".mp4",  
        '-vcodec', 'libx264',    
        '-crf', '23',            
        '-preset', 'fast',      
        final_output_path        
    ]
    subprocess.run(command, check=True)

    
    os.remove(temp_output_path + ".mp4")

    return base_output_filename + ".mp4"
