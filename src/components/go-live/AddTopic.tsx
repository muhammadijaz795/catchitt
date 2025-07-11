import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTranslation } from 'react-i18next';

interface Topic {
  title: string;
  image: string;
}

interface AddTopicProps {
  onBack: () => void;
  postCategories: {
    name: string;
    image: string;
    _id: string;
  }[];
  addToRoom: (item: any) => void | Promise<void>;
}

const topics: Topic[] = [
  { title: 'None', image: 'https://via.placeholder.com/48?text=🚫' },
  { title: 'Music', image: 'https://via.placeholder.com/48?text=M' },
  { title: 'Dance', image: 'https://via.placeholder.com/48?text=D' },
  { title: 'Beauty & Fashion', image: 'https://via.placeholder.com/48?text=B' },
  { title: 'Fitness & Sports', image: 'https://via.placeholder.com/48?text=F' },
  { title: 'LIVE Match', image: 'https://via.placeholder.com/48?text=L' },
  { title: 'Outdoors', image: 'https://via.placeholder.com/48?text=O' },
  { title: 'Daily Life', image: 'https://via.placeholder.com/48?text=DL' },
  { title: 'Fitness & Sports', image: 'https://via.placeholder.com/48?text=F2' },
  { title: 'Dance', image: 'https://via.placeholder.com/48?text=D2' },
];

const AddTopic: React.FC<AddTopicProps> = ({ onBack, postCategories,addToRoom }) => {
  const { t, i18n } = useTranslation();
  return (
    <Box sx={{ maxWidth: 360, mx: 'auto', position: 'fixed', top: 6 }}>
      {/* Header */}
      <Box display="flex" pb={1} alignItems="center" justifyContent={'center'} mb={2} borderBottom={'1px solid #E6E6E6'}>
        <IconButton onClick={onBack} sx={{position: 'absolute', left: 1, }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" fontWeight={600} ml={1}>
          {t('livestream.add_topic')}
        </Typography>
      </Box>

      {/* Subtext */}
      <Typography textAlign={'left'} variant="body2" color="text.secondary" mb={2}>
        {t('livestream.topic_content')}
      </Typography>

      {/* List of topics */}
      <List disablePadding sx={{ maxWidth: 360,position: 'sticky', left: -1, top: 0, height: 'calc(100vh - 9rem) !important', bgcolor: '#fff', zIndex: 2, overflow: "auto"}}>
        {postCategories.map((topic: any, index: any) => (
          <React.Fragment key={index}>
            <ListItem button sx={{ py: 1.5 }} onClick={() => addToRoom(topic)}>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={topic.image || 'https://via.placeholder.com/48?text=D2'}
                  sx={{ width: 48, height: 48 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography fontWeight={500}>{topic.name}</Typography>}
              />
            </ListItem>
            {index < postCategories.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default AddTopic;
