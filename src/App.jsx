import ToDoList from './ToDoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import './App.css';
import {useState,useEffect,useRef} from 'react';
import {TaskDataContext} from'./Context/TaskDataContext'
import { v4 as uuidv4 } from "uuid";
const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "تيسمبتيس يتسبميتس بيمستب",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "تيسمبتيس يتسبميتس بيمستب",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "تيسمبتيس يتسبميتس بيمستب",
    isCompleted: false,
  },
];
const theme = createTheme({ 
      typography:{
        fontFamily:[
          "Tajawal"
        ]
      },
      direction: 'rtl',
      palette: {
        background: {
          default: '#FAF9F6',
          paper: '#FFFFFF',
          main: '#606C38',
        },
        primary: {
          main: '#A3B18A',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#DDA15E',
          contrastText: '#ffffff',
        },
        text: {
          primary: '#283618',
          secondary: '#606C38',
        },
        divider: '#E0E0E0',
      },
      shape: {
        borderRadius: 12,
      },
  })

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
function App() {
  const [todos, setTodos] = useState(initialTodos);
  
      const [data,setData]=useState("")
      const [showState,setShowState]=useState(false)
      const timerId = useRef(null);
          useEffect(() => {
          if (showState) {
              //Creating a timeout
              timerId.current = setTimeout(() => {
                  setShowState(false);
              }, 2000);
          }
  
          return () => {
              //Clearing a timeout
              clearTimeout(timerId.current);
          };
      }, [showState]);
  
      function handleClick(value) {
          setShowState(true);
          setData(value)
      }
  return (
      <> 
      <TaskDataContext.Provider value={{todos,setTodos,data,handleClick}}>
      <div  style={{backgroundColor:theme.palette.background.main,paddingBlock:'20px',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl" >


          <ToDoList></ToDoList>
          {showState?<Status content={data} /> : <></>}
        </div>
      </ThemeProvider>
    </CacheProvider>
</div>
</TaskDataContext.Provider>
      </>
  )
}

export default App
function Status ({content}){
    return <h3  style={{position: 'fixed',
    left: '22px',
    bottom: '10px',
    backgroundColor: 'beige',
    padding: '10px 20px',
    borderRadius: '9px',
    color:'#606C38'}} >
        {content}
    </h3>
}