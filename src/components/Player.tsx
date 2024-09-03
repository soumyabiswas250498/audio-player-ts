import React, { useEffect, useState, useRef } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import Image from 'next/image';
import { PlayerProps } from '../Types';


const Player: React.FC<PlayerProps> = ({ musicData }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        const handleLoadedMetadata = () => {
            if (audioRef.current) {
                setDuration(audioRef.current.duration);
                setCurrentTime(0);
            }
        };

        const audioElement = audioRef.current;
        audioElement?.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audioElement?.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [musicData.audioSrc]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isPlaying) {
            intervalId = setInterval(() => {
                if (audioRef.current) {
                    setCurrentTime(audioRef.current.currentTime);
                }
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);


    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                audioRef.current.play();
                setIsPlaying(true);
            }

            audioRef.current.load();

        }
    }, [musicData.audioSrc]);

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const handlePlayButton = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime += 20;
        }
    };

    const handleBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime -= 20;
        }
    };

    return (
        <div className='flex flex-col items-center justify-center w-full pt-2 lg:flex-row'>

            <div className='flex w-full gap-4 px-2 lg:w-1/2'>
                <div className='w-32 h-20 overflow-hidden rounded-md lg:w-48'>
                    <Image
                        src={musicData.imgSrc}
                        alt="cover"
                        width={100}
                        height={100}
                        className='object-contain w-full h-full rounded-md'
                        priority  // Add this line
                    />
                </div>

                <div className='w-[calc(100%-128px)] lg:w-[calc(100%-192px)]'>
                    <p className='w-full text-xl truncate'>Track: {musicData.title}</p>
                    <p className='w-full text-xl truncate'>File: {musicData.fileName}</p>
                </div>
            </div>

            <audio
                id="audioPlayer"
                className="hidden"
                ref={audioRef}
                key={musicData.audioSrc}
            >
                <source src={musicData.audioSrc} type="audio/mpeg" />
            </audio>

            <div className="w-full">
                <div className="flex justify-center w-full">
                    <div className="w-[300px] lg:w-[400px]">
                        <input
                            type="range"
                            value={currentTime}
                            onChange={handleTimeChange}
                            id="progress"
                            min={0}
                            max={duration}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center w-full">
                    <div className="flex justify-between items-center w-[250px]">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#20a9ae] hover:bg-[#288487] transition duration-150 cursor-pointer" onClick={handleBackward}>
                            <FaBackward />
                        </div>
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#20a9ae] hover:bg-[#288487] transition duration-150 cursor-pointer" onClick={handlePlayButton}>
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#20a9ae] hover:bg-[#288487] transition duration-150 cursor-pointer" onClick={handleForward}>
                            <FaForward />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;