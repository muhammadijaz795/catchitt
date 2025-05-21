import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface RankingSettingsModalProps {
  open: boolean;
  onClose: () => void;
}
export default function RankingSettingsModal({ open, onClose }: RankingSettingsModalProps) {
  const [value, setValue] = useState('show');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: 600,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, borderBottom: '1px solid #ccc', mb: 2 }}
      >
        <Typography fontSize={20} color={'#000'} variant='subtitle1' fontWeight="bold">Ranking settings</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ pt: 0 }}>
        <Typography sx={{ mb: 2 }}>
          Show your username, gifting, and watching info in Top Viewers list
        </Typography>
        <RadioGroup
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <FormControlLabel
            value="show"
            control={<Radio color="error" />}
            label="Show"
          />
          <FormControlLabel
            value="hide"
            control={<Radio />}
            label="Hide"
          />
        </RadioGroup>
      </DialogContent>

      {/* Footer Buttons */}
      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #ccc' }}>
        <Button onClick={onClose} variant="outlined"  color="inherit" sx={{ textTransform: 'capitalize', px: 3, borderColor: '#ccc' }}>
          Cancel
        </Button>
        <Button variant="contained"   sx={{px:4, backgroundColor: '#F9184C', textTransform: 'capitalize' }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
