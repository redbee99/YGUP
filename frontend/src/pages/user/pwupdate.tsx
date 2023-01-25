import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { BaseUrl } from '../../util/axiosApi';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { set } from '../../reducers/userReducer'
import { useNavigate } from 'react-router';
const PwUpdate: React.FC = () => {
    const navigate = useNavigate();
    const goUserinfo = () => {
        navigate('/userinfo')
    };

    const dispatch = useDispatch();
    const [id, setIdValue] = React.useState('');
    const idChange = (newValue: string) => {
        setIdValue(newValue);
    };

    const [pw, setPwValue] = React.useState('');
    const pwChange = (newValue: string) => {
        setPwValue(newValue);
    };
    const pwupdate = () => {
        const url = BaseUrl + "/user/pwupdate"
        axios.post(url, {
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: { id: id, pw: pw }
        })
        .then(function(response) {
            dispatch(set('id'))
            goUserinfo()
        })
        .catch(function(error) {
            alert('비밀번호를 확인해주세요')
        })
    };

    return (
        <div className='pwupdate'>
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
                       mt: 5,
                       pt:3
                    }}
            >
                <br/>
                <Typography sx={{ fontSize: 20, fontWeight:'bold' }} color="#434343" gutterBottom>
                    비밀번호 변경
                </Typography>
                <br/>
                <Box>
                    <Stack  direction="column" spacing={2} sx={{ pr:3, pl:3, py:5}}>
                        <TextField id="update-pw" label="비밀번호" variant="outlined" size="small" margin="normal"/>
                        <TextField id="update-pw" label="비밀번호 확인" variant="outlined" size="small" margin="normal"/>
                    </Stack>
                </Box>
                <br/>
                <hr className='login-idsearch-underline'/>
                <Button variant="contained"  
                        size="small" 
                        sx={{ width: 100, 
                              mx:'auto', 
                              color:'#ffff', 
                              backgroundColor: '#26a68a', 
                              borderColor:'#434343'
                            }} 
                            onClick={(event) => pwupdate()}
                >
                    확인
                </Button>
            </Box>
        </div>
    );
}
export default PwUpdate;