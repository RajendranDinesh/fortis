
import Modal from "../../components/Modal";
import * as React from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from './attendenceModal.module.css';
import { GridRowId } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { Request } from '../../../networking';
import { useParams } from "react-router-dom";

interface Props {
    modalOpen: boolean
    handleModalClick: () => void
}

const columns: GridColDef[] = [
    { field: 'studentName', headerName: 'Student name', width: 150 },
    { field: 'rollNo', headerName: 'Roll No', width: 150 },
];

const AttendenceModal = ({ modalOpen, handleModalClick }: Props) => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
    const [attendence, setAttendence] = useState<any[]>([]);
    const [originalAttendence, setOriginalAttendence] = useState<any[]>([]); // Store original data


    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterRows(searchQuery);
    }, [searchQuery]);


    const fetchData = async () => {
        try {
            const response = await Request("GET", `/supervisor/attendence/${id}`);
            if (response.status === 200) {
              // console.log("--- attendence data ----",response.data);
              const attendenceData = Object.values(response.data.attendence).map((user: any, index: number) => ({
                id: user.user_id,
                studentName: user.username,
                rollNo: user.roll_number,
                isPresent: user.is_present === 1, // Convert to boolean
            }));
                // console.log("--- attendence data ----", attendenceData);
                setAttendence(attendenceData);
                setOriginalAttendence(attendenceData);

            } else {
                console.error('Failed to fetch attendence data');
            }
        } catch (error) {
            console.error('Error fetching attendence data:', error);
        }
    };


   const filterRows = (query: string) => {
    const formattedQuery = query.trim().toLowerCase();
    const filteredData = originalAttendence.filter((row) => {
        const studentName = row.studentName.toLowerCase();
        const rollNo = row.rollNo.toLowerCase();
        return studentName.includes(formattedQuery) || rollNo.includes(formattedQuery);
    });
    setAttendence(filteredData);
};

const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    filterRows(e.target.value);
};


  const handleSelectionChange = async (selectionModel: GridRowId[]) => {
    setSelectedRows(selectionModel);
    
    // Iterate through all rows in the attendance data
    attendence.forEach(async (row) => {
        // Check if the current row is selected
        const isSelected = selectionModel.includes(row.id);
        
        // Prepare the data to send to the backend
        const data = {
            is_present: isSelected ? 1 : 0,
            roll_number: row.rollNo,
            name: row.studentName
        };
        
        try {
            // Make an API request to the backend endpoint to update attendance
            console.log(data)
            // const response = await fetch('/api/updateAttendance', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(data)
            // });
            // if (response.ok) {
            //     console.log(`Attendance for ${row.studentName} (${row.rollNo}) updated successfully.`);
            // } else {
            //     console.error(`Failed to update attendance for ${row.studentName} (${row.rollNo}).`);
            // }
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    });
};



  

    return (
        <Modal isOpen={modalOpen} onClose={handleModalClick} title="">
            <>
                <div className={styles.table_container}>
                    <input
                        type="text"
                        placeholder="Search"
                        className={styles.search_input}
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <div className={styles.data_grid_container}>
                        <DataGrid
                            rows={attendence}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            onRowSelectionModelChange={handleSelectionChange}
                            rowSelectionModel={selectedRows}
                            getRowId={row => row.id}
                        />
                    </div>
                </div>
            </>
        </Modal>
    )
};

export default AttendenceModal;
