import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, List, ListItem, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/index'
import { set } from '../../reducers/modalReducer'
import BasicModal from '../components/basicModal';
import { useState, useEffect } from 'react';
import { BaseUrl } from '../../util/axiosApi';
import axios from 'axios';

const Join: React.FC = (props) => {
  const navigate = useNavigate();
  
  const goLogin = () => {   
    navigate('/login')
  };
  const goJoin = () => {    
    navigate('/join')
  };

  //modalcashe
  const currentModal = useSelector((state: RootState) => state.modalReducer.state);
  const currentModalCashe1 = useSelector((state: RootState) => state.modalReducer.cashe1);
  const currentModalCashe2 = useSelector((state: RootState) => state.modalReducer.cashe2);

  //currentModalCashe1 변화 감지시 훅킹
  useEffect(() => {
    setIdValue(currentModalCashe1)
  }, [currentModalCashe1]);

  useEffect(() => {
    if(currentModalCashe2 == ''){
      setEmailValue(initialEmail)
    }
  }, [currentModalCashe2]);
  
  const dispatch = useDispatch();
  
  type email_type = {
    emailid?: string,
    address?: string
  }

  const initialEmail: email_type = {
    emailid: '',
    address: ''
  }

  //user
  const [id, setIdValue] = useState(currentModalCashe1);
  const [name, setNameValue] = useState('');
  const [email, setEmailValue] = React.useState(initialEmail);
  const [modalType, setModalType] = React.useState('');
  const emailAdress = [
      'gmail.com',
      'naver.com',
      'hanmail.net',
      'nate.net',
  ];
  const [pw, setpw] = useState({
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
    setValidLength(pw.pw1.length >= requiredLength ? true : false);
    setUpperCase(pw.pw1.toLowerCase() !== pw.pw1);
    setLowerCase(pw.pw1.toUpperCase() !== pw.pw1);
    setHasNumber(/\d/.test(pw.pw1));
    setMatch(!!pw.pw1 && pw.pw1 === pw.pw2)
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(pw.pw1));
  }, [pw, requiredLength]);

  const idChange = (newValue: string) => {
    setIdValue(newValue);
  }

  const nameChange = (newValue: string) => {
    setNameValue(newValue);
  }

  const emailIdChange = (newValue: string)=> {
    setEmailValue({ emailid:newValue, address:email.address });
  }

  const handleChange = (event: SelectChangeEvent) => {
    setEmailValue({ emailid:email.emailid ,address:event.target.value as string });
  };

  //pwv
  const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    const { value, name } = event.target;
    setpw
    ({
      ...pw,[name]: value
    })
  }

  //idcheckmodal
  const idOverlapCheck = () => {
    if(id != ''){
      setModalType('id')
      const totalEmail = email.emailid + '@' + email.address
      dispatch(set({state:'on', cashe1:id, cashe2:totalEmail}));
    }
    else{
      alert('아이디를 입력해주세요')
    }
  }
  //emailcheckmodal
  const emailOverlapCheck = () => {
    if(email.emailid != '' && email.address != ''){
      setModalType('email')
      const totalEmail = email.emailid + '@' + email.address
      dispatch(set({state:'on', cashe1:id, cashe2:totalEmail}));
    }
    else{
      alert('이메일을 입력해주세요')
    }
  }

  const ModalShow = () => {
    if(currentModal == "on"){
      if(modalType == 'id'){
        return (
          <div className='idoverlapcheck'>
            <BasicModal content='아이디' _cashe={currentModalCashe1} />
          </div>
        )}
      else if(modalType == 'email'){
        return (
          <div className='emailoverlapcheck'>
            <BasicModal content='이메일' _cashe={currentModalCashe2} />
          </div>
        )}
      else{
        return <div/>
      }
    }
    else {
      return <div/>
    }
  }

  const join = () => {
    const url = BaseUrl + "/user/join"
      axios.post(url, {
          headers:  { "Content-Type": "application/json" },
          body: { id: id, name:name, email:currentModalCashe2, pw:pw.pw1
           }
      })
      .then(function(response) {
          alert('가입이 완료되었습니다')
          goLogin()         
      })
      .catch(function(error) {
          alert('회원정보를 확인해주세요')
          goJoin()
      })
    };

    return (
        <div className='join'>
            <Box sx={{ display: 'flex',
                       position:'relative', 
                       width:550, 
                       height: 450, 
                       margin:'auto', 
                       textAlign:'center', 
                       border: 1, 
                       borderRadius: 5, 
                       backgroundColor:'#ffffff', 
                       flexDirection: 'column',
                       mt:5, 
                       padding: 5
                    }}>
                <Typography sx={{fontSize: 32, pb:3 }}>회원 가입</Typography>
                <Stack  direction="row" spacing={3} alignItems="center" >
                    <TextField value={id} id="join-id" label="아이디" variant="outlined" size="small" margin="normal" onChange={(newValue) => idChange(newValue.target.value)}/>
                    <Button 
                      variant="contained"
                      onClick={idOverlapCheck}
                      size="small" 
                      sx={{ color:'#ffff', 
                            backgroundColor: '#26A689', 
                            borderColor:'#434343' }} >
                      중복 확인
                    </Button>
                </Stack>
                <Stack direction='row' spacing={2}>
                  <Stack direction='column' spacing={2}>
                    <TextField id="join-pw1" 
                              label="비밀번호" 
                              variant="outlined"
                              type='password'
                              size="small"  
                              margin="normal" 
                              sx={{ width: 300 }} 
                              onChange={inputChange} 
                              name="pw1"/>
                    <TextField id="join-pw1" 
                              label="비밀번호 확인" 
                              type='password'
                              variant="outlined" 
                              size="small"  
                              margin="normal" 
                              sx={{ width: 300 }} 
                              onChange={inputChange} 
                              name="pw2"/> 
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
                <TextField id="join-name" label="이름" variant="outlined" size="small" margin="normal" sx={{ width: 200 }} onChange={(newValue) => nameChange(newValue.target.value)}/>
                <br/>
                <Stack  direction="row" spacing={3} >
                  <TextField value={email.emailid} id="login-emailid" label="이메일아이디" variant="outlined" size="small" sx={{ maxWidth: 150 }} onChange={(newValue) => emailIdChange(newValue.target.value)}/>
                  <Box sx={{ display: 'flex', alignItems: 'center'}}>
                      <Typography>@</Typography>
                  </Box>
                  <FormControl sx={{ m: 5, maxWidth: 150, width:200 }} size="small">
                  <InputLabel id="emailadress">선택 이메일</InputLabel>
                    <Select
                        labelId="emailadress"
                        id="login-emailadress"
                        value={email.address}
                        onChange={handleChange}
                        label="이메일주소"
                        >
                        { emailAdress.map(
                            (row, index) => {
                            return (<MenuItem key={index} value={row}>{row}</MenuItem>);
                        })}
                    </Select>
                  </FormControl>
                  <Button 
                      variant="contained"
                      onClick={emailOverlapCheck}
                      size="small" 
                      sx={{ color:'#ffff', 
                            backgroundColor: '#26A689', 
                            borderColor:'#434343',
                            maxHeight: 30}}>
                      중복 확인
                    </Button>
                </Stack>
                <br/>
                <Button 
                  variant="contained"  
                  size="small" 
                  sx={{ width: 100, 
                        mt:3, mx:'auto', 
                        color:'#ffff', 
                        backgroundColor: '#26A689',
                        borderColor:'#434343'
                  }} 
                  onClick={() => { join() }}>
                    회원 가입
                </Button>
            </Box>
            <ModalShow/>
        </div>
    );
}

export default Join;