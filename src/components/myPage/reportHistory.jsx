import React, { useEffect, useState } from 'react';
import styles from '@/styles/myPage/interviewHistory.module.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useStores } from '@/contexts/storeContext';
import { observer } from 'mobx-react-lite';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderTop: '2px solid #aaaaaa',
    borderBottom: '2px solid #dddddd',
    whiteSpace: 'nowrap',          // 텍스트를 한 줄로 유지
    overflow: 'hidden',            // 넘치는 부분을 숨김
    textOverflow: 'ellipsis',      // 넘치는 텍스트를 '...'로 표시

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#eeeeee',
        color: theme.palette.common.black,
        textAlign: 'center',
        borderBottom: '2px solid #aaaaaa',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'center',
        height: 65,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const rows = [
    { no: 1, reportCode: 'A23A4', title: '제목1', date: '2024-01-01', status: '검토중', answerDate: '-', detail: <ManageSearchIcon />, url: '1111' },
    { no: 2, reportCode: 'A23A4', title: '제목2', date: '2024-01-01', status: '처리완료', answerDate: '2024-01-02', detail: <ManageSearchIcon />, url: '2222' },
    { no: 3, reportCode: 'A23A4', title: '제목3', date: '2024-01-01', status: '검토중', answerDate: '-', detail: <ManageSearchIcon />, url: '3333' },
    { no: 4, reportCode: 'A23A4', title: '제목4', date: '2024-01-01', status: '검토중', answerDate: '-', detail: <ManageSearchIcon />, url: '3333' },
    { no: 5, reportCode: 'A23A4', title: '제목5', date: '2024-01-01', status: '검토중', answerDate: '-', detail: <ManageSearchIcon />, url: '3333' }
];


const ReportHistory = observer(() => {
    const { userStore } = useStores();

    const [reportPosts, setReportPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // 페이지당 항목 수

    useEffect(() => {
        getReportPosts();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const formattedTime = date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
        });
        return `${formattedDate} ${formattedTime}`;
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleRowClick = (url) => {
        if (typeof window !== 'undefined') {
            window.location.href = url; // 클릭한 행의 링크로 이동
        }
    };

    const getReportPosts = async () => {
        try {
            const userId = userStore.id;
            const response = await axios.get('http://localhost:8080/api/adminreported/reportedposts');
            const filteredPosts = response.data.filter(post => post.reporterId == userId);
            // 내림차순 정렬 (최신 글이 위로)
            const sortedReportPosts = filteredPosts.sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt));
            setReportPosts(sortedReportPosts);
        } catch (error) {
            console.error('신고한 게시글 불러오기 중 에러 발생:', error);
        }
    };

    return (
        <section className={styles.formContact}>
            <h1 className={styles.formTitle}>신고 내역</h1>


            <div className={styles.interviewContent}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700, tableLayout: 'fixed' }} aria-label="customized table"> {/* table-layout: fixed 설정 */}
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{ width: '90px' }}>번호</StyledTableCell>
                                <StyledTableCell sx={{ width: '150px' }}>제목</StyledTableCell>
                                <StyledTableCell sx={{ width: '200px' }}>내용</StyledTableCell>
                                <StyledTableCell sx={{ width: '120px' }}>신고사유</StyledTableCell>
                                <StyledTableCell sx={{ width: '100px' }}>처리상태</StyledTableCell>
                                <StyledTableCell sx={{ width: '180px' }}>신고날짜</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportPosts.map((post) => (
                                <StyledTableRow key={post.reportId}>
                                    <StyledTableCell sx={{ width: '90px' }}>{post.reportId}</StyledTableCell>
                                    <StyledTableCell sx={{ width: '150px' }}>{post.title}</StyledTableCell>
                                    <StyledTableCell sx={{ width: '200px' }}>{post.content}</StyledTableCell>
                                    <StyledTableCell sx={{ width: '120px' }}>{post.reason}</StyledTableCell>
                                    <StyledTableCell sx={{ width: '100px' }}>{post.status == 'PENDING' ? '검토중' : '신고완료'}</StyledTableCell>
                                    <StyledTableCell sx={{ width: '180px' }}>{formatDate(post.reportedAt)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </section>



    );
});

export default ReportHistory;
