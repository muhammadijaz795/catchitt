import React from 'react';
import {
  Box,
  Avatar,
  Button,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import { MicOff, ScreenShare, Close } from '@mui/icons-material';

interface PersonProps {
  name: string;
  role?: string;
  button?: string;
  avatar: string;
}

const peopleData = {
  host: {
    name: 'Zero_taeyeon',
    role: 'Host',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  cohost: {
    name: 'Cooper Lipshutz',
    button: 'Follow',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  guestRequests: [
    {
      name: 'Roger Aminoff',
      role: 'Friend',
      button: 'Accept',
      avatar: 'https://i.pravatar.cc/150?img=23',
    },
    {
      name: 'Carter Kenter',
      role: 'Friend',
      button: 'Accept',
      avatar: 'https://i.pravatar.cc/150?img=24',
    },
    {
      name: 'Terry Arcand',
      role: 'Friend',
      button: 'Accept',
      avatar: 'https://i.pravatar.cc/150?img=25',
    },
  ],
  viewers: [
    {
      name: 'Tiana Stanton',
      role: 'Friend',
      button: 'Invite',
      avatar: 'https://i.pravatar.cc/150?img=26',
    },
    {
      name: 'Paityn Aminoff',
      role: 'Friend',
      button: 'Invite',
      avatar: 'https://i.pravatar.cc/150?img=27',
    },
    {
      name: 'Nolan Donin',
      role: 'Friend',
      button: 'Invite',
      avatar: 'https://i.pravatar.cc/150?img=28',
    },
  ],
};

interface PersonRowProps {
  name: string;
  role?: string;
  button?: string;
  photo?: string;
  avatar?: string;
  onRemove?: () => void;
  onAcceptJoinLiveSteam?: () => void;
  onRejecctLiveStreamRoom?: () => void;
  sendInviteLiveStreamUser?: () => void;
  onToggleInvite?: () => void;
  isInvited?: boolean;
}

const PersonRow: React.FC<PersonRowProps> = ({ name, role, button, photo, avatar, onRemove, onAcceptJoinLiveSteam, onRejecctLiveStreamRoom, sendInviteLiveStreamUser, onToggleInvite, isInvited }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    p={1}
  >
    <Box display="flex" alignItems="center" textAlign="left" gap={1.5}>
      <Avatar src={photo || avatar} />
      <Box>
        <Typography fontWeight={600}>{name}</Typography>
        {role && (
          <Typography fontSize="13px" color="text.secondary">
            {role}
          </Typography>
        )}
      </Box>
    </Box>
    <Box display="flex" textAlign="left" alignItems="center" gap={1}>
      {/* {button && ( */}
        {/* <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: '#FE2C55',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              backgroundColor: '#d62849',

            },
          }}
          onClick={sendInviteLiveStreamUser}
        >
          Invite
        </Button> */}
         <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: '#FE2C55',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              '&:hover': { backgroundColor: '#d62849' },
            }}
            onClick={onToggleInvite}
          >
            {isInvited ? 'Remove' : 'Invite'}
          </Button>

      {/* )} */}
      <IconButton size="small" onClick={onRemove}>
        <Close fontSize="small" />
      </IconButton>
    </Box>
  </Box>
);

interface GuestRequestRowProps {
  id?: string;
  name: string;
  username?: string;
  button?: string;
  avatar: string;
  onRejecctLiveStreamRoom: () => void;
  onAcceptJoinLiveSteam: () => void;
}

const GuestRequestRow: React.FC<GuestRequestRowProps> = ({ 
  id, 
  name, 
  username, 
  button, 
  avatar, 
  onRejecctLiveStreamRoom, 
  onAcceptJoinLiveSteam 
}) => (

  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    p={1}
  >
    <Box display="flex" alignItems="center" textAlign="left" gap={1.5}>
      <Avatar src={avatar} />
      <Box>
        <Typography fontWeight={600}>{name}</Typography>
      </Box>
    </Box>
    <Box display="flex" textAlign="left" alignItems="center" gap={1}>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: '#FE2C55',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              backgroundColor: '#d62849',

            },
          }}
          onClick={onAcceptJoinLiveSteam}
        >
          Accept
        </Button>
      {/* )} */}
      <IconButton size="small" onClick={onRejecctLiveStreamRoom}>
        <Close fontSize="small" />
      </IconButton>
    </Box>
  </Box>
);

interface GoLiveTogetherPanelProps {
  post: any; // Consider using a proper type here
  onRemoveUser: (streamId: string, userId: string) => void;
  onAcceptJoinLiveSteam: (person: any) => void; // Add this
  onRejecctLiveStreamRoom: (person: any) => void; // Add this
  sendInviteLiveStreamUser: (person: any) => void; // Add this
  onToggleInvite?: () => void;  
  isInvited?: boolean;   
  removeInviteLiveSteamUser: (person:any) => void;       
}

