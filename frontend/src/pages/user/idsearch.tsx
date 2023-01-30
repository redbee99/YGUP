import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';

const IdSearch: React.FC = () => {
    const [email, setemail] = React.useState('');
    const emailAdress = [
        'gmail.com',
        'naver.com',
        'hanmail.net',
        'nate.net',
    ];
    const handleChange = (event: SelectChangeEvent) => {
      setemail(event.target.value as string);
      };
      
    return (
        <div className='idsearch'>
            <br/>
            <Box sx={{ display: 'flex',
                       position:'relative', 
                       width:400, 
                       height:400, 
                       margin:'auto', 
                       textAlign:'center', 
                       border: 1, 
                       borderRadius: 5, 
                       backgroundColor:'#ffffff', 
                       flexDirection: 'column', 
                       mt:5 }}>               
                <Typography sx={{ fontSize: 20, fontWeight:'bold' }} color="#434343" gutterBottom>
                    아이디 찾기
                </Typography>
                <br/>
                <Box>
                    <Stack  direction="column" spacing={2} sx={{ pr:3, pl:3 }}>
                        <TextField id="login-id" label="아이디" variant="outlined" size="small" margin="normal"/>
                        <Stack  direction="row" spacing={3} sx={{ pt: 5, pb :5 }}>
                            <TextField id="login-email" label="이메일아이디" variant="outlined" size="small"/>
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Typography>@</Typography>
                            </Box>
                            <FormControl sx={{ m: 5, maxWidth: 240, width:200 }} size="small">
                                <InputLabel id="emailadress">선택 이메일</InputLabel>
                                <Select
                                    labelId="emailadress"
                                    id="login-email"
                                    value={email}
                                    onChange={handleChange}
                                    label="이메일주소">
                                    {
                                    emailAdress.map(
                                        (row, index) => {
                                        return (<MenuItem value={row}>{row}</MenuItem>);
                                    })
                                    }
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>
                </Box>
                <br/>
                <hr className='login-idsearch-underline'/>
                <Button 
                    variant="contained"  
                    size="small" 
                    sx={{ width: 100, 
                        mx:'auto', 
                        color:'#ffff', 
                        backgroundColor: '#26a69a', 
                        borderColor:'#434343' 
                        }} >
                    찾기
                </Button>
            </Box>
        </div>
    );
}
export default IdSearch;