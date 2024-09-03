import React from 'react';
import Image from 'next/image';
import { GridProps } from '../Types';


const Grid: React.FC<GridProps> = ({ fileArr, setMusicData }) => {
    return (
        <div className="p-4">
            {fileArr.length === 0 ? (
                <p className="text-center text-gray-500">No files uploaded yet.</p>
            ) : (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
                    {fileArr.map((file, index) => (
                        <div
                            key={index}
                            className="p-2 transition duration-200 border border-gray-600 rounded-lg cursor-pointer bg-gray-800/10 hover:bg-gray-800"
                            onClick={() => {
                                setMusicData({
                                    imgSrc: file.thumbnailFile ? URL.createObjectURL(file.thumbnailFile) : '/music_img.jpg',
                                    audioSrc: URL.createObjectURL(file.audioFile),
                                    title: file.songTitle,
                                    fileName: file.audioFile.name,
                                });
                            }}
                        >
                            <div className="relative w-full h-32 mb-2">
                                <Image
                                    src={file.thumbnailFile ? URL.createObjectURL(file.thumbnailFile) : '/music_img.jpg'}
                                    alt={`${file.songTitle} thumbnail`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <h2 className="text-lg font-bold text-gray-300 truncate">{file.songTitle}</h2>
                            <p className="text-sm text-gray-400 truncate">{file.audioFile.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Grid;
