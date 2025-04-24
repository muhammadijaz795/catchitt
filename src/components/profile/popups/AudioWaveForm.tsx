import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWavesurfer } from '@wavesurfer/react'
// @ts-ignore
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js'

const AudioWaveForm = ({ audioUrl, isPlaying }:any) => {
    const containerRef = useRef(null)
    
  const { wavesurfer, currentTime } = useWavesurfer({
    container: containerRef,
    url: audioUrl,
    plugins: useMemo(() => [Timeline.create()], []),
    waveColor: '#ddd', 
    progressColor: '#4A90E2', 
    cursorColor: '#4A90E2', 
    height: 80, 
    barWidth: 2,
  })
  console.log('isPlaying', isPlaying)
  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

  useEffect(() => {
    if (!wavesurfer) return;

    if (isPlaying) {
      wavesurfer.play();
    } else {
      wavesurfer.pause();
    }
  }, [isPlaying, wavesurfer]);

  useEffect(() => {
    console.log('audioUrl', audioUrl)
    wavesurfer && wavesurfer.load(audioUrl)
  }, [audioUrl, wavesurfer])

  return (
    <>
      <div ref={containerRef} />
      <div  style={{ margin: '1em 0', display: 'flex', gap: '1em' }}>
        <button id="audio-play-btn" onClick={onPlayPause} style={{ minWidth: '5em', display: 'none' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </>
  )
};

export default AudioWaveForm;
