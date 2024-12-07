import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWavesurfer } from '@wavesurfer/react'
// import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js'

const AudioWaveForm = ({ audioUrl }:any) => {
    const containerRef = useRef(null)
    
  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: audioUrl,
    // plugins: useMemo(() => [Timeline.create()], []),
    waveColor: '#ddd', // Waveform color
    progressColor: '#4A90E2', // Progress color
    cursorColor: '#4A90E2', // Cursor line color
    height: 80, // Height of the waveform
    barWidth: 2, // Bar width (if you want bars instead of continuous waveform)
  })

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

  useEffect(() => {
    console.log('audioUrl', audioUrl)
    wavesurfer && wavesurfer.load(audioUrl)
  }, [audioUrl, wavesurfer])

  return (
    <>
      <div ref={containerRef} />
      <div style={{ margin: '1em 0', display: 'flex', gap: '1em' }}>
        <button onClick={onPlayPause} style={{ minWidth: '5em' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </>
  )
};

export default AudioWaveForm;