const GoLiveTogetherPanel: React.FC<GoLiveTogetherPanelProps> = ({
  post,
  onRemoveUser,
  onAcceptJoinLiveSteam,
  onRejecctLiveStreamRoom,
  sendInviteLiveStreamUser,
  onToggleInvite,
  isInvited,
  removeInviteLiveSteamUser
}) => {
    const [hiddenGuestIds, setHiddenGuestIds] = React.useState<string[]>([]);
    const hideGuestRow = (id: string) => {
      setHiddenGuestIds((prev: string[]) => [...prev, id]);
      setVisibleGuestUsers((prev: any[]) => prev.filter(user => user._id !== id));
    };
    const [visibleGuestUsers, setVisibleGuestUsers] = React.useState(post?.details?.guestUsers || []);
    const [invitedUserIds, setInvitedUserIds] = React.useState<string[]>([]);

    const handleToggleInvite = (person: any) => {
      const isInvited = invitedUserIds.includes(person.id);

      if (isInvited) {
        // Remove
        setInvitedUserIds(prev => prev.filter(id => id !== person.id));
        removeInviteLiveSteamUser(person);
        // onRemoveUser(post.details.id, person.id);
      } else {
        // Invite
        setInvitedUserIds(prev => [...prev, person.id]);
        sendInviteLiveStreamUser(person);
      }
    };

  console.log('post details');
  console.log(post);
  return (
    <Box
      maxWidth={360}
      mx="auto"
      bgcolor="#fff"
      height="100vh"
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} pr={1} pb={1} borderBottom={'1px solid #eee'}>
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.56641 1.61719L1.56641 7.61719L7.56641 13.6172" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <Typography fontWeight={700}>Go LIVE Together</Typography>
        <Box display="flex" gap={1}>
          <IconButton size="small">
            <svg
                width="31"
                height="22"
                viewBox="0 0 31 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M14.0607 16.5343L11.2636 13.7302C9.72984 12.1926 9.72984 9.69998 11.2636 8.16235L16.9829 2.42861C18.5166 0.890983 21.0029 0.890983 22.5366 2.42861L28.2559 8.16235C29.7896 9.69998 29.7896 12.1926 28.2559 13.7302L22.5366 19.4639C21.0675 20.9368 18.7204 20.9995 17.1786 19.646"
                stroke="#272727"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
                <path
                d="M17.1854 5.35791L19.9825 8.16206C21.5162 9.69969 21.5162 12.1923 19.9825 13.7299L14.2632 19.4636C12.7294 21.0013 10.2432 21.0013 8.70941 19.4636L2.99015 13.7299C1.45641 12.1923 1.45641 9.69969 2.99015 8.16206L8.70941 2.42832C10.1786 0.955437 12.5256 0.892718 14.0674 2.24624"
                stroke="#2F2F2F"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
          </IconButton>
          <IconButton size="small">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9382 6.20882L18.3158 5.12873C17.7893 4.21481 16.6223 3.89953 15.7071 4.42392V4.42392C15.2715 4.68055 14.7517 4.75336 14.2623 4.62629C13.7729 4.49923 13.3542 4.18272 13.0984 3.74658C12.9339 3.46935 12.8455 3.1536 12.8421 2.83124V2.83124C12.857 2.31443 12.662 1.81361 12.3016 1.44287C11.9412 1.07214 11.4461 0.863068 10.9291 0.863281H9.67509C9.16856 0.863276 8.6829 1.06512 8.32559 1.42415C7.96828 1.78318 7.76877 2.2698 7.7712 2.77632V2.77632C7.75619 3.82213 6.90407 4.66202 5.85816 4.66191C5.5358 4.65856 5.22005 4.57015 4.94283 4.40562V4.40562C4.02765 3.88122 2.8607 4.1965 2.33413 5.11042L1.66594 6.20882C1.14 7.1216 1.45099 8.28781 2.36159 8.81751V8.81751C2.95349 9.15925 3.31812 9.7908 3.31812 10.4743C3.31812 11.1577 2.95349 11.7893 2.36159 12.131V12.131C1.45215 12.6571 1.14082 13.8205 1.66594 14.7306V14.7306L2.29752 15.8198C2.54424 16.265 2.95819 16.5935 3.44778 16.7326C3.93737 16.8718 4.46223 16.8101 4.90621 16.5612V16.5612C5.34267 16.3065 5.86278 16.2368 6.35093 16.3674C6.83908 16.498 7.25483 16.8182 7.50576 17.2569C7.67029 17.5341 7.7587 17.8499 7.76205 18.1722V18.1722C7.76205 19.2288 8.61855 20.0852 9.67509 20.0852H10.9291C11.9821 20.0853 12.8371 19.2343 12.8421 18.1814V18.1814C12.8397 17.6732 13.0405 17.1852 13.3998 16.8259C13.7591 16.4666 14.2471 16.2659 14.7552 16.2683C15.0768 16.2769 15.3912 16.365 15.6705 16.5246V16.5246C16.5833 17.0505 17.7495 16.7396 18.2792 15.829V15.829L18.9382 14.7306C19.1933 14.2927 19.2634 13.7712 19.1328 13.2816C19.0022 12.7919 18.6818 12.3746 18.2426 12.1219V12.1219C17.8034 11.8692 17.483 11.4518 17.3524 10.9621C17.2218 10.4725 17.2918 9.95102 17.5469 9.51317C17.7128 9.22354 17.953 8.9834 18.2426 8.81751V8.81751C19.1477 8.2881 19.458 7.1287 18.9382 6.21797V6.21797V6.20882Z" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="10.308" cy="10.474" r="2.63616" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </IconButton>
        </Box>
      </Box>

      {/* Host */}
      <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    p={1}
  >
    <Box display="flex" alignItems="center" textAlign="left" gap={1.5}>
      <Avatar src='https://i.pravatar.cc/150?img=26' />
      <Box>
        <Typography fontWeight={600}>Ahmad</Typography>
        
      </Box>
    </Box>
    <Box display="flex" textAlign="left" alignItems="center" gap={1}>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: '#FE2C55',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              backgroundColor: '#d62849',

            },
          }}
        >
          Follow
        </Button>
      <IconButton size="small">
        <Close fontSize="small" />
      </IconButton>
    </Box>
    <Box>
        <IconButton size="small">
            <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M3.09766 3.10742L21.0977 21.1074"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M15.0977 11.108V10.108L19.6507 7.83203C19.8031 7.75586 19.9724 7.71991 20.1427 7.72758C20.3129 7.73524 20.4783 7.78628 20.6233 7.87583C20.7682 7.96539 20.8879 8.09051 20.9709 8.2393C21.0539 8.3881 21.0976 8.55564 21.0977 8.72603V15.49C21.0977 15.6984 21.0327 15.9015 20.9117 16.0711C20.7907 16.2407 20.6197 16.3683 20.4227 16.436"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M10.0977 6.10742H13.0977C13.6281 6.10742 14.1368 6.31814 14.5119 6.69321C14.8869 7.06828 15.0977 7.57699 15.0977 8.10742V11.1074M15.0977 15.1074V16.1074C15.0977 16.6379 14.8869 17.1466 14.5119 17.5216C14.1368 17.8967 13.6281 18.1074 13.0977 18.1074H5.09766C4.56722 18.1074 4.05852 17.8967 3.68344 17.5216C3.30837 17.1466 3.09766 16.6379 3.09766 16.1074V8.10742C3.09766 7.57699 3.30837 7.06828 3.68344 6.69321C4.05852 6.31814 4.56722 6.10742 5.09766 6.10742H6.09766"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                </svg>

        </IconButton>
        <IconButton size="small">
            <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M4.168 12.1074V9.10742C4.168 8.31177 4.48407 7.54871 5.04668 6.9861C5.60929 6.42349 6.37235 6.10742 7.168 6.10742H20.168"
                stroke="#272727"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
                <path
                d="M20.168 6.10742L17.168 3.10742M20.168 6.10742L17.168 9.10742"
                stroke="#272727"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
                <path
                d="M20.168 12.1074V15.1074C20.168 15.9031 19.8519 16.6661 19.2893 17.2287C18.7267 17.7914 17.9636 18.1074 17.168 18.1074H4.168"
                stroke="#272727"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
                <path
                d="M4.168 18.1074L7.168 21.1074M4.168 18.1074L7.168 15.1074"
                stroke="#272727"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
        </IconButton>
    </Box>
  </Box>

      {/* Co-Host */}
      <PersonRow {...peopleData.cohost} />

      <Box pb={2} mt={2} borderTop={'4px solid #e0e0e0'}>
      </Box>

      {/* Guest Requests */}
      <Typography fontSize="14px" textAlign="left" fontWeight={'600'}    color="text.secondary" mb={1}>
        {visibleGuestUsers.length} guest requests
      </Typography>
      {visibleGuestUsers.map((person: any, i: number) =>
        !hiddenGuestIds.includes(person._id) && (
          <GuestRequestRow
            key={person._id || i}
            {...person}
            onRejecctLiveStreamRoom={() => {
              onRejecctLiveStreamRoom(person);
              hideGuestRow(person._id);
            }}
            onAcceptJoinLiveSteam={() => {
              onAcceptJoinLiveSteam(person);
              hideGuestRow(person._id);
            }}
          />
        )
      )}

    <Box pb={2} mt={2} borderTop={'4px solid #e0e0e0'}>

      </Box>
      {/* Viewers */}
      <Typography fontSize="14px" textAlign="left" fontWeight={'600'} color="text.secondary" mb={1}>
        Viewers
      </Typography>
      {post?.details?.consumers?.map((person:any, i:any) => (
        <PersonRow key={i} {...person} sendInviteLiveStreamUser={()=> sendInviteLiveStreamUser(person)} onToggleInvite={() => handleToggleInvite(person)} isInvited={invitedUserIds.includes(person.id)} onRemove={() => onRemoveUser(post.details.id, person.id)} />
      ))}
    </Box>
  );
};

export default GoLiveTogetherPanel;
