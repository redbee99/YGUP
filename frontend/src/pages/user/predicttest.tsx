import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack, TextField, Typography } from '@mui/material';

const PredictTest: React.FC = () => {
    
      
    return (
        <div className='predicttest'>
            <Box height={'40%'} sx={{mb:1}}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{mt:5}}
                >
                    <Typography>합격 예측 기업 : 확률%</Typography>
                    <Box>키워드 단어들</Box>
                </Stack>
            </Box>
            <Box sx={{ bgcolor: 'white', mx:'auto', alignContent: 'center' }}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        paddingBottom:20
                    }}
                >
                    <Typography sx={{mt:5}}>자소서1</Typography>
                    <Box sx={{ display: 'flex', 
                               width: '80%', 
                               height: 400,
                               border: '1px solid', 
                               borderColor: 'grey.500', 
                               borderRadius: 2,  
                               mx:'auto', 
                               my:'auto', 
                               mb:1 
                            }} 
                    >
                        <Typography>자소서 내용</Typography>
                    </Box>
                </Stack>
            </Box>
        </div>
    );
}
export default PredictTest;