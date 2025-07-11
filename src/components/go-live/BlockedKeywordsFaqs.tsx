import React from 'react';
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Mangnifier from '../../assets/postLive/Magnifier.svg';
import { useTranslation } from 'react-i18next';

interface BlockedKeywordsFAQsProps {
    onClose: () => void;
}

const BlockedKeywordsFAQs = ({ onClose }: BlockedKeywordsFAQsProps) => {
    const { t, i18n } = useTranslation();
    return (
        <Box sx={{
            maxWidth: 400,
            mx: 'auto',
            bgcolor: 'background.paper',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            pb: 3,
        }}>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                p: 2,
                borderBottom: '1px solid #EFEFEF',
            }}>
                <IconButton onClick={onClose} sx={{ mr: 1,p: 0,position: 'absolute', left: 0, }}>
                    <ArrowBackIosNewIcon sx={{ color: 'text.primary' }} />
                </IconButton>
                <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1, }}>
                    {t('livestream.faqs')}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 3 }}>
                <img src={Mangnifier} alt="Magnifying Glass" style={{ fontSize: 80, color: '#FF2C55' }} />
            </Box>
            <Typography sx={{ fontSize: 21 }} variant="h5" fontWeight={600} mb={1}>
                {t('livestream.how_blocked_keywords_work')}
            </Typography>

            <Box sx={{ px: 3, textAlign: 'center', mb: 3 }}>
                <Typography sx={{ fontSize: 12 }} variant="body2" color="text.secondary">
                    {t('livestream.how_blocked_keywords_live_comments')}
                </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', }}>
                <Accordion disableGutters elevation={0} defaultExpanded={false}
                    sx={{
                        '&:before': { display: 'none' },
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                            borderBottom: '1px solid #DFDFDF',
                            borderTopLeftRadius: 11,
                            borderTopRightRadius: 11,
                            backgroundColor: '#F8F8F8',
                            minHeight: 56,
                            '&.Mui-expanded': {
                                minHeight: 56,
                            },
                            '& .MuiAccordionSummary-content': {
                                my: 2,
                            },
                            '& .MuiAccordionSummary-content.Mui-expanded': {
                                my: 2,
                            },
                        }}
                    >
                        <Typography sx={{ fontSize: 14 }} fontWeight={500}>{t('livestream.upper_and_lower_case_keywords')}</Typography>
                    </AccordionSummary>
                    <AccordionDetails  sx={{
                            borderBottom: '1px solid #DFDFDF',
                            backgroundColor: '#F8F8F8',
                        }}>
                        <Typography sx={{ fontSize: 12,textAlign:'left' }} variant="body2" color="text.secondary">
                            {t('livestream.upper_and_lower_case_keywords_description')}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion disableGutters elevation={0} defaultExpanded={false}
                    sx={{
                        '&:before': { display: 'none' },
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        sx={{
                             borderBottom: '1px solid #DFDFDF',
                            backgroundColor: '#F8F8F8',
                            minHeight: 56,
                            '&.Mui-expanded': {
                                minHeight: 56,
                            },
                            '& .MuiAccordionSummary-content': {
                                my: 2,
                            },
                            '& .MuiAccordionSummary-content.Mui-expanded': {
                                my: 2,
                            },
                        }}
                    >
                        <Typography sx={{ fontSize: 14 }} fontWeight={500}>{t('livestream.spaces_inside_keywords')}</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                    sx={{
                            borderBottom: '1px solid #DFDFDF',
                            backgroundColor: '#F8F8F8',
                        }}>
                        <Typography sx={{ fontSize: 12, textAlign: 'left', }} variant="body2" color="text.secondary">
                            {t('livestream.spaces_inside_keywords_description')}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion disableGutters elevation={0} defaultExpanded={false}
                    sx={{
                        '&:before': { display: 'none' },
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                        sx={{
                              borderBottom: '1px solid #DFDFDF',
                            backgroundColor: '#F8F8F8',
                            minHeight: 56,
                            '&.Mui-expanded': {
                                minHeight: 56,
                            },
                            '& .MuiAccordionSummary-content': {
                                my: 2,
                            },
                            '& .MuiAccordionSummary-content.Mui-expanded': {
                                my: 2,
                            },
                        }}
                    >
                        <Typography sx={{ fontSize: 14 }} fontWeight={500}>{t('livestream.special_characters')}</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                    sx={{
                            borderBottom: '1px solid #DFDFDF',
                            backgroundColor: '#F8F8F8',
                        }}>
                        <Typography sx={{ fontSize: 12, textAlign: 'left', }} variant="body2" color="text.secondary">
                            {t('livestream.special_characters_description')}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion disableGutters elevation={0} defaultExpanded={true}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
                        aria-controls="panel4a-content"
                        id="panel4a-header"
                        sx={{
                            backgroundColor: '#F8F8F8',
                            minHeight: 56,
                              borderBottomLeftRadius: 11,
                            borderBottomRightRadius: 11,
                            '&.Mui-expanded': {
                                minHeight: 56,
                            },
                            '& .MuiAccordionSummary-content': {
                                my: 2,
                            },
                            '& .MuiAccordionSummary-content.Mui-expanded': {
                                my: 2,
                            },
                        }}
                    >
                        <Typography sx={{ fontSize: 14 }} fontWeight={500}>{t('livestream.block_similar_versions')}</Typography>
                    </AccordionSummary>
                    <AccordionDetails 
                    sx={{
                            backgroundColor: '#F8F8F8',
                            borderBottomLeftRadius: 11,
                            borderBottomRightRadius: 11,
                        }}>
                        <Typography sx={{ fontSize: 12, textAlign: 'left', }} variant="body2" color="text.secondary">
                            {t('livestream.default_settings_faqs_1')}<br />
                            {t('livestream.default_settings_faqs_2')}<br /><br />
                            {t('livestream.default_settings_faqs_3')}<br />
                            {t('livestream.default_settings_faqs_4')}<br />
                            {t('livestream.default_settings_faqs_5')}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
};

export default BlockedKeywordsFAQs;