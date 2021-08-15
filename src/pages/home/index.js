import "../../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/card";
import ReactPaginate from "react-paginate";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../assects/img/logo.png";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Home = () => {
  const [cardData, setCardData] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const loadData = async () => {
    const breakingbad = await axios(
      `https://www.breakingbadapi.com/api/characters?name=${search}`
    );
    setCardData(breakingbad.data);
    setPagination(breakingbad.data.slice(0, 10));
    setLoader(false);
  };
  useEffect(() => {
    setLoader(true);
    loadData();
  }, [search]);

  const handlePageClick = (data) => {
    const { selected } = data;
    let pagenationData = cardData.slice(selected * 10, (selected + 1) * 10);
    setPagination(pagenationData);
  };

  const handleCloseLoader = () => {
    setLoader(false);
  };

  const handleChange = event => {
    setSearch(event.target.value)
  }

  const showLoading = () =>
    loader && (
      <Backdrop
        open={loader}
        className={classes.backdrop}
        onClick={handleCloseLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <>
      {showLoading()}
      <div className="App-header">
        <img src={Logo} alt="" width="100" height="100" />
        <form class="example" action="/action_page.php">
          <input type="text" placeholder="Search.." autoComplete="off" onChange={handleChange} name="search" />
        </form>
      </div>
      <div class="card-container">
        <div className="card-grid">
          {pagination.map((item, i) => {
            return <Card details={item} key={i} />;
          })}
        </div>
        <ReactPaginate
          pageCount={Math.ceil(cardData.length / 10)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
        />
      </div>
    </>
  );
}

export default Home;
