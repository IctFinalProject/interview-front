//src\pages\interview\interviewPreparation.jsx
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { 
  Container, Typography, Grid, Button, Paper, Box, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, List, ListItem,
  ListItemIcon, ListItemText, Fade, Stepper, Step, StepLabel,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CancelIcon from '@mui/icons-material/Cancel';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MicIcon from '@mui/icons-material/Mic';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import CastConnectedIcon from '@mui/icons-material/CastConnected';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useStores } from '@/contexts/storeContext';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import styles from '@/styles/interview/interviewPreparation.module.css';
import { getMockQuestions, getRealQuestions } from 'api/interview';
import LoadingOverlay from '@/components/interview/loadingOverlay'; // 로딩 컴포넌트 임포트
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';

const InterviewPreparation = observer(() => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { interviewStore, userStore } = useStores();
  const [interviewType, setInterviewType] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const cameraReady = interviewStore.cameraReady;
  const micReady = interviewStore.micReady;
  const stream = interviewStore.stream;
  const countdown = interviewStore.countdown;
  const currentStep = interviewStore.currentStep;
  const highContrast = interviewStore.highContrast;
  const audioLevel = interviewStore.audioLevel;
  const allReady = interviewStore.allReady;
  const buttonActive = interviewStore.buttonActive;

  const videoRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const speechRef = useRef(null);
  
  const [faceDetected, setFaceDetected] = useState(false);
  const canvasRef = useRef(null);
  const faceDetectionRef = useRef(null);
  const cameraRef = useRef(null);
  const faceDetectionCleanupRef = useRef(null);

  useEffect(() => {
    if (cameraReady && videoRef.current) {
      initializeFaceDetection();
    }
    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, [cameraReady]);
  
  const initializeFaceDetection = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      faceDetectionRef.current = new FaceDetection({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
        }
      });

      await faceDetectionRef.current.setOptions({
        model: 'short',
        minDetectionConfidence: 0.5
      });

      faceDetectionRef.current.onResults(onFaceDetectionResults);

      if (!cameraRef.current) {
        cameraRef.current = new Camera(videoRef.current, {
          onFrame: async () => {
            if (faceDetectionRef.current) {
              await faceDetectionRef.current.send({image: videoRef.current});
            }
          },
          width: 640,
          height: 480
        });
      }

      await cameraRef.current.start();

      faceDetectionCleanupRef.current = () => {
        if (cameraRef.current) {
          cameraRef.current.stop();
        }
        if (faceDetectionRef.current) {
          faceDetectionRef.current.close();
        }
      };
    } catch (error) {
      console.error("Error initializing face detection:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (faceDetectionCleanupRef.current) {
        faceDetectionCleanupRef.current();
      }
    };
  }, []);

  const onFaceDetectionResults = (results) => {
    if (!canvasRef.current) return;
  
    const canvasCtx = canvasRef.current.getContext('2d');
    if (!canvasCtx) return;
  
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
  
    canvasCtx.clearRect(0, 0, width, height);
  
    if (results.detections && results.detections.length > 0) {
      setFaceDetected(true);
      results.detections.forEach((detection) => {
        const boundingBox = detection.boundingBox;
        
        canvasCtx.strokeStyle = 'blue';
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeRect(
          boundingBox.xCenter * width - (boundingBox.width * width) / 2,
          boundingBox.yCenter * height - (boundingBox.height * height) / 2,
          boundingBox.width * width,
          boundingBox.height * height
        );
  
        if (detection.landmarks) {
          detection.landmarks.forEach((landmark) => {
            canvasCtx.beginPath();
            canvasCtx.arc(landmark.x * width, landmark.y * height, 5, 0, 2 * Math.PI);
            canvasCtx.fillStyle = 'red';
            canvasCtx.fill();
          });
        }
      });
    } else {
      setFaceDetected(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const interviewType = interviewStore.type;
      setInterviewType(interviewType);
    }
  }, [router.isReady]);

  useEffect(() => {
    initializeSpeechRecognition();
    speakText(`${userStore.username}님 AI ${interviewStore.type == 'mock'?'모의':'실전'}면접 응시환경 체크를 시작합니다. 카메라와 마이크를 확인해 주세요.`);
    return () => {
      cleanupResources();
    };
  }, []);

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ko-KR';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.error('Web Speech API is not supported in this browser.');
    }
  };

  const speakText = useCallback((text, onEnd) => {
    if ('speechSynthesis' in window) {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'ko-KR';
      speech.onend = onEnd;
      speechRef.current = speech;
      window.speechSynthesis.speak(speech);
    }
  }, []);

  useEffect(() => {
    if (cameraReady && micReady) {
      interviewStore.setAllReady(true);
      interviewStore.setCurrentStep(3);
      interviewStore.setCountdown(5);
    } else {
      interviewStore.setAllReady(false);
      interviewStore.setButtonActive(false);
    }
  }, [cameraReady, micReady, interviewStore]);

  useEffect(() => {
    let timer;
    if (allReady && countdown > 0) {
      timer = setInterval(() => {
        interviewStore.setCountdown(countdown - 1);
      }, 1000);
    } else if (allReady && countdown === 0) {
      interviewStore.setButtonActive(true);
    }
  
    return () => clearInterval(timer);
  }, [allReady, countdown, interviewStore]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      stopStream();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    interviewStore.setStream('');
  }, [stream, interviewStore]);

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const resizeCanvas = () => {
        if (videoRef.current.videoWidth && videoRef.current.videoHeight) {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
        }
      };
      return () => videoRef.current.removeEventListener('loadedmetadata', resizeCanvas);
    }
  }, []);

  const checkCamera = async () => {
    try {
      if (stream) {
        stopStream();
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      interviewStore.setStream(mediaStream);
      interviewStore.setCameraReady(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await new Promise(resolve => videoRef.current.onloadedmetadata = resolve);
        await initializeFaceDetection();
      }
      initializeFaceDetection();
    } catch (error) {
      console.error("카메라 접근 에러:", error);
      interviewStore.setCameraReady(false);
    }
  };

  const checkMic = async () => {
    try {
      if (audioContextRef.current) {
        stopStream();
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(mediaStream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
  
      const updateAudioLevel = () => {
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((acc, value) => acc + value, 0) / bufferLength;
        interviewStore.setAudioLevel(average / 128);
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      };
      updateAudioLevel();
  
      interviewStore.setMicReady(true);
      startListening();
    } catch (error) {
      console.error("마이크 접근 에러:", error);
      interviewStore.setMicReady(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleReset = () => {
    cleanupResources();
    interviewStore.setStream('');
    interviewStore.setCameraReady(false);
    interviewStore.setMicReady(false);
    interviewStore.setCountdown(5);
    interviewStore.setCurrentStep(1);
    interviewStore.setAudioLevel(0);
    interviewStore.setAllReady(false);
    interviewStore.setButtonActive(false);
    setTranscript('');
    setFaceDetected(false);
  };

  const cleanupResources = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      interviewStore.setStream(null);
    }
  
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
  
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  
    interviewStore.setCameraReady(false);
    interviewStore.setMicReady(false);
    interviewStore.setAudioLevel(0);
    setTranscript('');
    setIsListening(false);
  
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (faceDetectionRef.current) {
      try {
        if (typeof faceDetectionRef.current.close === 'function') {
          faceDetectionRef.current.close();
        }
      } catch (error) {
        console.error("Error closing face detection:", error);
      } finally {
        faceDetectionRef.current = null;
      }
    }
    
    if (cameraRef.current) {
      try {
        cameraRef.current.stop();
      } catch (error) {
        console.error("Error stopping camera:", error);
      } finally {
        cameraRef.current = null;
      }
    }
  
  }, [stream, interviewStore]);

  const handleComplete = () => {
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    setModalOpen(false);
    setIsLoading(true);

    const messages = [
      'AI가 사용자의 이력서를 분석하고 있습니다',
      'AI가 이력서를 바탕으로 질문을 생성하고 있습니다',
      '잠시만 기다려주세요',
      '이제 곧 질문을 보실 수 있습니다'
    ];

    for (const message of messages) {
      speakText(message);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    await handleSetMockQuestions();

    setIsLoading(false);
    if (interviewType === 'mock') {
      router.push({
        pathname: '/interview/interviewQuestionsPage'
      });
    } else {
      router.push({
        pathname: '/interview/interviewRecordPage'
      });
    }
  };
  async function handleSetMockQuestions() {
    try {
      if(interviewStore.type === 'mock') {
        const mockQuestions = await getMockQuestions(interviewStore.choosedResume, userStore.id);
        interviewStore.setMockQuestions(mockQuestions);
      } else {
        const realQuestions = await getRealQuestions(interviewStore.choosedResume, userStore.id);
        interviewStore.setRealQuestions(realQuestions);
      }
    } catch (error) {
      console.error('Mock 질문을 불러오는 중 오류가 발생했습니다:', error);
    }
  }

  const handleClose = () => {
    setModalOpen(false);
  };

  const steps = [
    { label: '웹캠/마이크 세팅 점검', icon: <SettingsIcon /> },
    { label: '연결중', icon: <CastConnectedIcon /> },
    { label: '면접 응시', icon: <VideoCallIcon /> },
  ];

  const interviewTips = [
    "면접 전 회사에 대해 충분히 조사하세요.",
    "질문에 대한 답변을 간결하고 명확하게 준비하세요.",
    "적절한 비즈니스 복장을 착용하시고, 긍정적이고 열정적인 태도를 보여주세요."
  ];

  return (
    <Container maxWidth="lg" className={styles.container}>
      {isLoading && <LoadingOverlay />}
      <Fade in={true} timeout={1000}>
        <Paper className={styles.paper}>
          <Typography variant="h4" align="center" className={styles.title}>
            {userStore.username}님 AI {interviewStore.type == 'mock' ? "모의" : "실전"} 면접 응시환경 체크
          </Typography>
          <Stepper activeStep={currentStep - 1} alternativeLabel className={styles.stepper}>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={() => (
                    <div className={`${styles.stepIcon} ${currentStep > index ? styles.activeStepIcon : ''}`}>
                      {step.icon}
                    </div>
                  )}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box className={styles.preparationSection}>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} className={`${styles.section} ${cameraReady ? styles.sectionReady : ''}`}>
                  <Box className={styles.icon}>
                    {cameraReady ? (
                      <Image src="/images/videoCalling.gif" width={300} height={300} alt="Face recognized" />
                    ) : (
                      <CameraAltIcon fontSize="inherit" />
                    )}
                  </Box>
                  <Typography variant="h6">얼굴 인식</Typography>
                  <Button
                    className={styles.button}
                    variant="contained"
                    color={cameraReady ? "success" : "primary"}
                    onClick={checkCamera}
                    disabled={cameraReady}
                  >
                    {cameraReady ? 'OK' : '확인하기'}
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} className={`${styles.section} ${micReady ? styles.sectionReady : ''}`}>
                  <Box className={styles.icon}>
                    {micReady ? (
                      <Image src="/images/mic.gif" width={300} height={300} alt="Voice recognized" />
                    ) : (
                      <MicIcon fontSize="inherit" />
                    )}
                  </Box>
                  <Typography variant="h6">음성 인식</Typography>
                  <Button
                    className={styles.button}
                    variant="contained"
                    color={micReady ? "success" : "primary"}
                    onClick={checkMic}
                    disabled={micReady}
                  >
                    {micReady ? 'OK' : '확인하기'}
                  </Button>
                  {micReady && (
                    <Box className={styles.audioMeter}>
                      <Box
                        className={styles.audioLevel}
                        style={{ width: `${audioLevel * 100}%` }}
                      />
                    </Box>
                  )}
                  <Typography variant="h6" className={styles.transcriptTitle}>
                    <MicIcon color="primary" /> 음성 인식 결과
                  </Typography>
                  <Box className={styles.transcriptBox}>
                    <Typography variant="body1">
                      {transcript || "'안녕하세요' 라고 말해보세요."}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} className={styles.section}>
                  <Typography variant="h6">화면 미리보기</Typography>
                  <Box className={styles.videoContainer}>
                    {cameraReady ? (
                      <>
                        <video ref={videoRef} autoPlay muted className={styles.video}/>
                        <canvas 
                          ref={canvasRef} 
                          className={styles.canvas} 
                          width={videoRef.current?.videoWidth || 640} 
                          height={videoRef.current?.videoHeight || 480} 
                        />
                      </>
                    ) : (
                      <Typography>카메라를 활성화해주세요</Typography>
                    )}
                  </Box>
                  <Button
                    className={styles.button}
                    variant="contained"
                    color={faceDetected ? "success" : "primary"}
                    onClick={checkCamera}
                    disabled={cameraReady}
                  >
                    {faceDetected ? '얼굴 인식 완료' : '얼굴 인식 시작'}
                  </Button>
                  <Box className={styles.countdownContainer}>
                    <Box
                      className={styles.countdownProgress}
                      style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                    />
                  </Box>
                  <Typography variant="body2" className={styles.countdownText}>
                    {allReady 
                      ? countdown > 0 
                        ? `세팅 ${countdown}초 전` 
                        : "면접 준비 완료"
                      : "면접 환경 확인"}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <Paper elevation={3} className={styles.tipSection}>
            <Typography variant="h6" className={styles.tipTitle}>
              <TipsAndUpdatesIcon color="primary" fontSize="large"/> 
              면접 Tip
            </Typography>
            <List>
              {interviewTips.map((tip, index) => (
                <ListItem key={index} className={styles.tipContent}>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={tip} />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Box className={styles.buttonContainer}>
            <Button 
              variant="outlined" 
              onClick={handleReset}
              startIcon={<RestartAltIcon />}
            >
              웹캠/마이크 다시 체크
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleComplete}
              disabled={!buttonActive || countdown > 0}
            >
              {buttonActive && countdown === 0 ? "면접 시작하기" : `${countdown}초 후 시작`}
            </Button>
          </Box>
        </Paper>
      </Fade>
      
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: '16px',
            padding: '24px',
            width: '500px',
            maxWidth: '90vw'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title" className={styles.modalTitle}>
          <Typography variant="h5" component="span">
            면접 시작 준비
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className={styles.modalContent}>
            <Typography variant="body1">
              모든 준비가 완료되었습니다. 면접을 시작하시겠습니까?
            </Typography>
            <Box className={styles.modalTips}>
              <Typography variant="subtitle2" gutterBottom>
                면접 시작 전 체크리스트:
              </Typography>
              <ul>
                <li>카메라와 마이크가 정상 작동하는지 확인하세요.</li>
                <li>주변 소음이 없는 조용한 환경인지 확인하세요.</li>
                <li>긍정적인 마인드로 자신감 있게 임하세요!</li>
              </ul>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={styles.modalActions}>
          <Button onClick={handleClose} color="primary" startIcon={<CancelIcon />} className={styles.cancelButton}>
            취소
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained" autoFocus startIcon={<PlayArrowIcon />} className={styles.confirmButton}>
            면접 시작
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
});

export default InterviewPreparation;