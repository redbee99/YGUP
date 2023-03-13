import React from 'react';
import { Box, Stack } from '@mui/system';
import { Checkbox, CardActionArea, CardContent, CardMedia, CircularProgress, 
        Divider,Tabs, Tab, Card, Grid,Typography } from '@mui/material';
import { BaseUrl } from '../../util/axiosApi';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


const Board_Like: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [value, setValue] = React.useState(state);
  const [isBookmarkSelected, setisBookmarkSelectedValue] = React.useState(false);
  const currentId = useSelector((state: RootState) => state.userReducer.id);
  const [id] = React.useState(currentId);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const goList = () => {
    navigate('/board_list')
  };
  const goLike = (state: number) => {
   navigate('/board_like', { state: state })
  };
  const goFav = (state: number) => {
    navigate('/board_Fav', { state: state })
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

const CompanyList = async ()=>{
  const url = BaseUrl + "/company/rank"
  const { data } = await axios.post(url, {
      headers: 
      {
          "Content-Type": "application/json"
      },
      body: {type: 'readcnt', f_all: 0 }
  })
  return data
}
/*
const getBookmark = async ()=>{
  const url = BaseUrl + "/bookmark/read"
  const { data } = await axios.post(url, {
      headers: 
      {
          "Content-Type": "application/json"
      },
      body: { id: id, cname: cname }
  })

  if(data == "bookmark_button_on"){
      setisBookmarkSelectedValue(true)
  }
  else{
      setisBookmarkSelectedValue(false)
  }
  return data
}

const createBookmark = async ()=>{
  const url = BaseUrl + "/bookmark/create"
  const url2 = BaseUrl + "/bookmark/delete"
  let data = null

  try {
  // Check if bookmark exists
  const checkUrl = BaseUrl + "/bookmark/read1"
  const checkResponse = await axios.post(checkUrl, {
      headers: 
      {
          "Content-Type": "application/json"
      },
      body: { id: id, cname: Cname }
  })

  
      // Delete existing bookmark
      const deleteResponse = await axios.post(url2, {
          headers: 
          {
              "Content-Type": "application/json"
          },
          body: { id: id, cname: Cname }
      })

      data = deleteResponse.data;
      
  } catch(error) {
      console.log(error);
      // Create new bookmark
      
      const createResponse = await axios.post(url, {
          headers: 
          {
              "Content-Type": "application/json"
          },
          body: { id: id, cname: Cname, state: '1'}
      })

      data = createResponse.data;
  
  }
  return data
} */

const { isLoading: CompanyIsLoading, data: CompanyData, error } = useQuery('CompanyList', CompanyList);
/* const { isLoading: BookmarkIsLoading, data: BookmarkData, error: BookmarkError } = useQuery('getBookmark', getBookmark); */  

if( CompanyIsLoading ){
  return <CircularProgress color="success"/>
}
else{
  return (
    <div className='board_like'>  
      <Box sx={{ backgroundColor:'#ffff', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} indicatorColor="secondary" aria-label="secondary tabs example">
          <Tab label="전체" {...a11yProps(0)} onClick={() => {goList()}}/>
          <Tab label="실시간 급상승" {...a11yProps(1)} onClick={() => { goLike(1); }}/>
          <Tab label="인기 기업" {...a11yProps(2)} onClick={() => { goFav(2); }}/>
        </Tabs>
      </Box>
      <Box sx={{ flexGrow: 1, maxWidth: 1500, marginTop: 5 , mx:15, mb:15 }}>
          <Grid container spacing={{xs: 3, md: 3}} columns={{ xs: 8, sm: 8, md: 8 }}>
              {Object.keys(CompanyData).map((result:any, index:any) => (
                  <Grid item xs={2} sm={2} md={2} key={index} onClick={() => { goInfo(CompanyData[result]['cname']) }}>
                      <Card style={{width:250, height:250, marginLeft: 50, marginTop:20, marginBottom: 20}}>
                          <CardActionArea>
                                <Checkbox 
                                   sx={{ float: 'right'}} {...label}
                                   icon={<BookmarkBorderIcon />} 
                                   checkedIcon={<BookmarkIcon />}
                                   checked={isBookmarkSelected}
                                 />  
                                  <CardMedia
                                      component="img"
                                      sx={{ marginLeft:3, width: 200 , align:'center', maxHeight:50, objectFit:"contain"}}
                                      src={CompanyData[result]['logo_url']}
                                      alt="logo"
                                      />
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div" align="center">
                                      {CompanyData[result]['cname']}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                     주소: {CompanyData[result]['address']}
                                  </Typography>
                                      <Typography variant="body1" sx={{ fontSize:15 }}>
                                         정보: {CompanyData[result]['form']}
                                      </Typography>
                                      <Divider/>
                                    <Box sx={{ m: 3 }}>
                                      <Stack direction="row"  sx={{flexGrow: 1}} spacing={2}>
                                          <Box borderRadius={1} sx={{ width:350, height:30, border:"solid 1px #dfdfdf;"}}>
                                              <Typography variant="body1" sx={{ fontSize:15, marginLeft:1, marginTop:0.5 }}>
                                                  {
                                                      CompanyData[result]['keyword'].split(',')[0]
                                                  }
                                              </Typography>
                                          </Box>
                                          <Box borderRadius={1} sx={{ width:350, height:30, border:"solid 1px #dfdfdf;"}}>
                                              <Typography variant="body1" sx={{ fontSize:15, marginLeft:1, marginTop:0.5 }}>
                                                  {
                                                      CompanyData[result]['keyword'].split(',')[1]
                                                  }
                                              </Typography>
                                          </Box>
                                          <Box borderRadius={1} sx={{ width:350, height:30, border:"solid 1px #dfdfdf;"}}>
                                              <Typography variant="body1" sx={{ fontSize:15, marginLeft:1, marginTop:0.5 }}>
                                                  {
                                                      CompanyData[result]['keyword'].split(',')[2]
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
      </div>
  );
 }
}

export default Board_Like ;