<template>
    <div>
      <h1>摄像头访问和拍照示例</h1>
      <p>{{ permissionStatus }}</p>
      <video ref="video" autoplay></video>
      <button @click="startCamera">开启摄像头</button>
      <button @click="stopCamera">关闭摄像头</button>
      <button @click="takePhoto">拍摄照片</button>
      <canvas ref="canvas" style="display:none;"></canvas>
      <img :src="photo" alt="Captured photo" v-if="photo">
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  export default {
    name:'MyCameraComponent',
    setup() {
       
      const videoRef = ref(null);
      const canvasRef = ref(null);
      const photo = ref(null);
      const permissionStatus = ref('Checking permissions...');
      let stream = null;
  
      const checkPermission = async () => {
        try {
          const result = await navigator.permissions.query({ name: 'camera' });
          permissionStatus.value = `Camera permission: ${result.state}`;
        } catch (err) {
          permissionStatus.value = 'Error checking camera permission';
          console.error('Error checking camera permission: ', err);
        }
      };
  
      const handleStartCamera = async () => {
        try {
        
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.value.srcObject = stream;
        } catch (err) {
          console.error('Error accessing the camera:', err);
        }
      };
  
      const handleStopCamera = () => {
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
        videoRef.value.srcObject = null;
      };
  
      const takePhoto = () => {
        const video = videoRef.value;
        const canvas = canvasRef.value;
  
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
  
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        photo.value = canvas.toDataURL('image/png');
      };
  
      onMounted(() => {
        checkPermission();
        console.log(navigator)
      });
  
      onBeforeUnmount(() => {
        handleStopCamera();
      });
  
      return {
        videoRef,
        canvasRef,
        photo,
        permissionStatus,
        startCamera: handleStartCamera,
        stopCamera: handleStopCamera,
        takePhoto
      };
    }
  };
  </script>
  
  <style scoped>
  video {
    width: 100%;
    max-width: 600px;
  }
  </style>
  