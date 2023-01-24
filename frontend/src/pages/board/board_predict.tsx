import * as React from 'react';
import { Box,Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';



const Board_Predict: React.FC = () => {
    const navigate = useNavigate();

    const goBoard_mylist_chek = () => {
       navigate('/board_mylist_chek')
    };
    const goPredict_write = () => {
        navigate('/predict_write')
    };
        return (
        <div className='board_Predict'>  
            <Box sx={{ backgroundColor:'#E6EAF3', height:300, borderBottom:10, borderBlockColor:'#E6EAF3'}}>
      <Box sx={{ display: 'flex', 
                flexWrap: 'wrap', 
                  '& > :not(style)' : { 
                m: 1, 
                marginTop:6,
                marginBottom:4,
                padding:1,
                minwidth: 128, 
                height: 150,
                marginLeft:35,
                },
              }}
            >
            <Card  sx={{height:100, width:300}} variant="outlined">
              <CardContent>
                <Typography sx={{ mb: 2 }}>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="large" onClick={() => { goBoard_mylist_chek()}}>자소서 선택</Button>
              </CardActions>
            </Card>  
            <Card  sx={{height:100, width:300}} variant="outlined">
              <CardContent>
                <Typography sx={{ mb: 2 }}>
                </Typography>
              </CardContent>
              <CardActions>
                 <Button size="large" onClick={() => { goPredict_write()}}>자소서 작성</Button>
              </CardActions>
            </Card>
         </Box> 
        </Box>
         </div>
          );
}

export default Board_Predict;