import React from 'react';
import Image from 'next/image';
import { ListProps } from '../Types';


const List: React.FC<ListProps> = ({ fileArr, setMusicData }) => {
    return (
        <div className="w-full p-4">
            {fileArr.length === 0 ? (
                <p className="text-center text-gray-500">No files uploaded yet.</p>
            ) : (
                <ul className="w-full space-y-1">
                    {fileArr.map((file, index) => (
                        <li
                            key={index}
                            className="flex items-center w-full p-1 transition duration-200 border border-gray-600 rounded-lg cursor-pointer bg-gray-800/10 hover:bg-gray-800"
                            onClick={() => {
                                setMusicData({
                                    imgSrc: file.thumbnailFile ? URL.createObjectURL(file.thumbnailFile) : '/music_img.jpg',
                                    audioSrc: URL.createObjectURL(file.audioFile),
                                    title: file.songTitle,
                                    fileName: file.audioFile.name,
                                });
                            }}
                        >
                            <div className='w-1/3 h-24 md:w-32'>
                                <Image
                                    src={file.thumbnailFile ? URL.createObjectURL(file.thumbnailFile) : '/music_img.jpg'}
                                    alt={`${file.songTitle} thumbnail`}
                                    width={200}
                                    height={200}
                                    className="object-cover w-full h-full rounded"
                                />
                            </div>

                            <div className='w-2/3 p-2'>
                                <h2 className="w-full text-xl font-bold text-gray-300 truncate">{file.songTitle}</h2>
                                <p className="w-full text-gray-400 truncate">Audio: {file.audioFile?.name}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default List;
