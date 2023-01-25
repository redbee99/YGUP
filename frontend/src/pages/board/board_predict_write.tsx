import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {  Select, SelectChangeEvent, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';

const Board_predict_write : React.FC = () => {

    const navigate = useNavigate();
    
    const goNewprdict = () => {
        navigate('/newpredict')
    };

    const [company, setCompany] = React.useState('');
    const companysName = [
        '전체 기업',
    ];
    const handleChange = (event: SelectChangeEvent) => {
        setCompany(event.target.value as string);
      };

    return (
        <div className = 'coverletter_write'>
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
                <Stack  direction="column" spacing={2} alignItems="start" padding={5} marginTop={-3}>
                    <Typography sx={{fontSize: 16, pb:3}}>1.지원 동기</Typography>
                    <TextField id="outlined-multiline-static"
                               label='지원동기를 작성해주세요.'
                               multiline
                               rows={10}
                               margin="normal"
                               sx={{width:700,
                                    minheight: 100 
                                }}
                    />
                </Stack>
                <Stack  direction="column" spacing={2} alignItems="start" padding={5}>
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
                <Stack  direction="column" spacing={2} alignItems="start" padding={5}>
                    <Typography sx={{fontSize: 16, pb:3}}>3.업무 역량</Typography>
                    <TextField id="outlined-multiline-static"
                               label='업무 역량을 작성해주세요.'
                               multiline
                               rows={10}
                               margin="normal"
                               sx={{width:700,
                                    minheight: 100 }}/>
                </Stack>       
                <Button variant="contained"
                        size="small" 
                        sx={{ width: 100, 
                              mt:3, mx:'auto', 
                              color:'#ffff', 
                              backgroundColor: '#26a69a', 

                              borderColor:'#434343'
                            }}
                            onClick={() => {goNewprdict()}}
                >
                    저 장
                </Button>
            </Box>
        </div>
    );
}

export default Board_predict_write ;