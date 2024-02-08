
import Modal from "../../components/Modal";
import * as React from "react";
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import styles from './attendenceModal.module.css';
import { GridRowId, GridCallbackDetails } from '@mui/x-data-grid';


interface Props {
    modalOpen: boolean
    handleModalClick: () => void
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'studentName', headerName: 'Student name', width: 200 },
    { field: 'rollNo', headerName: 'Roll No', width: 200 },
  ];

  
  
  const rows = [
    { id: 1, studentName: 'Monkey D Luffy', rollNo: '7376222AL101' },
    { id: 2, studentName: 'Roronoa Zoro', rollNo: '7376222AL102' },
    { id: 3, studentName: 'Nami', rollNo: '7376222AL103' },
    { id: 4, studentName: 'Usopp', rollNo: '7376222AL104' },
    { id: 5, studentName: 'Sanji', rollNo: '7376222AL105' },
    { id: 6, studentName: 'Tony Tony Chopper', rollNo: '7376222AL106' },
    { id: 7, studentName: 'Nico Robin', rollNo: '7376222AL107' },
    { id: 8, studentName: 'Franky', rollNo: '7376222AL108' },
    { id: 9, studentName: 'Brook', rollNo: '7376222AL109' },
    { id: 10, studentName: 'Jinbe', rollNo: '7376222AL110' },
    {id :11, studentName :'Whitebeard', rollNo: '7376222AL111'},
    {id :12, studentName :'Shanks', rollNo: '7376222AL112'},
    {id :13, studentName :'Buggy', rollNo: '7376222AL113'},
    {id :14, studentName :'Kaido', rollNo: '7376222AL114'},
    {id :15, studentName :'Big Mom', rollNo: '7376222AL115'},
    {id :16, studentName :'Blackbeard', rollNo: '7376222AL116'},
    {id :17, studentName :'Akainu', rollNo: '7376222AL117'},
    {id :18, studentName :'Aokiji', rollNo: '7376222AL118'},
    {id :19, studentName :'Kizaru', rollNo: '7376222AL119'},
    {id :20, studentName :'Fujitora', rollNo: '7376222AL120'},
  ];
  
 const AttendenceModal = ({modalOpen, handleModalClick}:Props) =>{

    const [searchQuery, setSearchQuery] = React.useState('');
    const [attendance, setAttendance] = React.useState({});

    const FilteredRow = rows.filter((row) => {
        const formattedSearchQuery = searchQuery.replace(/\s/g, '').toLowerCase();
        const formattedStudentName = row.studentName.replace(/\s/g, '').toLowerCase();
        const formattedRollNo = row.rollNo.replace(/\s/g, '').toLowerCase();
        return (

            formattedStudentName.includes(formattedSearchQuery) ||
            formattedRollNo.includes(formattedSearchQuery) || 
             formattedSearchQuery.toLowerCase() === ''
        )
        });
        let processedRows : string[] = [];
        const updatedAttendance: { [key: string]: boolean } = {};

          let lastSelectedRows: GridRowId[] = [];

          const handleSelectionChange = (rowSelectionModel: GridRowId[], details: GridCallbackDetails<any>) => {
            // console.log(rowSelectionModel);
            const newlySelectedRows = rowSelectionModel.filter(row => !lastSelectedRows.includes(row));
            newlySelectedRows.forEach(newRow => {
              const selectedRowData = rows.find(row => row.id === newRow);
              if (selectedRowData && !processedRows.includes(selectedRowData.rollNo)) {
                updatedAttendance[selectedRowData.rollNo] = true; // Mark as present
                console.log(`Marked attendance: ${selectedRowData.studentName}, Roll Number: ${selectedRowData.rollNo}`);
                processedRows.push(selectedRowData.rollNo);
              } else if (!selectedRowData) {
                console.log(`No data found for selected row: ${newRow}`);
              }
            });
            lastSelectedRows = [...rowSelectionModel];
            setAttendance(updatedAttendance);
          };

    return (
        <Modal isOpen ={modalOpen} onClose={handleModalClick} title = "" >
     <>
     <div className={styles.table_container} >
        <input
            type="text"
            placeholder="Search"
            className={styles.search_input}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    
            <DataGrid
                rows={FilteredRow}
                columns={columns}
                className={styles.data_grid}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange}
                sx={{fontSize : '1.05rem',
                width:'50rem',
                height:'20rem'
            }}
            />
            {/* <button className={styles.Save_button}>submit</button> */}
            </div>
           
            </>
        </Modal>
    )
 };

 export default AttendenceModal;