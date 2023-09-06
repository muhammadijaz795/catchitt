import classNames from 'classnames';
import styles from './reason-report-popup.module.scss';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export interface FormData {
    option1: boolean;
    option2: boolean;
    option3: boolean;
    option4: boolean;
    option5: boolean;
    option6: boolean;
}

export interface ReasonReportPopupProps {
    className?: string;
    onSubmit?: any;
    handleOpen?: any;
    handleClose?: any;
    // onSelectedChoicesChange: (choices: FormData) => void; // Add a new prop to handle changes in selected choices
    mediaId: string;
}

export const ReasonReportPopup = ({
    className,
    onSubmit,
    handleOpen,
    // handleClose,
    mediaId,
}: ReasonReportPopupProps) => {
    const token = useAuthStore((state) => state.token);

    const [formData, setFormData] = useState<FormData>({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
        option6: false,
    });

    // const [open, setOpen] = useState(false);
    // const handleClose = () => setOpen(false);

    const [firstFormVisible, setFirstFormVisible] = useState(true);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const API_KEY = process.env.VITE_API_URL;

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value, checked } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: checked }));
        // Update the selectedChoices prop with the latest data
        if (checked) {
            setSelectedValues((prevValues) => [...prevValues, value]);
        } else {
            setSelectedValues((prevValues) => prevValues.filter((val) => val !== value));
        }
    };

    const handleReportSubmit = async (event: React.FormEvent, mediaId: string) => {
        event.preventDefault();
        // const reportReasons = selectedValues.map((value) => ({ reason: value }));
        console.log(mediaId);

        console.log(selectedValues); // You can perform any action with the formData here, like sending it to the server
        // Perform the fetch POST request here with the reportReasons array
        try {
            const response = await fetch(
                `${API_KEY}/media-content/reports/:${mediaId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ reason: selectedValues }),
                }
            );

            if (response.ok) {
                // Close the popup when the response is successful
                // onClose();
                onSubmit(setFirstFormVisible(false));
                // Optionally, you can show a success message or perform other actions
                const responseData = await response.json();
                console.log(responseData);
                handleOpen(); // Assuming this function opens another modal or dialog
            } else {
                // Handle the response from the server if needed
                const errorResponseData = await response.json();
                console.log(errorResponseData);
                // Handle the error, show an error message, or take appropriate action
            }
        } catch (error) {
            // Handle any errors
            console.log(error);
        }
    };
    return (
        <div className={classNames(styles.root, className)}>
            <div>
                {firstFormVisible && (
                    <div className={styles.container}>
                        <div className={styles.titleDiv}>
                            <h2 className={styles.titleText}>Reason for report</h2>
                        </div>
                        <div className={styles.frame}>
                            <form
                                onSubmit={(event) => handleReportSubmit(event, mediaId)}
                                className={styles.formStyle}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#5448B2',
                                                },
                                            }}// Change the color of the checkbox icon
                                            size="medium"
                                            checked={formData.option1}
                                            onChange={handleCheckboxChange}
                                            name="option1"
                                        />
                                    }
                                    label="Misleading information"
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#5448B2',
                                                },
                                            }}// Change the color of the checkbox icon
                                            size="medium"
                                            checked={formData.option2}
                                            onChange={handleCheckboxChange}
                                            name="option2"
                                        />
                                    }
                                    label="Frauds and scams"
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#5448B2',
                                                },
                                            }}// Change the color of the checkbox icon
                                            size="medium"
                                            checked={formData.option3}
                                            onChange={handleCheckboxChange}
                                            name="option3"
                                        />
                                    }
                                    label="Hate speech"
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#5448B2',
                                                },
                                            }}// Change the color of the checkbox icon
                                            size="medium"
                                            checked={formData.option4}
                                            onChange={handleCheckboxChange}
                                            name="option4"
                                        />
                                    }
                                    label="Harassment or Bullying"
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#5448B2',
                                                },
                                            }}// Change the color of the checkbox icon
                                            size="medium"
                                            checked={formData.option5}
                                            onChange={handleCheckboxChange}
                                            name="option5"
                                        />
                                    }
                                    label="Violence"
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#5448B2',
                                                },
                                            }}// Change the color of the checkbox icon
                                            size="medium"
                                            checked={formData.option6}
                                            onChange={handleCheckboxChange}
                                            name="option6"
                                        />
                                    }
                                    label="Animal Cruelty"
                                />
                                <button
                                    type="submit"
                                    className={styles.submitBtn}
                                    onClick={(event) => handleReportSubmit(event, mediaId)}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className={styles.submitDiv} />
                    </div>
                )}
            </div>
        </div>
    );
};
