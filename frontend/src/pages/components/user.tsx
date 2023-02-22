import { Settings } from '@mui/icons-material';
import { Avatar, 
         Box, 
         Divider, 
         ListItem, 
         ListItemButton, 
         ListItemIcon, 
         ListItemText, 
         Stack, 
         Typography,
         CircularProgress } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers'
import { useQuery } from "react-query";
import { BaseUrl } from '../../util/axiosApi';
import axios from 'axios';

function User(): React.ReactElement {
    const navigate = useNavigate();

    const currentUser = useSelector((state: RootState) => state.userReducer.id);

    const [id] = React.useState(currentUser);

    const goUserInfo = () => {
        navigate('/userinfo', { state : data })
    };
    
    const userinfo = async ()=>{
        const url = BaseUrl + "/user/userinfo"
        const { data } = await axios.post(url, {
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: { id: id }
        })
        return data
    }

    const { isLoading, data, error } = useQuery('userinfo', userinfo);

    if(isLoading){
        return <CircularProgress />
    }
    else{
    return(
        <div className='user'>
            <Box
                border={1}
                borderRadius={1}
                sx={{ width:200, backgroundColor:"grey.100", mx:3, my:5 }}>
                <Stack direction={'column'} spacing={2} >
                    <Box sx={{ margin:3 }}>
                        <Stack  direction="column" spacing={3} alignItems="center" >
                            <Avatar sx={{ bgcolor:'orange', width:100, height:100 }}>{ data['result']['user']['id'] }</Avatar>
                            <Divider/>
                            <Typography sx={{ fontSize:20 }}>{ data['result']['user']['name'] }</Typography>
                            <Typography sx={{ fontSize:15 }}>{ data['result']['user']['email'] }</Typography>
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
      );
    }
}

export default User;