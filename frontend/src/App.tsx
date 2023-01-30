// ./ 의 위치: frontend/src/
// ../의 위치: frontend/
import React from 'react';
import './App.css';
import Home from './pages/home';
import Board_MyList from './pages/board/board_mylist';
import Board_Predict from './pages/board/board_predict';
import Board_List from './pages/board/board_list';
import Board_Like from './pages/board/board_like';
import Board_Fav from './pages/board/board_Fav';
import Login from './pages/user/login';
import { Route, Routes } from 'react-router-dom'
import User_list from './pages/admin/user_list';
import USer_delte from './pages/admin/user_delete'
import Company_Basic_List from './pages/admin/company_basic_list'
import Write from './pages/admin/write';
import IdSearch from './pages/user/idsearch';
import IdSearch_Result from './pages/user/idsearch_result';
import PwSearch from './pages/user/pwsearch';
import PwSearch_Result from './pages/user/pwsearch_result';
import Join from './pages/user/join';
import Info from './pages/admin/info';
import Info_Update from './pages/admin/info_update'
import Info_Delete from './pages/admin/info_delete';
import PredictTest from './pages/user/predicttest';
import UserInfo from './pages/user/userinfo';
import UserInfo_Update from './pages/user/userinfo_update';
import PwUpdate from './pages/user/pwupdate';
import Bookmark from './pages/user/bookmark';
import Manage from './pages/user/manage';
import CoverLetter_Write from './pages/user/coverletter_write';
import CoverLetter_Update from './pages/user/coverletter_update';
import NewPredict from './pages/user/newpredict';
import Board_mylist_chek from './pages/board/board_mylist_chek';
import Board_predict_write from './pages/board/board_predict_write';



const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/board_MyList' element={<Board_MyList />} />
      <Route path='/board_Predict' element={<Board_Predict />} />
      <Route path='/board_list' element={<Board_List />} />
      <Route path='/board_like' element={<Board_Like />} />
      <Route path='/board_Fav' element={<Board_Fav />} />
      <Route path='/newpredict' element={<NewPredict />} />
      <Route path='/predict_write' element={<Board_predict_write />} />
      <Route path='/board_mylist_chek' element={<Board_mylist_chek />} />
      <Route path='/user_list' element={<User_list />} />
      <Route path='user_delete' element={<USer_delte/>}/>
      <Route path='/company_basic_list' element={<Company_Basic_List />} />
      <Route path='/write' element={<Write />} />
      <Route path='/login' element={<Login />} />
      <Route path='/idsearch' element={<IdSearch />} />
      <Route path='/idsearch_result' element={<IdSearch_Result />} />
      <Route path='/pwsearch' element={<PwSearch />} />
      <Route path='/pwsearch_result' element={<PwSearch_Result />} />
      <Route path='/join' element={<Join />} />
      <Route path='/info' element={<Info />} />
      <Route path='/info_update' element={<Info_Update />} />
      <Route path='/info_delete' element={<Info_Delete />} />
      <Route path='/predicttest' element={<PredictTest />} />
      <Route path='/userinfo' element={<UserInfo />} />
      <Route path='/userinfo_update' element={<UserInfo_Update />} />
      <Route path='/pwupdate' element={<PwUpdate />} />
      <Route path='/bookmark' element={<Bookmark />} />
      <Route path='/manage' element={<Manage />} />
      <Route path='/coverletter_write' element={<CoverLetter_Write />} />
      <Route path='/coverletter_update' element={<CoverLetter_Update />} />
    </Routes>
  );
}


export default App;
