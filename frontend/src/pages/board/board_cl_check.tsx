import { Box,
         Card, 
         Typography,
         CardActionArea, 
         CardContent,  
         CircularProgress, 
         Divider} from '@mui/material';
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { BaseUrl } from '../../util/axiosApi';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { useNavigate } from 'react-router-dom';

const Board_cl_check: React.FC = () => {

   const currentId = useSelector((state: RootState) => state.userReducer.id);
   const [id ] = React.useState(currentId);
   const navigate = useNavigate();
   
   const goNewpredict = (data: string) => {
    navigate('/predicttest',{
       state :{ data: data }
       })
  };

  const getCl_List = async ()=>{
    const url = BaseUrl + "/cover_letter/read_all"
    const { data } = await axios.post(url, {
        headers: 
        {
            "Content-Type": "application/json"
        },
        body: { id: id }
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
            <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 10, sm: 8, md: 10 }} >
                    {Object.keys(data).map((result:any, index:any) => (
                        <Grid xs={2} sm={2} md={2} key={index} onClick={() => { goNewpredict(data[result]['clno']) }}>
                            <Card style={{ maxHeight:400 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align="center">
                                            {data[result]['cname']}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" color="text.secondary">
                                            {data[result]['clname']}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" sx={{ fontSize:15 }}>
                                                {data[result]['wdate']}
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