import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

const FaqScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        bgcolor: "white",
        py: 2,
        px: '0 !important',
        width: 360

      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          mb: 2,
          pb: 1,
          borderBottom: "1px solid #eee",
        }}
      >
        <IconButton
          onClick={onBack}
          sx={{ position: "absolute", left: 0 }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography fontWeight="bold" fontSize="1rem">
          FAQs
        </Typography>
      </Box>

      {/* Icon and Description */}
      <Box  display="flex" flexDirection="column" alignItems="center" mb={3} px={2}>
       <svg width="99" height="94" viewBox="0 0 99 94" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="M97.3847 83.8705L64.8571 54.2127C64.462 53.8527 63.8508 53.8823 63.4924 54.2793L63.0801 54.738L60.8194 52.6765C61.4159 51.843 61.3079 50.6741 60.5347 49.9664L59.3786 48.9135C67.0957 36.0734 64.9651 19.1325 53.4926 8.67199C40.4516 -3.21624 20.2925 -2.2348 8.45916 10.8617C-3.37172 23.9607 -2.39482 44.2159 10.6412 56.1017C22.1138 66.5621 39.1041 67.0553 51.0798 58.0966L52.2359 59.1495C53.0115 59.8573 54.1799 59.8499 54.9482 59.1742L57.2088 61.2357L56.7964 61.6944C56.4381 62.0914 56.4675 62.7054 56.8627 63.0654L89.3903 92.7231C90.3917 93.6355 91.9381 93.5616 92.8463 92.5555L97.5516 87.345C98.4598 86.3389 98.3862 84.7853 97.3847 83.8729V83.8705Z" fill="#E23B5B"/>
            <path d="M60.8205 52.6763L57.2098 61.2355L63.0811 54.7378L60.8205 52.6763Z" fill="#CCCCCC"/>
            <path d="M97.3857 83.8704L64.8582 54.2127C64.463 53.8527 63.8518 53.8822 63.4934 54.2793L63.0811 54.7379L57.2098 61.2356L56.7975 61.6943C56.4391 62.0913 56.4685 62.7053 56.8637 63.0654L89.3913 92.7231C90.3928 93.6355 91.9391 93.5615 92.8473 92.5554L97.5527 87.3449C98.4608 86.3388 98.3872 84.7853 97.3857 83.8729V83.8704Z" fill="#504C49"/>
            <path d="M94.0314 88.4253C93.1232 89.4314 91.5744 89.5054 90.5754 88.593L58.7253 59.5542L56.7936 61.6922C56.4352 62.0892 56.4646 62.7032 56.8598 63.0632L89.3874 92.7209C90.3889 93.6333 91.9352 93.5593 92.8434 92.5532L97.5487 87.3427C98.3268 86.4821 98.3808 85.2196 97.7525 84.3022L94.0289 88.4253H94.0314Z" fill="#432D19"/>
            <path d="M32.0652 60.6684C47.6126 60.6684 60.2163 48.0063 60.2163 32.3867C60.2163 16.7671 47.6126 4.10498 32.0652 4.10498C16.5178 4.10498 3.91406 16.7671 3.91406 32.3867C3.91406 48.0063 16.5178 60.6684 32.0652 60.6684Z" fill="#FF2C55"/>
            <path d="M50.3478 50.7528C60.4443 40.6095 60.4443 24.1639 50.3478 14.0206C40.2514 3.87727 23.8817 3.87727 13.7852 14.0206C3.68873 24.1639 3.68873 40.6095 13.7852 50.7528C23.8817 60.8962 40.2514 60.8962 50.3478 50.7528Z" fill="#FFDAE1"/>
            <path d="M50.5147 42.0559C40.9174 52.6791 24.5678 53.4756 13.9936 43.8338C10.0344 40.2237 7.44733 35.6617 6.26179 30.8113C5.8077 38.3965 8.65006 46.1148 14.6882 51.6188C25.2624 61.2605 41.6121 60.464 51.2093 49.8408C57.2131 43.1952 59.1498 34.2784 57.1714 26.1729C56.8302 31.8716 54.631 37.4964 50.5147 42.0534V42.0559Z" fill="#EB8095"/>
            <path d="M32.2449 29.9588C41.2272 29.8108 48.4293 24.8138 48.331 18.7977C48.2328 12.7817 40.8714 8.02476 31.8891 8.17283C22.9067 8.32089 15.7046 13.3179 15.8029 19.3339C15.9012 25.35 23.2625 30.1069 32.2449 29.9588Z" fill="#FFC3CF"/>
            <path d="M94.9158 83.9591L94.7563 84.1367C94.3979 84.5337 93.7794 84.5658 93.3817 84.2033L64.3764 57.7562C63.9812 57.3962 63.9493 56.7748 64.3101 56.3753L64.4697 56.1977C64.8281 55.8007 65.4466 55.7687 65.8442 56.1311L94.8495 82.5782C95.2447 82.9382 95.2766 83.5597 94.9158 83.9591Z" fill="#777777"/>
        </g>
        </svg>


        <Typography pt={2} fontWeight="bold" fontSize="1.1rem" mb={0.5}>
          How blocked keywords work
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          maxWidth={280}
        >
          We’ll block LIVE comments with words, phrases, and emoji you add as keywords.
        </Typography>
      </Box>

      {/* FAQ Accordion Items */}
      <Box pr={1}>
        {[
          "Upper and lower case keywords",
          "Spaces inside of keywords",
          "Special Characters",
          "Block similar versions",
        ].map((item, index) => (
          <Accordion
            key={index}
            disableGutters
            elevation={0}
            sx={{
              backgroundColor: "#f7f7f7",
              borderRadius: 2,
              mb: 1.2,
              px: 1,
              "&::before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                minHeight: 48,
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                },
              }}
            >
              <Typography fontWeight={500} fontSize="0.95rem">
                {item}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Explanation for “{item}” goes here.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FaqScreen;
