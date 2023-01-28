import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { CardMedia } from '@mui/material'
import Icon from '../../img/logo.svg'
import Card from '@mui/material/Card';
import { experimentalStyled as styled } from '@mui/material/styles';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate, useLocation } from 'react-router-dom'

const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: 'auto',
    maxWidth: 400,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Info: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [name,setName] = React.useState('');
    
    const goUpdate = () => {
      navigate('/info_update')
    };
    const goDelete = () => {
      navigate('/info_delete')
    };

    return (
        <div className='info'>
            <Box sx={{ display: 'flex',position:'relative', width:550, height: 700, margin:'auto', textAlign:'center', border: 1, borderRadius: 5, backgroundColor:'#ffffff', flexDirection: 'column',mt:5, padding: 5 }} >
                <Stack  direction="row" spacing={2} alignItems="center" >
                <Item sx={{margin:'auto'}}>
                    <Card>
                        <CardMedia
                            component="img"
                            sx={{ height: 140}}
                            image={state.get('companyLogo')}
                            alt="Paella dish"
                        />
                    </Card>
                </Item>
                </Stack>
                <br/>
                <Typography>회사명 : { state.get('companyName') }</Typography>
                <br/>
                <Typography>홈페이지 : { state.get('companyUrl') }</Typography>
                <br/>
                <Typography>기업정보 : { state.get('companyInfo') }</Typography>
                <hr className='info_underline'/>
                <br/>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Typography>매출액 :<AutoGraphIcon/>{state.get('companySales')}</Typography>
                <Typography>평균연봉 : <AttachMoneyIcon/>{state.get('companyPay')}</Typography>
                <Typography>퇴사율 : <DirectionsRunIcon/>{state.get('companyResign')}</Typography>
                </Stack>
                <br/>
                <Typography>대표자명 : { state.get('companyCeo') }</Typography>
                <br/>
                <Typography>기업주소 : { state.get('companyAdr') }</Typography>
                <br/>
                <Typography>기업내용 : { state.get('companyContent') }</Typography>
                <hr className='info_underline'/>
                <br/>
                <Item sx={{marginLeft:30, marginRight:30,marginBottom: 10}}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={Icon}
                            alt="Paella dish"
                        />
                    </Card>
                </Item>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <Button variant="contained" sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343'}} onClick={() => { goUpdate() }}>
                        수정
                    </Button>
                    <Button variant="contained" sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343'}} onClick={() => { goDelete() }}>
                        삭제
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}
export default Info;