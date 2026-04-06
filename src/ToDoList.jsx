
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import * as React from 'react';
import Divider from '@mui/material/Divider';
import ToDo from './ToDo';
import { useState,useContext,useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// Other
import { TaskDataContext } from './Context/TaskDataContext';
import { v4 as uuidv4 } from 'uuid';
import { Tune } from '@mui/icons-material';

export default function ToDoList() {
    const [typeButton, setClickedButton] = useState('all');

    const handleShow = (event, Clicked) => {
        setClickedButton(Clicked);
    };
    // Array of ToDo 
    const [inputTask, setinputTask] = useState("");
    const { todos, setTodos,handleClick } = useContext(TaskDataContext);
    let t;
    if(typeButton == "all"){
        t=todos
    }
    else if(typeButton == "done"){
        t = todos.filter((Task)=>{
            return Task.isComplete  ;
        })
    }
    else if( typeButton == "notDone"){
        t = todos.filter((Task)=>{
            return !(Task.isComplete);
        })
    }else {t=todos}
    const ToDoList = t.map((Task) => {
            return <ToDo key={Task.id} TaskInfo={Task}  />
        });
    function handleAddTask() {
        const updatedTodos=[...todos, { id: uuidv4(), title: inputTask, details: "", isComplete: false }]
        setTodos(updatedTodos)
        setinputTask("")
        handleClick("تم الاضافه")
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
    // /Array of ToDo/ 

    useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) || "";
    setTodos(storageTodos);
    }, []);

    return (

            <Container maxWidth="sm" >
                <Card sx={{ p: 1, minWidth: 275, backgroundColor: 'background.default' }}>
                    {/* Header of Card */}
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h1"  color = 'text.primary' >مهامي</Typography>
                        <Divider />
                        {/* Botton List */}
                        <ToggleButtonGroup
                            style={{ marginTop: "20px" }}
                            value={typeButton}
                            exclusive
                            onChange={handleShow}
                            aria-label="Show"
                            sx={{
                                '& .Mui-selected': {
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText'
                                }
                            }}
                        >
                            <ToggleButton value="all" aria-label="all">
                                <Typography>الكل</Typography>
                            </ToggleButton>
                            <ToggleButton value="done" aria-label="done">
                                <Typography>منجز</Typography>
                            </ToggleButton>
                            <ToggleButton value="notDone" aria-label="not done">
                                <Typography>غير منجز</Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                        {/*// Botton List// */}
                    </CardContent>
                    {/*// Header of Card// */}
                    {/* To Do */}
                    {ToDoList}
                    {/*// To Do //*/}
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                        <Box style={{ marginTop: '20px' }}>
                            <TextField value={inputTask} onChange={(e) => { setinputTask(e.target.value) }}
                                sx={{ flex: 1 }} size="small" id="outlined-basic" label="عنوان مهمة" variant="outlined" />
                            <Button onClick={() => { handleAddTask() }} sx={{ marginLeft: 1, paddingInline: 4 }} variant="contained">اضافة</Button>

                        </Box>
                    </CardActions>
                </Card>

            </Container>

    );
}
