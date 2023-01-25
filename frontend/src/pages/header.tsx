import React from 'react';
import '../App.css';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import logo from '../img/yogiuplogo.png'
import { Stack, Box } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers/index'
import { set } from '../reducers/userReducer'

const Header: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/')
  };
  const goCompany = () => {
    navigate('/board_list')
  };
  const goMylist = () => {
    navigate('/board_mylist')
  };
  const goPredict = () => {
    navigate('/board_predict')
  };
  const goUserinfo = () => {
    navigate('/userinfo')
  };
  const goJoin = () => {
    navigate('/join')
  };
  const goLogin = () => {
    navigate('/login')
  };
  const dispatch = useDispatch();

  const doLogOut = () => {
    dispatch(set({type: '', id: ''}));
  };

  const currentUser = useSelector((state: RootState) => state.userReducer.type);

  const LoginButton = () => {
    if(currentUser == ''){
      return <Button variant="text" onClick={() => { goLogin() }}>LogIn</Button>
    }
    else {
      return <Button variant="text" onClick={() => { doLogOut() }}>LogOut</Button>
    }
  }

  return (
      <header className="App-header">
        <Stack direction={'row'}>
        <div className='App-header-menu-icon'>
          <Box
              component="img"
              sx={{ height: 50, pl:5 }}
              src={logo}
              onClick={() => { goHome() }}
            />
          </div>
          <nav className='App-header-nav'>
            <ul>
              <li>
              <Button variant="text" size="large" onClick={() => { goCompany() }}>기업</Button>
              </li>
              <li>
              <Button variant="text" size="large" onClick={() => { goMylist() }}>자소서</Button>
              </li>
              <li>
              <Button variant="text" size="large" onClick={() => { goPredict() }}>합격예측</Button>
              </li>
            </ul>
          </nav>
          <div className='App-header-profile-icons'>
            <IconButton size="large" onClick={() => { goUserinfo() }}>
              <PersonAddIcon fontSize="inherit"/>
            </IconButton>
            <LoginButton/>
          </div>
        </Stack>
      </header>
  );
}

export default Header;