
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import React, {useEffect,useState} from 'react'
import axios from 'axios'
import Paginator from "react-hooks-paginator"
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
        display: 'flex'
    },
    pagination: {
        marginLeft: 'auto',
        marginBottom: '2%'
    }
}));

function Paginations({ totalPages }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0)
    useEffect( async() => {
      setLoading(true);
        await axios.get('http://localhost:8080/board/blogAll', ).then(response=>{
        setPosts(response.data);
        setLoading(false);
      });
      
    },[]);
    const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }
    const classes = useStyles();

    const paginationHandler = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <MemoryRouter initialEntries={['/log']} initialIndex={0}>
            <Route>
                {({ location }) => {
                    const query = new URLSearchParams(location.search);
                    const page = parseInt(query.get('page') || '1', 10);
                    return (
                        <div className={classes.root}>
                            <Paginator
                                 totalRecords={posts.length}
                                 pageLimit={postsPerPage}
                                pageNeighbours={2}
                                setOffset={setOffset}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                pageContainerClass="mb-0 mt-0"
                                pagePrevText="«"
                                pageNextText="»"
                                renderItem={(item) => (
                                    <PaginationItem
                                        component={Link}
                                        to={`/log${item.page === 1 ? '' : `?page=${item.page}`}`}
                                        {...item}
                                    />
                                )}
                            />
                        </div>
                    );
                }}
            </Route>
        </MemoryRouter >
    )
}

export default Paginations;