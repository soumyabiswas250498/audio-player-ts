import React, { useState } from 'react'
import Player from '../components/Player';
import FileList from '../components/FileList';

function HomePage() {
    const [musicData, setMusicData] = useState({
        "imgSrc": "/music_img.jpg",
        "audioSrc": "/audio/sample.mp3",
        "title": "Samle Music",
        'fileName': 'sample.mp3'
    });

    return (
        <div className='w-full h-screen'>
            <div className='w-full lg:h-[calc(100%-180px)] h-[calc(100%-260px)]'>
                <FileList setMusicData={setMusicData} />
            </div>
            <div className='w-full h-[260px] lg:h-[180px] border-t border-gray-600'>
                <Player musicData={musicData} />
            </div>


        </div>
    )
}

export default HomePage