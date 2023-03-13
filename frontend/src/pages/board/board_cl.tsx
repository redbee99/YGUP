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
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers'

const Board_cl: React.FC = () => {

const currentId = useSelector((state: RootState) => state.userReducer.id);
const [id] = React.useState(currentId);
const navigate = useNavigate();
const goCl_write = () => {
 navigate('/cl_write')
}
const goCl_info = (data:string,data1:string) => {
 navigate('/cl_info',{
   state :{ data: data, data1:data1 }
   })
}

const getCl_List = async ()=>{
 const url = BaseUrl + "/cover_letter/read_all"
 const { data } = await axios.post(url, {
     headers: 
     {
         "Content-Type": "application/json"
     },
     body: { id:id }
 })
 return data
}

const { isLoading, data:cl_data, error } = useQuery('getCl_List', getCl_List);

if(isLoading){
 return <CircularProgress color="success" />
}
else{
    const DynamicContent = () => {
        if(cl_data == "" || cl_data == null || cl_data == undefined || ( cl_data != null && typeof cl_data == "object" && !Object.keys(cl_data).length ) ){
            return (
                <div className='my-div'> 
                작성한 자소서가 없습니다.
                </div>
            );
        } else {
            return (
              <Box sx={{ width: '100%'}}>
                <Grid sx={{ flexGrow: 1 }} container spacing={{ xs: 6, sm: 6, md: 6 }} columns={{ xs: 10, sm: 10, md: 10 }}>
                  <Grid container justifyContent="center" rowSpacing={3}>
                        {Object.keys(cl_data).map((result:any, index:any) => (
                            <Grid xs={2} sm={2} md={4} key={index} onClick={() => goCl_info(cl_data[result]['clno'],cl_data[result]['cname'])}>
                                <Card style={{width:250, height:150, marginLeft: 50, marginTop:30}}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" align="center">
                                               제목: {cl_data[result]['clname']}
                                            </Typography>
                                            <Divider/>
                                            <Typography gutterBottom variant="body1" color="text.secondary">
                                               기업명: {cl_data[result]['cname']}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" sx={{ fontSize:15 }}>
                                               작성일: {cl_data[result]['wdate']}
                                                </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                        </Grid>
                       </Grid>
                   </Box>
            );
        }
    }
 return (
     <div className='board_cl'>
          <Typography sx={{fontSize:30, my:5, marginLeft:10, marginTop:5}}>최근 문서</Typography>
           <Box className='box_cl'>
             <Card className='card' onClick={() => goCl_write()}>
                <CardContent>
                  <Typography className='body'>
                     자소서 <br/> 작성
                   </Typography>
                </CardContent>
             </Card>
            </Box>
            <DynamicContent/>
     </div>
 );
}
}

export default Board_cl;