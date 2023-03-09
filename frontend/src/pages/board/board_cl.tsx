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
  
  const { isLoading, data, error } = useQuery('getCl_List', getCl_List);
  
  if(isLoading){
      return <CircularProgress />
  }
  else{
      return (
          <div className='board_cl_check'>
              <Box sx={{ width: '100%' }}>
              <Typography sx={{fontSize:30, my:5,marginLeft:10, marginTop:5 }}>최근 문서</Typography>
              <div className='board_cl'>
              <Box sx={{ width: 250 }}>
              <Card style={{width:250, height:150, marginLeft:50, paddingTop:10, marginTop:20, marginBottom: 20}} onClick={() => goCl_write()}>
                                  <CardActionArea>
                                      <CardContent>
                                          <Typography gutterBottom variant="h5" component="div" align="center" >
                                             자소서 <br/> 작성
                                          </Typography>
                                          <Divider/>
                                      </CardContent>
                                  </CardActionArea>
                              </Card>
            <Box sx={{  width: '100%'}}>
              <Grid container spacing={15} columns={{ xs: 10, sm: 8, md: 10 }}>
                      {Object.keys(data).map((result:any, index:any) => (
                          <Grid xs={2} sm={2} md={2} key={index} onClick={() => goCl_info(data[result]['clno'],data[result]['cname'])}>
                              <Card style={{width:250, height:200, marginLeft: 50, marginTop:20, marginBottom: 20}}>
                                  <CardActionArea>
                                      <CardContent>
                                          <Typography gutterBottom variant="h5" component="div" align="center">
                                            기업명: {data[result]['cname']}
                                          </Typography>
                                          <Typography gutterBottom variant="h5" color="text.secondary">
                                             제목: {data[result]['clname']}
                                          </Typography>
                                          <Typography gutterBottom variant="h6" sx={{ fontSize:15 }}>
                                             작업시간: {data[result]['wdate']}
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
              </Box>
          </div>
      );
    }
  }
  
export default Board_cl;