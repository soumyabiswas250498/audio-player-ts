// src/types/index.ts

export interface MusicData {
    imgSrc: string;
    audioSrc: string;
    title: string;
    fileName: string;
}

export interface FileData {
    songTitle: string;
    audioFile: File;
    thumbnailFile: File | null;
}

export interface SetMusicDataProps {
    setMusicData: React.Dispatch<React.SetStateAction<MusicData>>;
}

export interface ListProps {
    fileArr: FileData[];
    setMusicData: React.Dispatch<React.SetStateAction<MusicData>>;
}

export interface GridProps {
    fileArr: FileData[];
    setMusicData: React.Dispatch<React.SetStateAction<MusicData>>;
}

export interface ModalContentProps {
    onClose: () => void;
    setFileArr: React.Dispatch<React.SetStateAction<FileData[]>>;
}

export interface PlayerProps {
    musicData: MusicData;
}
