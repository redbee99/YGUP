import * as React from 'react';
import {Box,
        Checkbox,} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';        

function Bookmark(): React.ReactElement {
   
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 

  return (
    <div>
      <Box>
         <Checkbox sx={{ float: 'right'}} {...label}
             icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />}/>  
       </Box>
    </div>
  );
}

export default Bookmark;