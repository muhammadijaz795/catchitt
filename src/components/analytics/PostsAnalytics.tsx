import {
    Avatar,
    Box,
    Card,
    IconButton,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
  } from "@mui/material";
  import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
  import EditIcon from "@mui/icons-material/Edit";
  import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
  import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
  import PublicIcon from "@mui/icons-material/Public";
  
  const posts = [
    {
      thumbnail: "thumbnail_url_1", // replace with real URL
      title: "Quran pak with Urdu translation... #ahsanadventure #muslimcontent",
      date: "Apr 23, 5:04 PM",
      duration: "00:17",
      privacy: "Everyone",
      views: 0,
      likes: 0,
      comments: 0,
    },
    {
      thumbnail: "thumbnail_url_2",
      title: "Rishtay Bewafa Hotay Hain... Emotional Reminder",
      date: "Apr 22, 11:35 AM",
      duration: "00:57",
      privacy: "Everyone",
      views: 0,
      likes: 0,
      comments: 0,
    },
    {
      thumbnail: "thumbnail_url_3",
      title: "videoplayback",
      date: "Feb 24, 11:40 AM",
      duration: "00:49",
      privacy: "Everyone",
      views: 0,
      likes: 0,
      comments: 0,
    },
  ];
  
  export default function PostsAnalytics() {
    return (
      <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Posts (Created on)</TableCell>
                <TableCell>Privacy</TableCell>
                <TableCell align="center">Views</TableCell>
                <TableCell align="center">Likes</TableCell>
                <TableCell align="center">Comments</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
  
            <TableBody>
              {posts.map((post, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index === 0 ? "#f5f5f5" : "inherit", // highlight first row
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  {/* Post + Thumbnail */}
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box position="relative" mr={2}>
                        <Avatar
                          variant="rounded"
                          src={post.thumbnail}
                          sx={{ width: 56, height: 56 }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            bgcolor: "rgba(0,0,0,0.7)",
                            color: "#fff",
                            fontSize: "10px",
                            px: 0.5,
                            borderRadius: "2px",
                          }}
                        >
                          {post.duration}
                        </Box>
                      </Box>
  
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          noWrap
                          width={200}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {post.date}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
  
                  {/* Privacy Dropdown */}
                  <TableCell>
                    <Select
                      size="small"
                      value={post.privacy}
                      IconComponent={PublicIcon}
                      sx={{
                        backgroundColor: "#f1f3f4",
                        fontSize: "12px",
                        height: "32px",
                        ".MuiSelect-select": {
                          pl: 4,
                        },
                      }}
                    >
                      <MenuItem value="Everyone">Everyone</MenuItem>
                      <MenuItem value="Only Me">Only Me</MenuItem>
                    </Select>
                  </TableCell>
  
                  {/* Views */}
                  <TableCell align="center">{post.views}</TableCell>
  
                  {/* Likes */}
                  <TableCell align="center">{post.likes}</TableCell>
  
                  {/* Comments */}
                  <TableCell align="center">{post.comments}</TableCell>
  
                  {/* Actions */}
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={1}>
                      <Tooltip title="Edit">
                        <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
  
                      <Tooltip title="Change Thumbnail">
                        <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                          <InsertPhotoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
  
                      <Tooltip title="View Comments">
                        <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                          <ChatBubbleOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
  
                      <Tooltip title="More Options">
                        <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                          <MoreHorizIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    );
  }
  