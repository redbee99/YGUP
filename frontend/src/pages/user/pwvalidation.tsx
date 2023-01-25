import { TextField } from '@mui/material';
import { Stack } from '@mui/system';
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
  const [requiredLength, setRequiredLength] = useState(8)

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
        <br />
        <ul className='ul'>
          <li>
            8자리 이상: {validLength ? <span color='blue'>만족</span> : <span color='red'>불만족</span>}
          </li>
          <li>
            숫자 유무: {hasNumber ? <span color='blue'>만족</span> : <span color='red'>불만족</span>}
          </li>
          <li>
            대문자: {upperCase ? <span color='blue'>만족</span> : <span color='red'>불만족</span>}
          </li>
          <li>
            소문자: {lowerCase ? <span color='blue'>만족</span> : <span color='red'>불만족</span>}
          </li>
          <li>비밀번호 일치: {match ? <span color='blue'>일치</span> : <span color='red'>불일치</span>}
          </li>
          <li>
            특수문자: {specialChar ? <span color='blue'>만족</span> : <span color='red'>불만족</span>}
          </li>
        </ul>
      </Stack>
    </div>
  );
}

export default PwValidation;
