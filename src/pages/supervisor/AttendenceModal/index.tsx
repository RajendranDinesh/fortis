
import Modal from "../../components/Modal";
import * as React from "react";
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import styles from './attendenceModal.module.css';
import { GridRowId } from '@mui/x-data-grid';
import { useState , useEffect } from "react";

import { Request } from '../../../networking';
import { useParams } from "react-router-dom";



interface Props {
    modalOpen: boolean
    handleModalClick: () => void
}

const columns: GridColDef[] = [
    { field: 'studentName', headerName: 'Student name', width: 150},
    { field: 'rollNo', headerName: 'Roll No', width: 150 },
    ];

  
  
  const rows = [
    { id: 1, studentName: 'Monkey D Luffy', rollNo: '7376222AL101' , isPresent: false},
    { id: 2, studentName: 'Roronoa Zoro', rollNo: '7376222AL102' , isPresent: false},
    { id: 3, studentName: 'Nami', rollNo: '7376222AL103', isPresent: false},
    { id: 4, studentName: 'Usopp', rollNo: '7376222AL104', isPresent: true},
    { id: 5, studentName: 'Sanji', rollNo: '7376222AL105', isPresent: true },
    { id: 6, studentName: 'Tony Tony Chopper', rollNo: '7376222AL106', isPresent: true },
    { id: 7, studentName: 'Nico Robin', rollNo: '7376222AL107' , isPresent: true},
    { id: 8, studentName: 'Franky', rollNo: '7376222AL108' , isPresent: true},
    { id: 9, studentName: 'Brook', rollNo: '7376222AL109' , isPresent: true},
    { id: 10, studentName: 'Jinbe', rollNo: '7376222AL110' , isPresent: true},
    {id :11, studentName :'Whitebeard', rollNo: '7376222AL111', isPresent: false},
    {id :12, studentName :'Shanks', rollNo: '7376222AL112', isPresent: false},
    {id :13, studentName :'Buggy', rollNo: '7376222AL113', isPresent: false},
    {id :14, studentName :'Kaido', rollNo: '7376222AL114', isPresent: false},
    {id :15, studentName :'Big Mom', rollNo: '7376222AL115', isPresent: false},
    {id :16, studentName :'Blackbeard', rollNo: '7376222AL116', isPresent: false},
    {id :17, studentName :'Akainu', rollNo: '7376222AL117', isPresent: false},
    {id :18, studentName :'Aokiji', rollNo: '7376222AL118', isPresent: false},
    {id :19, studentName :'Kizaru', rollNo: '7376222AL119', isPresent: false},
    {id :20, studentName :'Fujitora', rollNo: '7376222AL120', isPresent: false},
  ];

  
 const AttendenceModal = ({modalOpen, handleModalClick}:Props) =>{

    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

    const [attendence, setAttendence] = useState([]);


    const { id } = useParams();

    useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
          const response = await Request("GET",`/supervisor/attendence/${id}`);
          if (response.status === 200) {
              // const testData = response.data.active_students;
              console.log("--- attendence data ----",response.data.attendence);
              setAttendence(response.data.attendence);
          } else {
              console.error('Failed to fetch test data');
          }
      } catch (error) {
          console.error('Error fetching test data:', error);
      }
  };

  // const presentStudents = async () => {
  //   try {
  //       const response = await Request("POST",`/supervisor/attendence-present/${id}`,{student_id: student_id});
  //       if (response.status === 200) {

  //         console.log("- present message -",response.data.message);

  //       } else {
  //           console.error('Failed to fetch test data');
  //       }
  //   } catch (error) {
  //       console.error('Error fetching test data:', error);
  //   }
  // }

  // const absentStudents = async () => {
  //   try {
  //       const response = await Request("POST",`/supervisor/attendence-absent/${id}`,{student_id: student_id});
  //       if (response.status === 200) {

  //         console.log("- absent message -",response.data.message);

  //       } else {
  //           console.error('Failed to fetch test data');
  //       }
  //   } catch (error) {
  //       console.error('Error fetching test data:', error);
  //   }

    useEffect(() => {
      // Ensure selectedRows remain valid when the filteredRows change
      setSelectedRows(rows.filter(row => row.isPresent).map(row => row.id));
  },[]);

    const filteredRows = rows.filter((row) => {
      const formattedSearchQuery = searchQuery.trim().toLowerCase();
      const formattedStudentName = row.studentName.trim().toLowerCase();
      const formattedRollNo = row.rollNo.trim().toLowerCase();
      return (
          formattedStudentName.includes(formattedSearchQuery) ||
          formattedRollNo.includes(formattedSearchQuery) ||
          formattedSearchQuery === ''
      );
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
};

  const handleSelectionChange = (selection: GridRowId[]) => {
    setSelectedRows(selection);
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
                    onChange={handleSearchInputChange}
                />
                 <div className={styles.data_grid_container}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5,10]}
                    checkboxSelection
                    onRowSelectionModelChange={handleSelectionChange}
                    rowSelectionModel={selectedRows}
                    getRowId={row =>row.id}
                />
                </div>
            </div>
            </>
        </Modal>
    )
 };

 export default AttendenceModal;