import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CoverLetter_Update: React.FC = () => {

    const navigate = useNavigate();
    
    const goManage = () => {
        navigate('/Manage')
    };

    const [company, setCompany] = React.useState('');
    const companysName = [
        '배달의 민족',
        '카카오',
        '쿠팡',
        '네이버',
        '토스',
        '나무'
    ];

    const handleChange = (event: SelectChangeEvent) => {
        setCompany(event.target.value as string);
      };

    return (
        <div className = 'coverletter_update'>
            <Box sx={{ display: 'flex',
                       position:'relative', 
                       width:800,
                       height: 'auto',
                       minHeight: 1000,
                       textAlign:'center', 
                       border: 1, 
                       borderRadius: 5, 
                       backgroundColor:'#ffffff', 
                       flexDirection: 'column',
                       mx:'auto',
                       mt:10, 
                       mb:20,
                       padding: 5
                    }}
            >
                <Typography sx={{fontSize: 32, pb:3 }}>자기소개서</Typography>
                <Stack  direction="row" spacing={2} alignItems="start" padding={5} marginTop={-3}>
                    <Typography sx={{fontSize: 16, margin:'nomal'}}>글 제목 : </Typography>
                    <TextField id="outlined-multiline-static"
                               label='글 제목'
                               size='small'
                               sx={{ width: 600 }}
                    />
            </Stack>   
            <FormControl sx={{ml:5, maxWidth: 240 }} size="small">
                <InputLabel id="demo-select-small">기업명</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-simple-select-standard"
                        value={company}
                        onChange={handleChange}
                        label="기업명"
                        >
                        {
                        companysName.map(
                            (row, index) => {
                            return (<MenuItem value={row}>{row}</MenuItem>);
                        })
                        }
                    </Select>
            </FormControl>  
            <Stack  direction="row" 
                    spacing={2} 
                    alignItems="start" 
                    padding={5} 
                    marginTop={-3}
            >                
                <Typography sx={{fontSize: 16, pb:3 , width:122}}>1.지원 동기</Typography>
                <TextField id="outlined-multiline-static"
                           label='지원동기를 작성해주세요.'
                           multiline
                           rows={10}
                           margin="normal"
                           sx={{width:700,
                                minheight: 100 }}
                           />
            </Stack>
            <Stack  direction="row" 
                    spacing={2} 
                    alignItems="start" 
                    padding={5} 
                    marginTop={-3}
            >                
                <Typography sx={{fontSize: 16, pb:3}}>2.성격 장-단점</Typography>
                <TextField id="outlined-multiline-static"
                           label='성격장단점을 작성해주세요.'
                           multiline
                           rows={10}
                           margin="normal"
                           sx={{width:700,
                                minheight: 100 }}
                           />
            </Stack>
            <Stack  direction="row" 
                    spacing={2} 
                    alignItems="start" 
                    padding={5} 
                    marginTop={-3}
            >               
                <Typography sx={{fontSize: 16, pb:3}}>3.업무 역량</Typography>
                <TextField id="outlined-multiline-static"
                           label='업무 역량을 작성해주세요.'
                           multiline
                           rows={10}
                           margin="normal"
                           sx={{width:700,
                                minheight: 100 }}
                           />
            </Stack>       
            <Button variant="outlined"  
                    size="small" 
                    sx={{ width: 100, 
                          mt:3, 
                          mx:'auto', 
                          color:'#ffff', 
                          backgroundColor: '#26a68a', 
                          borderColor:'#434343'
                        }} 
                        onClick={() => { goManage() }}
            >
                저 장
            </Button>
        </Box>
    </div>               
    );
}
export default CoverLetter_Update;