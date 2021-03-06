import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchposts } from "../../Redux/Posts/actions";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { totalPages } = useSelector((state) => state.posts);

  React.useEffect(() => {
    if (page) {
      dispatch(fetchposts(page));
    }
  }, [page, dispatch]);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={totalPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { getPosts } from '../actions/posts';

// const Paginate = ({ page }) => {
//   const { numberOfPages } = useSelector((state) => state.posts);
//   const dispatch = useDispatch();

//   const classes = useStyles();

//   useEffect(() => {
//     if (page) {
//       dispatch(getPosts(page));
//     }
//   }, [dispatch, page]);

// };
