import FormLeftSide from './formLeftSide';
import FormRightSide from './formRightSide';

function UploadForm(props: any) {
    const {
        selectedVideoSrc,
        selectFilesHandler,
        thumbnails,
        updateState,
        state,
        SubmitHandler,
        isPosing,
    } = props;
    return (
        <div className="max-w-[71.25rem] bg-custom-light flex-col mt-[7rem] mx-auto mb-[2rem] rounded-[0.5rem] flex md:flex-row ">
            <FormLeftSide
                selectedVideoSrc={selectedVideoSrc}
                selectFilesHandler={selectFilesHandler}
                updateState={updateState}
            />
            <FormRightSide
                updateState={updateState}
                thumbnails={thumbnails}
                state={state}
                SubmitHandler={SubmitHandler}
                isPosing={isPosing}
            />
        </div>
    );
}

export default UploadForm;
