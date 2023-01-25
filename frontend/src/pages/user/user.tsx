import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import * as React from 'react';

function User(): React.ReactElement {
    return(
        <div className='user'>
            <Box
                border={1}
                borderRadius={1}
                sx={{ width:200, backgroundColor:"grey.100", mx:3, my:3 }}>
                <Stack  direction="column" spacing={3} alignItems="center" sx={{ px:5, py:5 }}>
                    <Avatar sx={{ bgcolor:'orange', width:100, height:100 }}>이름</Avatar>
                    <Divider/>
                    <Typography sx={{ fontSize:20 }}>유저이름</Typography>
                    <Typography sx={{ fontSize:15 }}>유저 이메일</Typography>
                </Stack>
            </Box>
        </div>
    )
}
export default User;