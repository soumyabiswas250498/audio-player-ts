import React, { useMemo } from 'react';
import Image from 'next/image';
import { ListProps, ListCardProps } from '../Types';


function ListCard(props: ListCardProps) {
    const { file, setMusicData } = props;

    const imgUrl = useMemo(() => {
        return file.thumbnailFile ? URL.createObjectURL(file.thumbnailFile) : '/music_img.jpg'
    }, [file.thumbnailFile])

    return (
        <li
            className="flex items-center w-full p-1 transition duration-200 border border-gray-600 rounded-lg cursor-pointer bg-gray-800/10 hover:bg-gray-800"
            onClick={() => {
                setMusicData({
                    imgSrc: imgUrl,
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
    )

}



const List: React.FC<ListProps> = ({ fileArr, setMusicData }) => {


    return (
        <div className="w-full p-4">
            {fileArr.length === 0 ? (
                <p className="text-center text-gray-500">No files uploaded yet.</p>
            ) : (
                <ul className="w-full space-y-1">
                    {fileArr.map((file, index) => (
                        <ListCard key={index} setMusicData={setMusicData} file={file} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default List;
