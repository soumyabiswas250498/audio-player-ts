import React, { useEffect, useState } from 'react'
import Player from '../components/Player';
import FileList from '../components/FileList';

function HomePage() {
    const [musicData, setMusicData] = useState({
        "imgSrc": "/music_img.jpg",
        "audioSrc": "",
        "title": "",
        'fileName': '',
        '_id': -1
    });
    const [currentMusicId, setCurrentMusicId] = useState(-1);
    const [fileArrLen, setFileArrLen] = useState(0);


    return (
        <div className='w-full h-screen'>
            <div className='w-full lg:h-[calc(100%-180px)] h-[calc(100%-260px)]'>
                <FileList setMusicData={setMusicData} musicData={musicData} currentMusicId={currentMusicId} setFileArrLen={setFileArrLen} />
            </div>
            <div className='w-full h-[260px] lg:h-[180px] border-t border-gray-600'>
                <Player musicData={musicData} setCurrentMusicId={setCurrentMusicId} fileArrLen={fileArrLen} />
            </div>


        </div>
    )
}

export default HomePage