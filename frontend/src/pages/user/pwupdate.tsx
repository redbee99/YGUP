import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { BaseUrl } from '../../util/axiosApi';
import axios from "axios"
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers'

const PwUpdate: React.FC = () => {
    const navigate = useNavigate();
    const goUserinfo = () => {
        navigate('/userinfo')
    };

    const currentUser = useSelector((state: RootState) => state.userReducer.id);

    const [id] = React.useState(currentUser);

    React.useEffect(()=>{
        if(id == ''){
            alert('로그인 후  이용해주세요')
            navigate('/')
        }
    })

    const [pw, setPwValue] = React.useState('');
    const pwChange = (newValue: string) => {
        setPwValue(newValue);
    };
    const [newpw, setNewpwValue] = React.useState('');
    const newpwChange = (newValue: string) => {
        setNewpwValue(newValue);
    };
    const [newpw_chk, setNewpw_chkValue] = React.useState('');
    const newpw_chkChange = (newValue: string) => {
        setNewpw_chkValue(newValue);
    };

    const pwupdate = () => {
        const url = BaseUrl + "/user/pwupdate"
        axios.post(url, {
            headers:
            {
                "Content-Type": "application/json"
            },
            body: { id: id, pw: pw, newpw: newpw, newpw_chk: newpw_chk}
        })
        .then(function(response) {
            alert('비밀번호 변경 성공')
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
                    <Stack  direction="column" spacing={2} sx={{ pr:3, pl:3, py:4}}>
                        <TextField id="update-pw" label="현재 비밀번호" onChange={(newValue) => pwChange(newValue.target.value)} variant="outlined" size="small" margin="normal"/>
                        <TextField id="update-newpw" label="새 비밀번호" onChange={(newValue) => newpwChange(newValue.target.value)} variant="outlined" size="small" margin="normal"/>
                        <TextField id="update-newpw_chk" label="새 비밀번호 확인" onChange={(newValue) => newpw_chkChange(newValue.target.value)} variant="outlined" size="small" margin="normal"/>
                    </Stack>
                </Box>
                <hr className='underline'/>
                <Button variant="contained"  
                        size="small" 
                        sx={{ width: 100, 
                              mx:'auto', 
                              color:'#ffff', 
                              backgroundColor: '#26a68a', 
                              borderColor:'#434343',
                              mt:2
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