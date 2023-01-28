import { List, ListItem, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState, useEffect, ReactElement } from 'react';


function PwValidation(): ReactElement {
  const [password, setPassword] = useState({
    firstPassword: '',
    secondPassword: ''
  })
  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [match, setMatch] = useState(false);
  const [requiredLength, setRequiredLength] = useState(5)

  const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    const { value, name } = event.target;
    setPassword({
      ...password,
      [name]: value
    })
  }

  useEffect(() => {
    setValidLength(password.firstPassword.length >= requiredLength ? true : false);
    setUpperCase(password.firstPassword.toLowerCase() !== password.firstPassword);
    setLowerCase(password.firstPassword.toUpperCase() !== password.firstPassword);
    setHasNumber(/\d/.test(password.firstPassword));
    setMatch(!!password.firstPassword && password.firstPassword === password.secondPassword)
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password.firstPassword));

  }, [password, requiredLength]);

  return (
    <div >
      <Stack direction='row' spacing={2}>
        <Stack direction='column' spacing={2}>
          <TextField id="join-pw" 
                     label="비밀번호" 
                     variant="outlined" 
                     size="small"  
                     margin="normal" 
                     sx={{ width: 300 }} 
                     onChange={inputChange} 
                     name="firstPassword"
          />
          <TextField id="join-pw" 
                     label="비밀번호 확인" 
                     variant="outlined" 
                     size="small"  
                     margin="normal" 
                     sx={{ width: 300 }} 
                     onChange={inputChange} 
                     name="secondPassword"
          /> 
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
    </div>
  );
}

export default PwValidation;
