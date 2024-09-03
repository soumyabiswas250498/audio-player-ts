import React, { useEffect, useState, useRef } from 'react';
import { FaPlay, FaPause } from "react-icons/fa";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import Image from 'next/image';
import { PlayerProps } from '../Types';
import { formatTime } from '../Utils/formatTime';


const Player: React.FC<PlayerProps> = ({ musicData, setCurrentMusicId, fileArrLen }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {

        // Handle audio file change

        setCurrentMusicId(musicData._id)

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

        //Detect Current Time

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

        //Handle Play/Pause Control

        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);


    useEffect(() => {

        //Handle Song Change

        if (audioRef.current && musicData.audioSrc) {
            audioRef.current.pause();
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [musicData.audioSrc]);

    useEffect(() => {

        // Handle song completion

        if (Math.floor(currentTime) === Math.floor(duration) && Math.floor(duration) !== 0) {
            setCurrentMusicId((prev) => fileArrLen - 1 > prev ? prev + 1 : 0)
        }
    }, [currentTime, duration])

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const handlePlayButton = () => {
        if (fileArrLen) {
            if (musicData.audioSrc) {
                setIsPlaying((prev) => !prev);
            } else {
                setCurrentMusicId(0)
            }
        }


    };

    const handleForward = () => {
        setCurrentMusicId((prev) => fileArrLen - 1 > prev ? prev + 1 : 0)
    };

    const handleBackward = () => {
        setCurrentMusicId((prev) => prev > 0 ? prev - 1 : 0)
    };

    return (
        <div className='flex flex-col items-center justify-center w-full pt-2 lg:flex-row'>

            <div className='flex w-full gap-4 px-2 lg:w-5/12 '>
                <div className='w-32 h-20 overflow-hidden rounded-md lg:w-48'>
                    <Image
                        src={musicData.imgSrc}
                        alt="cover"
                        width={100}
                        height={100}
                        className='object-contain w-full h-full rounded-md'
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

            <div className="w-full lg:w-7/12 ">
                <div className="flex justify-center items-center gap-2 w-full">
                    <p className='text-sm lg:text-base'>{0}</p>

                    <div className="w-[240px] lg:w-[400px]">
                        <input
                            type="range"
                            value={currentTime}
                            onChange={handleTimeChange}
                            id="progress"
                            min={0}
                            max={duration}
                        />
                    </div>
                    <p className='text-sm lg:text-base'>{formatTime(Math.floor(currentTime))} / {formatTime(Math.floor(duration))}</p>

                </div>

                <div className="flex items-center justify-center w-full">
                    <div className="flex justify-between items-center w-[250px]">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#20a9ae] hover:bg-[#288487] transition duration-150 cursor-pointer" onClick={() => handleBackward()}>
                            <MdSkipPrevious className='text-2xl' />
                        </div>
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#20a9ae] hover:bg-[#288487] transition duration-150 cursor-pointer" onClick={() => handlePlayButton()} >
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#20a9ae] hover:bg-[#288487] transition duration-150 cursor-pointer" onClick={() => handleForward()}>
                            <MdSkipNext className='text-2xl' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;