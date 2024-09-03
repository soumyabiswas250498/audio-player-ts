import * as Yup from 'yup';

export const uploadValidationSchema = Yup.object({
    songTitle: Yup.string().required('Song title is required'),
    audioFile: Yup.mixed()
        .required('Audio file is required')
        .test('fileType', 'Only .mp3 files allowed', (value) => {
            if (value) {
                //@ts-ignore
                return ['audio/mpeg'].includes(value.type);
            }
            return true;
        }),
    thumbnailFile: Yup.mixed().nullable().test('fileType', 'Only JPEG or PNG file allowed', (value) => {
        if (value) {
            //@ts-ignore
            return ['image/jpeg', 'image/png'].includes(value.type);
        }
        return true;
    }),
});