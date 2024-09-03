import { IoMdCloseCircleOutline } from "react-icons/io";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ModalContentProps } from "../Types";
import { uploadValidationSchema } from "../Schemas/uploadSchema";


const ModalContent: React.FC<ModalContentProps> = ({ onClose, setFileArr }) => {
    const formik = useFormik({
        initialValues: {
            songTitle: '',
            audioFile: null,
            thumbnailFile: null,
        },
        validationSchema: uploadValidationSchema,
        onSubmit: (values) => {
            if (values.audioFile) {
                setFileArr(prev => [
                    ...prev,
                    { songTitle: values.songTitle, audioFile: values.audioFile as unknown as File, thumbnailFile: values.thumbnailFile }
                ]);
                onClose();
            }
        },
    });

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
                        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center gap-1 mt-6">
                            <h1 className="text-2xl">Upload Music</h1>
                            <div className="w-full">
                                <p>Music Title</p>
                                <input
                                    type="text"
                                    name="songTitle"
                                    value={formik.values.songTitle}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full p-2 text-gray-800 border border-gray-300 rounded-md ${(formik.errors.songTitle && formik.touched.songTitle) ? 'border-red-500' : ''}`}
                                    placeholder="Enter song title"
                                />
                                {(formik.errors.songTitle && formik.touched.songTitle) ? <div className="text-red-400 h-4">{formik.errors.songTitle}</div> : <div className="h-4">&nbsp;</div>}
                            </div>
                            <div className="w-full">
                                <p>Select Music File</p>
                                <input
                                    type="file"
                                    name="audioFile"
                                    accept=".mp3"
                                    onChange={(e) => formik.setFieldValue('audioFile', e.currentTarget.files ? e.currentTarget.files[0] : null)}
                                    onBlur={formik.handleBlur}
                                    className={`w-full p-2 border border-gray-300 rounded-md ${(formik.errors.audioFile && formik.touched.audioFile) ? 'border-red-500' : ''}`}
                                />
                                {(formik.errors.audioFile && formik.touched.audioFile) ? <div className="text-red-400 h-4">{formik.errors.audioFile}</div> : <div className="h-4">&nbsp;</div>}
                            </div>
                            <div className="w-full">
                                <p>Select Cover Image</p>
                                <input
                                    type="file"
                                    name="thumbnailFile"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={(e) => formik.setFieldValue('thumbnailFile', e.currentTarget.files ? e.currentTarget.files[0] : null)}
                                    onBlur={formik.handleBlur}
                                    className={`w-full p-2 border border-gray-300 rounded-md ${(formik.errors.thumbnailFile && formik.touched.thumbnailFile) ? 'border-red-500' : ''}`}
                                />
                                {(formik.errors.thumbnailFile && formik.touched.thumbnailFile) ? <div className="text-red-400 h-4">{formik.errors.thumbnailFile}</div> : <div className="h-4">&nbsp;</div>}
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
