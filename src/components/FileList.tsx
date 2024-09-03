import React, { useState } from 'react';
import { IoCloudUploadOutline, IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';
import List from './List';
import Grid from './Grid';
import { FileData, SetMusicDataProps } from '../Types';



const FileList: React.FC<SetMusicDataProps> = ({ setMusicData }) => {
    const [fileArr, setFileArr] = useState<FileData[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [type, setType] = useState<'list' | 'grid'>('list');

    return (
        <div className='w-full p-2'>
            <div className='flex items-center justify-between w-full'>
                <button className='flex items-center justify-center gap-1 cursor-pointer border border-[#20a9ae] rounded-md text-[#8ceaee] hover:bg-[#20a9ae] hover:text-gray-200 transition duration-200 p-1' onClick={() => setShowForm(true)}>
                    Upload <IoCloudUploadOutline className='text-xl' />
                </button>

                <div className='flex gap-4 text-2xl'>
                    <FaList onClick={() => setType('list')} className={`${type === 'list' && 'text-[#20a9ae]'} cursor-pointer`} />
                    <IoGrid onClick={() => setType('grid')} className={`${type === 'grid' && 'text-[#20a9ae]'} cursor-pointer`} />
                </div>
            </div>
            {
                type === 'list' && <List fileArr={fileArr} setMusicData={setMusicData} />
            }
            {
                type === 'grid' && <Grid fileArr={fileArr} setMusicData={setMusicData} />
            }

            {showForm && createPortal(
                <ModalContent onClose={() => setShowForm(false)} setFileArr={setFileArr} />,
                document.body
            )}
        </div>
    );
}

export default FileList;
