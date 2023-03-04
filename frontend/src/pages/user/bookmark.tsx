import * as React from 'react';
import User from '../components/user';
import { Box, Stack, CardActionArea, CardContent, CardMedia, CircularProgress, 
        Divider,Tabs, Tab, Card, Grid,Typography } from '@mui/material';
import { BaseUrl } from '../../util/axiosApi';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers'


const Bookmark: React.FC = () => {

    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const currentId = useSelector((state: RootState) => state.userReducer.id);
    const [id, setIdValue] = React.useState(currentId);

    const goBookmark = () => {
        navigate('/bookmark')
    };

    const goManage = (state: number) => {
        navigate('/manage',  { state: state })
    };
 
    const goInfo = (data: string) => {
      navigate('/info',{
         state :{ data: data }
         })
    };

    function a11yProps(index: number) {
      return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
      };
  }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

   
  const BookmarkRead = async ()=>{
    const url = BaseUrl + "/bookmark/read_user"
    const { data } = await axios.post(url, {
       headers: 
       {
           "Content-Type": "application/json"
       },
        body: {id: id }
    })
   return data
 }

const { isLoading: BookmarkReadIsLoading, data: BookmarkReadData, error } = useQuery('BookmarkRead', BookmarkRead);

if( BookmarkReadIsLoading ){
  return <CircularProgress />
}
else{
  return (
      <div className='bookmark'>
          <Stack direction={'row'} spacing={2} className='mypagecontents'>
             <User/>
           <Box sx={{ flexGrow: 1, bgcolor:'#E6EAF3', display: 'flex', height: 224, marginTop: 10}}>
             <Tabs
               orientation="vertical"
               variant="scrollable"
               value={value}
               onChange={handleChange}
               aria-label="Vertical tabs example"
               sx={{ borderRight: 1, borderColor: 'divider' }}>
                <Tab label="북마크" value={0}  {...a11yProps(0)} onClick={() => { goBookmark(); }} />
                <Tab label="자소서 관리" value={1}  {...a11yProps(1)} onClick={() => { goManage(1);}} />
            </Tabs>
          </Box>
           <Box sx={{ width: '100%' }} >
             <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h5" marginTop={3} marginLeft={3} gutterBottom>
              북마크 기업
              </Typography>
            </Stack>
          <Grid container spacing={20} columns={{ xs: 10, sm: 8, md: 10 }}>
              {Object.keys(BookmarkReadData).map((result:any, index:any) => (
                  <Grid item xs={2} sm={2} md={2} key={index} onClick={() => { goInfo(BookmarkReadData[result]['cname']) }}>
                      <Card style={{width:250, height:250, marginLeft: 50, marginTop:3, marginBottom: 20}}>
                          <CardActionArea>
                              <CardContent>
                                  <CardMedia
                                      component="img"
                                      sx={{ marginLeft:3, width: 200 , align:'center', maxHeight:50, objectFit:"contain"}}
                                      src={BookmarkReadData[result]['logo_url']}
                                      alt="logo"
                                      />
                              </CardContent>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div" align="center">
                                    기업명:  {BookmarkReadData[result]['cname']}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                     주소: {BookmarkReadData[result]['address']}
                                  </Typography>
                                  <Divider/>
                                  <Box sx={{ m: 2 }}>
                                      <Typography gutterBottom variant="body1" sx={{ fontSize:15 }}>
                                        정보:  {BookmarkReadData[result]['form']}
                                      </Typography>
                                      <Stack direction="row" spacing={3}>
                                          <Box borderRadius={1} sx={{ width:50, height:30, border:"solid 1px black"}}>
                                              <Typography gutterBottom variant="body1" sx={{ fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                  {
                                                      BookmarkReadData[result]['keyword'].split(',')[0]
                                                  }
                                              </Typography>
                                          </Box>
                                          <Box borderRadius={1} sx={{ padding:'auto', width:50, height:30, border:"solid 1px black"}}>
                                              <Typography gutterBottom variant="body1" sx={{ fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                  {
                                                      BookmarkReadData[result]['keyword'].split(',')[1]
                                                  }
                                              </Typography>
                                          </Box>
                                          <Box borderRadius={1} sx={{ width:50, height:30, border:"solid 1px black"}}>
                                              <Typography gutterBottom variant="body1" sx={{ fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                  {
                                                     BookmarkReadData[result]['keyword'].split(',')[2]
                                                  }
                                              </Typography>
                                          </Box>
                                      </Stack>
                                  </Box>
                              </CardContent>
                          </CardActionArea>
                      </Card>
                  </Grid>
              ))}
              </Grid>
          </Box>
        </Stack>
      </div>
  );
 }
}


export default Bookmark;