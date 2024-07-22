import GlobalTable from "../../components/ui/globalTable";
import { useEffect, useState } from "react";
import { Button, IconButton, InputBase, Paper, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "../../components/modal/services";
import useServiceStore from "../../store/services";
import Notification from "../../utils/notification";
import Pagination from "@mui/material/Pagination";

const Index = () => {
  const { getData, data, isLoading, deleteData, totalPages } = useServiceStore();
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });

  const handleChange = (event, value) => {
    setParams((prev) => ({ ...prev, page: value }));
  };

  useEffect(() => {
    getData(params);
  }, [params, getData]);

  data?.forEach((item, index) => {
    item.index = params.page * params.limit - (params.limit - 1) + index;
  });

  const headers = [
    { title: "№", value: "index" },
    { title: "Service name", value: "name" },
    { title: "Service price", value: "price" },
    { title: "Action", value: "action" },
  ];

  const editItem = (item) => {
    setModal(true);
    setItem(item);
  };

  const handleClose = () => {
    setModal(false);
    setItem({});
  };

  const deleteItem = async (id) => {
    const status = await deleteData(id);
    if (status === 200) {
      Notification({
        title: "deleted service successfully",
        type: "success",
      });
      getData(params); 
    } else {
      Notification({
        title: "Failed to delete service",
        type: "error",
      });
    }
  };

  return (
    <div>
      {modal && <Modal open={modal} handleClose={handleClose} item={item} />}
      <div className="py-3 flex justify-between items-center">
        <div className="w-96">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "400",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "Search google maps" }}
            />
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <Button variant="contained" color="primary" onClick={() => setModal(true)}>
          Add new service
        </Button>
      </div>
      <GlobalTable
        headers={headers}
        body={data}
        isLoading={isLoading}
        editItem={editItem}
        deleteItem={deleteItem}
      />
      <Stack spacing={2}>
        <Pagination count={totalPages} page={params.page} onChange={handleChange} />
      </Stack>
    </div>
  );
};

export default Index;

