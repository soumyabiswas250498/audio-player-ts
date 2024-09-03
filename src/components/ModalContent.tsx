import { IoMdCloseCircleOutline } from "react-icons/io";
import { useState, ChangeEvent, FormEvent } from "react";
import { ModalContentProps } from "../Types";


const ModalContent: React.FC<ModalContentProps> = ({ onClose, setFileArr }) => {
    const [songTitle, setSongTitle] = useState<string>("");
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (songTitle && audioFile && thumbnailFile) {
            setFileArr((prev) => [
                ...prev,
                { songTitle, audioFile, thumbnailFile },
            ]);
            onClose();
        }
    };

    const handleAudioChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAudioFile(e.target.files[0]);
        }
    };

    const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnailFile(e.target.files[0]);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-screen backdrop-blur-sm bg-white/10">
            <div className="flex items-center justify-center w-full h-full">
                <div className="w-[85%] h-fit bg-gray-700/10 rounded-lg p-4 backdrop-blur-lg">
                    <div className="flex justify-end">
                        <button onClick={onClose}>
                            <IoMdCloseCircleOutline className="text-2xl text-red-400 hover:text-red-600" />
                        </button>
                    </div>
                    <div className="mt-4">
                        <form onSubmit={handleFormSubmit} className="flex flex-col items-center gap-4 mt-6">
                            <div className="w-full">
                                <input
                                    type="text"
                                    value={songTitle}
                                    onChange={(e) => setSongTitle(e.target.value)}
                                    className="w-full p-2 text-gray-800 border border-gray-300 rounded-md"
                                    placeholder="Enter song title"
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="file"
                                    accept=".mp3"
                                    onChange={handleAudioChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleThumbnailChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-2 mt-4 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalContent;
