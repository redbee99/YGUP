import { Settings } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function User(): React.ReactElement {
    const navigate = useNavigate();
    const { state } = useLocation();
    const goUserInfo = () => {
        navigate('/userinfo')
    };
    
    return(
        <div className='user'>
            <Box
                border={1}
                borderRadius={1}
                sx={{ width:200, backgroundColor:"grey.100", mx:3, my:5 }}>
                <Stack direction={'column'} spacing={2} >
                    <Box sx={{ margin:3 }}>
                        <Stack  direction="column" spacing={3} alignItems="center" >
                            <Avatar sx={{ bgcolor:'orange', width:100, height:100 }}>이름</Avatar>
                            <Divider/>
                            <Typography sx={{ fontSize:20 }}>유저이름</Typography>
                            <Typography sx={{ fontSize:15 }}>유저 이메일</Typography>
                        </Stack>
                    </Box>
                    <Divider/>
                    <Box sx={{ height:50, width:200 }} onClick={() => { goUserInfo(); }} >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Settings/>
                                </ListItemIcon>
                                <ListItemText primary="계정 설정" />
                            </ListItemButton>
                        </ListItem>
                    </Box>
                </Stack>
            </Box>
        </div>
    )
}

export default User;