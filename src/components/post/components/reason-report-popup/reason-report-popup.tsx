import FormControlLabel from '@mui/material/FormControlLabel';

import classNames from 'classnames';
import styles from './reason-report-popup.module.scss';

import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import { useAuthStore } from '../../../../store/authStore';

export interface FormData {
    MISLEADING_INFO: boolean;
    FRAUDS_SCAM: boolean;
    HATE_SPEECH: boolean;
    HARASSMENT_BULLYING: boolean;
    VIOLENCE: boolean;
    ANIMAL_CRUELTY: boolean;
}

export interface ReasonReportPopupProps {
    className?: string;
    onSubmit?: any;
    handleOpen?: any;
    handleClose?: any;
    mediaId: string;
}

export const ReasonReportPopup = ({
    className,
    onSubmit,
    handleOpen,
    mediaId,
}: ReasonReportPopupProps) => {
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState<FormData>({
        MISLEADING_INFO: false,
        FRAUDS_SCAM: false,
        HATE_SPEECH: false,
        HARASSMENT_BULLYING: false,
        VIOLENCE: false,
        ANIMAL_CRUELTY: false,
    });

    const [firstFormVisible, setFirstFormVisible] = useState(true);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const API_KEY = process.env.VITE_API_URL;

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const handleReportSubmit = async (event: React.FormEvent, mediaId: string) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `${API_KEY}/media-content/reports/:${mediaId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ reason: selectedValue }),
                }
            );
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                handleOpen();
            } else {
                const errorResponseData = await response.json();
                console.log(errorResponseData);
            }
        } catch (error) {
            console.error(error);
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

                            <form onSubmit={(event) => handleReportSubmit(event, mediaId)} className={styles.formStyle}>
                                <FormControl>
                                    <RadioGroup
                                        sx={{
                                            display: 'flex', flexDirection: 'column', rowGap: '30px', width: '100%'
                                        }}
                                        value={selectedValue}
                                        onChange={handleRadioChange}
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="MISLEADING_INFO" control={<Radio
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#5448B2'
                                                }
                                            }}
                                        />} label="Misleading Information" />
                                        <FormControlLabel value="FRAUDS_SCAM" control={<Radio
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#5448B2'
                                                }
                                            }}
                                        />} label="Frauds and scams" />
                                        <FormControlLabel value="HATE_SPEECH" control={<Radio
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#5448B2'
                                                }
                                            }}
                                        />} label="Hate Speech" />
                                        <FormControlLabel value="HARASSMENT_BULLYING" control={<Radio
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#5448B2'
                                                }
                                            }}
                                        />} label="Harassment or bullying" />
                                        <FormControlLabel value="VIOLENCE" control={<Radio
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#5448B2'
                                                }
                                            }}
                                        />} label="Violence" />
                                        <FormControlLabel value="ANIMAL_CRUELTY" control={<Radio
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#5448B2'
                                                }
                                            }}
                                        />} label="Animal cruelty" />
                                    </RadioGroup>
                                </FormControl>

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
