import { Box } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers';
import { set } from '../../reducers/headerReducer';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import { BaseUrl } from '../../util/axiosApi';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import { CardActionArea, CardContent, CardMedia, CircularProgress, Divider, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import { useState} from 'react';


const Board_Fav: React.FC = () => {

  const getRank1CompanyList = async ()=>{
    const url = BaseUrl + "/company/rank"
    const { data } = await axios.post(url, {
        headers: 
        {
            "Content-Type": "application/json"
        },
        body: { type: 'readcnt', f_all: 0 }
    })
    return data
}

const { isLoading, data, error } = useQuery('getRank1CompanyList', getRank1CompanyList);
 
  const currentPage = useSelector((state: RootState) => state.headerReducer.page);
  console.log(currentPage);
  const dispatch = useDispatch();
  dispatch(set('company'));

  const navigate = useNavigate();
  const { state } = useLocation();

  const goList = () => {
    navigate('/board_list', { state: state })
  };
  const goLike = (state: number) => {
    navigate('/board_like', { state: state })
  };
  const goFav = (state: number) => {
    navigate('/board_Fav', { state: state })
  };

  const [selected, setSelected] = React.useState<readonly string[]>([]);




  const isSelected = (name: string) => selected.indexOf(name) !== -1;

 /*전체,실시간,인기기업 tab부분*/
  function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
/*test*/
const [bookMarkIcon, setbookMarkIcon] = useState(false);

{bookMarkIcon === true ? (
  BookmarkIcon
) : (
  BookmarkBorderIcon
)}
/* 북마크*/
function StandaloneToggleButton() {
  const [selected, setSelected] = React.useState(false);

  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      <CheckIcon />
    </ToggleButton>
  );
}

const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setValue(newValue);
};

const [value, setValue] = React.useState(state);

  return (
    <div className='board_Fav'>  
      <Box sx={{ backgroundColor:'#009688', border: '1px solid grey', height:60, pt:3}}>
      </Box>
      <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="전체" {...a11yProps(0)} onClick={() => { goList(); }}/>
          <Tab label="실시간 급상승" {...a11yProps(1)} onClick={() => { goLike(1); }}/>
          <Tab label="인기 기업" {...a11yProps(2)} onClick={() => { goFav(2); }}/>
        </Tabs>
      </Box>
      <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 10, sm: 8, md: 10 }}>
                        <Grid xs={2} sm={2} md={2}>
                            <Card style={{ maxHeight:600 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <CardMedia
                                            component="img"
                                            sx={{ marginLeft:3, width: 200 ,height:300, align:'center', objectFit:"contain"}}
                                            src=' '
                                            alt="logo"/>
                                    </CardContent>
                                </CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align="center">
                                            기업명        <StandaloneToggleButton/><BookmarkBorderIcon onClick={() => setbookMarkIcon(!bookMarkIcon)}/>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            기업주소
                                        </Typography>
                                        <Box sx={{ m: 2 }}>
                                            <Stack direction="row" spacing={3}>
                                                <Box borderRadius={1} sx={{ width:70, height:30,  backgroundColor:'#26a68a',border:"solid 1px black"}}>
                                                    <Typography gutterBottom variant="body1" sx={{ color:'white',fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                            키워드1
                                                    </Typography>
                                                </Box>
                                                <Box borderRadius={1} sx={{ padding:'auto', width:70, height:30,  backgroundColor:'#26a68a',border:"solid 1px black"}}>
                                                    <Typography gutterBottom variant="body1" sx={{ color:'white',fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                            키워드2
                                                    </Typography>
                                                </Box>
                                                <Box borderRadius={1} sx={{ width:70, height:30,  backgroundColor:'#26a68a',border:"solid 1px black"}}>
                                                    <Typography gutterBottom variant="body1" sx={{ color:'white',fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                            키워드3
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
    </div>  
    );
  }
export default Board_Fav;





