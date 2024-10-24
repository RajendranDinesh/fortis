import Modal from "../../components/Modal";
import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId } from '@mui/x-data-grid';
import styles from './attendenceModal.module.css';
import { useState, useEffect } from "react";
import { Request } from '../../../networking';
import { useParams } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import { Checkbox } from '@mui/material';

interface Props {
    modalOpen: boolean
    handleModalClick: () => void
}

const columns: GridColDef[] = [
    { field: 'studentName', headerName: 'Student name', width: 150, filterable: false },
    { field: 'rollNo', headerName: 'Roll No', width: 150, filterable: false },
];

const AttendenceModal = ({ modalOpen, handleModalClick }: Props) => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
    const [attendence, setAttendence] = useState<any[]>([]);
    const [originalAttendence, setOriginalAttendence] = useState<any[]>([]);
    const [markedStudentIds, setMarkedStudentIds] = useState<GridRowId[]>([]);
    const [loadingRows, setLoadingRows] = useState<GridRowId[]>([]);

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
                const attendenceData = Object.values(response.data.attendence).map((user: any, index: number) => ({
                    id: user.user_id,
                    studentName: user.username,
                    rollNo: user.roll_number,
                    isPresent: user.is_present === 1, // Convert to boolean
                }));

                setAttendence(attendenceData);
                setOriginalAttendence(attendenceData);

                const initiallySelectedRows = attendenceData
                    .filter(row => row.isPresent)
                    .map(row => row.id);
                setSelectedRows(initiallySelectedRows);
                setMarkedStudentIds(initiallySelectedRows);

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

        // Update selected rows based on filtered data
        const selectedRowsInFilteredData = filteredData
            .filter(row => markedStudentIds.includes(row.id))
            .map(row => row.id);
        setSelectedRows(selectedRowsInFilteredData);
        setAttendence(filteredData);
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        filterRows(e.target.value);
    };

    const handleSelectionChange = async (selectionModel: GridRowId[]) => {
        const newlySelectedRows = selectionModel.filter(rowId => !selectedRows.includes(rowId));
        const unselectedRows = selectedRows.filter(rowId => !selectionModel.includes(rowId));

        for (const newlySelectedRowId of newlySelectedRows) {
            const selectedRow = attendence.find(row => row.id === newlySelectedRowId);
            if (selectedRow && !selectedRow.isPresent) {
                await handleMarkCheckbox(newlySelectedRowId);
            } else if (selectedRow && selectedRow.isPresent) {
                await handleUnmarkCheckbox(newlySelectedRowId);
            }
        }

        for (const unselectedRowId of unselectedRows) {
            await handleUnmarkCheckbox(unselectedRowId);
        }

        setSelectedRows(selectionModel);
    };

    const handleMarkCheckbox = async (selectedRowId: GridRowId) => {
        setLoadingRows(prevLoadingRows => [...prevLoadingRows, selectedRowId]);
        const selectedRow = attendence.find(row => row.id === selectedRowId);

        if (selectedRow) {
            const selectedData = {
                userId: selectedRow.id,
            };
            setMarkedStudentIds(prevMarkedStudentIds => [...prevMarkedStudentIds, selectedRowId]);

            try {
                const response = await Request("POST", `/supervisor/attendence-present/${id}`, { student_id: selectedData.userId });
                if (response.status === 200) {
                    // Update the row's isPresent status
                    setAttendence(prevAttendence =>
                        prevAttendence.map(row =>
                            row.id === selectedRowId ? { ...row, isPresent: true } : row
                        )
                    );
                } else {
                    console.error('Failed to update attendence');
                }
            } catch {
                console.log('Failed to connect to server');
            } finally {
                setLoadingRows(prevLoadingRows => prevLoadingRows.filter(rowId => rowId !== selectedRowId));
            }
        }
    };

    const handleUnmarkCheckbox = async (unselectedRowId: GridRowId) => {
        setLoadingRows(prevLoadingRows => [...prevLoadingRows, unselectedRowId]);
        const unselectedRow = attendence.find(row => row.id === unselectedRowId);

        if (unselectedRow) {
            const unselectedData = {
                userId: unselectedRow.id,
                is_Present: 0
            };

            try {
                const response = await Request("POST", `/supervisor/attendence-absent/${id}`, { student_id: unselectedData.userId });
                if (response.status === 200) {
                    // Update the row's isPresent status
                    setAttendence(prevAttendence =>
                        prevAttendence.map(row =>
                            row.id === unselectedRowId ? { ...row, isPresent: false } : row
                        )
                    );
                } else {
                    console.error('Failed to update attendence');
                }
            } catch {
                console.log('Failed to connect to server');
            } finally {
                setLoadingRows(prevLoadingRows => prevLoadingRows.filter(rowId => rowId !== unselectedRowId));
            }

            setMarkedStudentIds(prevMarkedStudentIds => prevMarkedStudentIds.filter(rowId => rowId !== unselectedRowId));
        }
    };

    const CustomCheckbox = (props: any) => {
        const { id } = props;
        const isLoading = loadingRows.includes(id);

        return isLoading ? (
            <CircularProgress size={20} />
        ) : (
            <Checkbox
                checked={selectedRows.includes(id)}
                onChange={() => handleSelectionChange([id])}
                {...props}
            />
        );
    };

    return (
        <Modal isOpen={modalOpen} onClose={handleModalClick} backgroundColor="#efefef">
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
                            components={{
                                BaseCheckbox: CustomCheckbox,
                            }}
                        />
                    </div>
                </div>
            </>
        </Modal>
    );
};

export default AttendenceModal;