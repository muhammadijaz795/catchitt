import CustomButton from '../../../shared/buttons/CustomButton';
import CustomPlayer from '../../homePage/components/CustomPlayer';
import style from '../styles.module.scss';
import CustomPopup from '../../../shared/popups/CustomPopup';
import React from 'react';

function FormLeftSide({ selectedVideoSrc, selectFilesHandler }: any) {
    const [replaceVideoPopup, setReplaceVideoPopup] = React.useState(false);
    return (
        <div className="flex-[0.6] p-[2.5rem] flex flex-col gap-[1rem]">
            <p className="text-start text-[1.25rem] font-semibold leading-[1.5rem] text-custom-dark-222">
                Upload video
            </p>
            <p className="text-start text-[1rem] font-medium leading-[1.25rem] text-custom-color-999">
                Post a video to your account
            </p>
            <div
                className={`mx-auto md:mx-0 w-[17.5rem] h-[36rem] mt-[1.25rem] mb-[1rem] ${style.emulator}`}
            >
                <CustomPlayer src={selectedVideoSrc} />
            </div>
            <CustomButton
                onClick={() => setReplaceVideoPopup(true)}
                textSize="14px"
                islight
                text="Change video"
            />
            <CustomPopup
                open={replaceVideoPopup}
                title="Replace this video?"
                description="Caption and video settings will still be saved."
                btnText="Continue editing"
                primaryBtnText="Replace"
                onBtnClick={() => setReplaceVideoPopup(false)}
                onPrimaryBtnClick={selectFilesHandler}
                onClose={() => setReplaceVideoPopup(false)}
            />
        </div>
    );
}

export default FormLeftSide;
