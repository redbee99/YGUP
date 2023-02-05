import { Box,
  Card, 
  Typography,
  CardActionArea, 
  CardContent, 
  CircularProgress, 
  Divider, 
  Stack } from '@mui/material';
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { BaseUrl } from '../../util/axiosApi';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const Board_cl: React.FC = () => {

  const navigate = useNavigate();
  const goCl_write = () => {
    navigate('/cl_write')
  }

  const getCl_List = async ()=>{
    const url = BaseUrl + "/cover_letter/read_all_cover_letter"
    const { data } = await axios.post(url, {
        headers: 
        {
            "Content-Type": "application/json"
        },
        body: { clno: 0 }
    })
    return data
}

const { isLoading, data, error } = useQuery('getCl_List', getCl_List);

if(isLoading){
    return <CircularProgress />
}
else{
    return (
        <div className='board_cl_check'>
            <Box sx={{ width: '100%' }}>
            <Typography sx={{fontSize:20, my:5}} textAlign='center'>최근 문서</Typography>
            <Box sx={{ width: '100%' }}>
            <Card style={{ maxHeight:400 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align="center" onClick={() => goCl_write()}>
                                            새 자소서 작성
                                        </Typography>
                                        <Divider/>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
            <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 10, sm: 8, md: 10 }}>
                    {Object.keys(data).map((value:any, index:any) => (
                        <Grid xs={2} sm={2} md={2} key={index}>
                            <Card style={{ maxHeight:400 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align="center">
                                            {data[value]['cname']}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" color="text.secondary">
                                            {data[value]['clname']}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" sx={{ fontSize:15 }}>
                                                {data[value]['wdate']}
                                            </Typography>
                                        <Divider/>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                    </Grid>
               </Box>
            </Box>
        </div>
    );
  }
}

export default Board_cl;