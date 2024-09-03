// src/types/index.ts

export interface MusicData {
    imgSrc: string;
    audioSrc: string;
    title: string;
    fileName: string;
    _id: number;
}

export interface FileData {
    songTitle: string;
    audioFile: File;
    thumbnailFile: File | null;

}

export interface SetMusicDataProps {
    setMusicData: React.Dispatch<React.SetStateAction<MusicData>>;
    musicData: MusicData;
}

export interface ListProps {
    fileArr: FileData[];
    setMusicData: React.Dispatch<React.SetStateAction<MusicData>>;
    musicData: MusicData;
}

export interface ListCardProps {
    file: FileData;
    _id: number;
    setMusicData: React.Dispatch<React.SetStateAction<MusicData>>;
    isActive: Boolean;
}

export interface GridProps {
    fileArr: FileData[];
    setMusicData: React.Dispatch<React.SetStateAction<MusicData>>;
    musicData: MusicData;
}

export interface ModalContentProps {
    onClose: () => void;
    setFileArr: React.Dispatch<React.SetStateAction<FileData[]>>;
}

export interface PlayerProps {
    musicData: MusicData;
}
