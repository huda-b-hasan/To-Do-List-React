import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './App.css';
import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
// Icons
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { TaskDataContext } from './Context/TaskDataContext';
export default function ToDo({ TaskInfo }) {
    const {  todos, setTodos,handleClick} = useContext(TaskDataContext)
    // check task
    function handleCheckClick() {
        const checkToDos = todos.map((task) => {
            return task.id == TaskInfo.id ? { ...task, isComplete: !task.isComplete } : task
        })
        setTodos(checkToDos)
        localStorage.setItem("todos", JSON.stringify(checkToDos));

        if (!TaskInfo.isComplete){
            handleClick("تم الانتهاء من المهمه")
        }
    }
    // /check task/
    // update task

    // /update task/
    const [showUpdateModal, setUpdateModal] = useState(false)
    const[updateInfo,setUpdateInfo]=useState({title:TaskInfo.title,details:TaskInfo.ditails || ""})
    function handleInputTitle(value){
        setUpdateInfo({...updateInfo,title:value})
    }
    function handleInputDetails(value){
        setUpdateInfo({...updateInfo,details:value})
    }
    function handleOpenUpdate(){
        setUpdateModal(true)
    }
    function handleCloseUpdate(){
        setUpdateInfo({title:TaskInfo.title,details: TaskInfo.ditails})
        setUpdateModal(false)
    }
    function updateTask(taskID){
        const UpdatedToDos = todos.map((Task)=>{
            return Task.id==taskID? {...Task,title:updateInfo.title,ditails:updateInfo.details}:Task
        })
        setUpdateModal(false)
        localStorage.setItem("todos", JSON.stringify(UpdatedToDos));
        setTodos(UpdatedToDos)
        handleClick("تم تعديل من المهمه")
    }
    // Delete Modal
    const [showDeleteModal, setDeleteModal] = useState()
    function handleDeleteClick() {
        const DeletedToDos = todos.filter((Task) => {
            return Task.id != TaskInfo.id
        })
        localStorage.setItem("todos", JSON.stringify(DeletedToDos));
        setTodos(DeletedToDos)
        handleClick("تم  حذف المهمه")
    }
    // /Delete Modal/

    return (
        <>
            { /* Deleted Modal */}
            <Dialog
                style={{ direction: 'rtl' }}
                onClose={() => { setDeleteModal(false) }}
                open={showDeleteModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"هل أنت متأكد من رغبتك من حذف المهمة ؟؟"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        لا يمكنك التراجع عن الحذف في حال اختيار (حذف)
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: '#c54242' }} onClick={() => { setDeleteModal(false); }}  >اغلاق</Button>
                    <Button style={{ color: '#c54242' }} onClick={() => { handleDeleteClick();   }} autoFocus>
                        نعم قم بحذف الرسالة
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Deleted Modal */}

            { /* Update Modal */}
            <Dialog
                style={{ direction: 'rtl' }}
                onClose={() => { handleCloseUpdate(false) }}
                open={showUpdateModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"تعديل المهمة "}
                </DialogTitle>
                <DialogContent>
                    <form id="subscription-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="title"
                            name="title"
                            label="العنوان"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={updateInfo.title}
                            onChange={(e)=>{handleInputTitle(e.target.value)}}
                        />

                        <TextField
                            margin="dense"
                            id="details"
                            name="details"
                            label="التفاصيل"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={updateInfo.details}
                            onChange={(e)=>{handleInputDetails(e.target.value)}}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: '#c54242' }} onClick={() => {handleCloseUpdate(false) }}  >الغاء</Button>
                    <Button style={{ color: '#c54242' }} onClick={() => { updateTask(TaskInfo.id)}} autoFocus>
                        تعديل
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Update Modal */}
            <Card sx={{ minWidth: 200, backgroundColor: 'text.secondary', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 1, '&:hover': { cursor: 'pointer', boxShadow: '1px 2px 10px 0.2px rgba(41, 40, 40, 0.69)', transition: 'all o.3s', transform: 'translate(0,-5%)' } }}>
                <CardContent>
                    <Typography style={{textDecoration: TaskInfo.isComplete? 'line-through':'none'}} variant='h2' gutterBottom sx={{ color: 'secondary.contrastText', fontSize: 20 }}>
                        {TaskInfo.title}
                    </Typography>
                    <Typography variant='body1' sx={{ color: 'divider' }}>
                        {TaskInfo.ditails}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={() => { handleCheckClick() }}
                        className="iconButtons" style={{ color: TaskInfo.isComplete ? 'white' : '#DDA15E', border: '2px solid #DDA15E', backgroundColor: TaskInfo.isComplete ? '#DDA15E' : 'white' }} aria-label="Check" size="small">
                        <CheckIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={()=>{handleOpenUpdate()}} className='iconButtons' style={{ backgroundColor: 'white', border: '2px solid' }} aria-label="Ubdate" size="small">
                        <CreateOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => { setDeleteModal(true)   }} className='iconButtons' style={{ backgroundColor: 'white', color: '#c54242', border: '2px solid' }} aria-label="delete" size="small">
                        <DeleteIcon fontSize="small" />
                    </IconButton>

                </CardActions>
            </Card>
        </>
    );
}
