import { Box,
         Card, 
         Typography,
         CardActionArea, 
         CardContent, 
         CardMedia, 
         CircularProgress, 
         Divider, 
         Stack } from '@mui/material';
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { BaseUrl } from '../../util/axiosApi';
import axios from 'axios';
import { useQuery } from 'react-query';

const Board_cl_check: React.FC = () => {

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
        </div>
    );
  }
}

export default Board_cl_check;