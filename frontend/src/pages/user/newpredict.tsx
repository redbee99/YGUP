import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import * as React from 'react';

const  NewPredict: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

    return (
        <div className='newpredict'>
            <Stack spacing={2} direction='row'>
                <Box width={'40%'} sx={{mb:1}}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
                        <ListItemButton alignItems="flex-start"
                                        selected={selectedIndex === 0}
                                        onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemAvatar>
                                <Avatar alt="hundai" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="현대"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            신입,경력
                                        </Typography>
                                        {"현대 미래자동차지식산업부 개발자"}
                                    </React.Fragment>
                                }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start"
                                        selected={selectedIndex === 1}
                                        onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="네이버"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            신입
                                        </Typography>
                                        {"네이버 개발기획부 pm 직무"}
                                    </React.Fragment>
                                }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start"
                                        selected={selectedIndex === 2}
                                        onClick={(event) => handleListItemClick(event, 2)}
                        >
                            <ListItemAvatar>
                                <Avatar alt="kakao" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="kakao"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            신입
                                        </Typography>
                                        {'카카오 개발사업부 개발자 신입'}
                                    </React.Fragment>
                                }
                            />
                        </ListItemButton>
                        </List>   
                </Box>
                <Box sx={{ bgcolor: 'white', mx:'auto', alignContent: 'center' }}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{
                            paddingBottom:20
                        }}
                    >
                        <Typography sx={{mt:5}}>회사이름</Typography>
                        <Box sx={{ display: 'flex', 
                                width: '80%', 
                                height: 400,
                                border: '1px solid', 
                                borderColor: 'grey.500', 
                                borderRadius: 2,  
                                mx:'auto', 
                                my:'auto', 
                                mb:1 
                                }} 
                        >
                            <Typography>자소서 내용</Typography>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </div>
    );
}
export default NewPredict;