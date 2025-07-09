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


interface BlockedKeywordsFAQsProps {
    onClose: () => void;
}

const BlockedKeywordsFAQs = ({ onClose }: BlockedKeywordsFAQsProps) => {
    return (
        <Box sx={{ width: 360, mx: 'auto',  position: 'fixed', right: 0, top: 0, height: '100vh', bgcolor: '#fff', zIndex: 2, }}>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                p: 1,
                borderBottom: '1px solid #EFEFEF',
            }}>
                <IconButton onClick={onClose} sx={{ mr: 1,p: 0,position: 'absolute', left: 0, }}>
                     <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.69141 1.25L1.69141 7.25L7.69141 13.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>  
                </IconButton>
                <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1, }}>
                    Faqs
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 3 }}>
                <img src={Mangnifier} alt="Magnifying Glass" style={{ fontSize: 80, color: '#FF2C55' }} />
            </Box>
            <Typography sx={{ fontSize: 21 }} variant="h5" fontWeight={600} mb={1}>
                How blocked keywords work
            </Typography>

            <Box sx={{ px: 3, textAlign: 'center', mb: 3 }}>
                <Typography sx={{ fontSize: 12 }} variant="body2" color="text.secondary">
                    We'll block LIVE comments with words, phrases, and emoji you add as keywords.
                </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', height: 'calc(100vh - 20rem)'}}>
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
                        <Typography sx={{ fontSize: 14 }} fontWeight={500}>Upper and lower case keywords</Typography>
                    </AccordionSummary>
                    <AccordionDetails  sx={{
                            borderBottom: '1px solid #DFDFDF',
                            backgroundColor: '#F8F8F8',
                        }}>
                        <Typography sx={{ fontSize: 12,textAlign:'left' }} variant="body2" color="text.secondary">
                            You don't need to add upper and lower case keywords.
                            For example, bad blocks BAD and BAD.
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
                        <Typography sx={{ fontSize: 14 }} fontWeight={500}>Spaces inside of keywords</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                    sx={{
                            borderBottom: '1px solid #DFDFDF',
                            backgroundColor: '#F8F8F8',
                        }}>
                        <Typography sx={{ fontSize: 12, textAlign: 'left', }} variant="body2" color="text.secondary">
                            You don't need to add spaces inside of keywords. For example, bad blocks Bad chat and bad chat.
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
                        <Typography sx={{ fontSize: 14 }} fontWeight={500}>Special Characters</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                    sx={{
                            borderBottom: '1px solid #DFDFDF',
                            backgroundColor: '#F8F8F8',
                        }}>
                        <Typography sx={{ fontSize: 12, textAlign: 'left', }} variant="body2" color="text.secondary">
                            You don't need to add keywords with special characters.
                            For example, bad blocks b@d.
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
                        <Typography sx={{ fontSize: 14 }} fontWeight={500}>Block similar versions</Typography>
                    </AccordionSummary>
                    <AccordionDetails 
                    sx={{
                            backgroundColor: '#F8F8F8',
                            borderBottomLeftRadius: 11,
                            borderBottomRightRadius: 11,
                        }}>
                        <Typography sx={{ fontSize: 12, textAlign: 'left', }} variant="body2" color="text.secondary">
                            When this setting is on (default):<br />
                            We'll block similar versions of a keyword. For example, bad blocks badness and badnesss.<br /><br />
                            When this setting is off:<br />
                            We'll only block a keyword if it has spaces on both sides.<br />
                            For example, bad blocks a bad chat, but not abadchat.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
};

export default BlockedKeywordsFAQs;