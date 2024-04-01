import Navbar from '../../shared/navbar';
import UploadFile from './components/uploadFile';
import UploadForm from './components/uploadForm';
import useUpload from './hooks';

function UploadPage() {
    const {
        selectedFile,
        inputElementRef,
        selectFilesHandler,
        onChangeFileHandler,
        selectedVideoSrc,
        thumbnails,
        updateState,
        state,
        SubmitHandler,
        isPosing,
    } = useUpload();

    return (
        <div className="flex flex-col">
            <Navbar />
            {!selectedFile ? (
                <UploadFile selectFilesHandler={selectFilesHandler} />
            ) : (
                <UploadForm
                    selectedVideoSrc={selectedVideoSrc}
                    selectFilesHandler={selectFilesHandler}
                    thumbnails={thumbnails}
                    updateState={updateState}
                    state={state}
                    SubmitHandler={SubmitHandler}
                    isPosing={isPosing}
                />
            )}
            <input
                ref={inputElementRef}
                onChange={onChangeFileHandler}
                type="file"
                className="hidden"
            />
        </div>
    );
}

export default UploadPage;
