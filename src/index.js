import React from 'react';
import ReactDOM from 'react-dom';
import  {  ToastContainer   }  from 'react-toastify' ; 
//import Login from './containers/Login';



import { UserProvider } from './hooks/UserContext';
import Routrs from "./routes/routes"
import  GlobalStyles  from './styles/globalStyles';
//import Login from './containers/Login';






ReactDOM.render(

<>

<UserProvider>

< Routrs/>

</UserProvider>

{/* <Register/> */}
< ToastContainer autoClose={2000} theme='colored' /> 
<GlobalStyles />



</>,




  document.getElementById('root')



);









//   ReactDOM.render(
//   <h1>Hello Code Burger</h1>,
  
//   document.getElementById('root')


// );

 


// const root = ReactDOM.render(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
