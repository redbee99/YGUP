import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack, List, ListItem } from '@mui/material';
import { BaseUrl } from '../../util/axiosApi';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers'
import { useState, useEffect } from 'react';
import axios from "axios"

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

    const [newpw, setnewpw] = useState({
        pw1: '',
        pw2: ''
    })

    //pwvalidation
    const [validLength, setValidLength] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const [specialChar, setSpecialChar] = useState(false);
    const [match, setMatch] = useState(false);
    const [requiredLength, setRequiredLength] = useState(5)

    useEffect(() => {
        setValidLength(newpw.pw1.length >= requiredLength ? true : false);
        setUpperCase(newpw.pw1.toLowerCase() !== newpw.pw1);
        setLowerCase(newpw.pw1.toUpperCase() !== newpw.pw1);
        setHasNumber(/\d/.test(newpw.pw1));
        setMatch(!!newpw.pw1 && newpw.pw1 === newpw.pw2)
        setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(newpw.pw1));
    }, [newpw, requiredLength]);

    //pwv
    const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
        const { value, name } = event.target;
        setnewpw
        ({
        ...newpw,[name]: value
        })
    }


    const pwupdate = () => {
        const url = BaseUrl + "/user/pwupdate"
        axios.post(url, {
            headers:
            {
                "Content-Type": "application/json"
            },
            body: { id: id, pw: pw, newpw: newpw.pw1, newpw_chk: newpw.pw2}
        })
        .then(function(response) {
            alert('비밀번호 변경 성공')
            goUserinfo()         
        })
        .catch(function(error) {
            alert('비밀번호 변경 실패')
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
                       pt:4
                    }}>
                <Typography sx={{ fontSize: 20, fontWeight:'bold'}} color="#434343" gutterBottom>
                    비밀번호 변경
                </Typography>
                <br/>
                 <Stack  direction="row" spacing={2} sx={{ pr:3, pl:3, py:4}}>
                    <Stack direction='column' spacing={2}>
                        <TextField id="update-pw" type='password' label="현재 비밀번호" onChange={(newValue) => pwChange(newValue.target.value)} variant="outlined" size="small" margin="normal"/>
                        <TextField id="update-newpw" type='password' label="새 비밀번호" onChange={inputChange}  size="small" margin="normal" name="pw1" />
                        <TextField id="update-newpw_chk" type='password' label="새 비밀번호 확인" onChange={inputChange} variant="outlined" size="small" margin="normal" name="pw2"/>
                    </Stack>
                    <Box sx={{ width:150, height:100}}>
                        <List className='validationdesign' dense sx={{ fontSize:'10px' }}>
                            <ListItem>
                                5자리 이상: {validLength ? <Typography color='blue' sx={{ fontSize:'10px' }}>만족</Typography> : <Typography color='red' sx={{ fontSize:'10px' }}>불만족</Typography>}
                            </ListItem>
                            <ListItem>
                                숫자 유무: {hasNumber ? <Typography color='blue'sx={{ fontSize:'10px' }}>만족</Typography> : <Typography color='red' sx={{ fontSize:'10px' }}>불만족</Typography>}
                            </ListItem>
                            <ListItem>
                                대문자: {upperCase ? <Typography color='blue'sx={{ fontSize:'10px' }}>만족</Typography> : <Typography color='red' sx={{ fontSize:'10px' }}>불만족</Typography>}
                            </ListItem>
                            <ListItem>
                                소문자: {lowerCase ? <Typography color='blue'sx={{ fontSize:'10px' }}>만족</Typography> : <Typography color='red' sx={{ fontSize:'10px' }}>불만족</Typography>}
                            </ListItem>
                            <ListItem>비밀번호 일치: {match ? <Typography color='blue'sx={{ fontSize:'10px' }}>일치</Typography> : <Typography color='red' sx={{ fontSize:'10px' }}>불일치</Typography>}
                            </ListItem>
                            <ListItem>
                                특수문자: {specialChar ? <Typography color='blue'sx={{ fontSize:'10px' }}>만족</Typography> : <Typography color='red' sx={{ fontSize:'10px' }}>불만족</Typography>}
                            </ListItem>
                        </List>
                  </Box>
                </Stack>
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
                            onClick={() => pwupdate()}>
                    확인
                </Button>
            </Box>
        </div>
    );
}
export default PwUpdate;