import GlobalTable from "../../components/ui/globalTable";
import { useEffect, useState } from "react";
import { IconButton, InputBase, Paper, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { OrderModal, OrderUpdate } from "../../components/modal";
import useOrderStore from "../../store/orders";
import Notification from "../../utils/notification";
import Pagination from "@mui/material/Pagination";

const Index = () => {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const { getOrders, data, isLoading, deleteOrder, totalCount } = useOrderStore();
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    name: ""
  });
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };

  const handleInputchange = (e) => {
    console.log(e.target.value);
    setParams({
      ...params,
      name: e.target.value
    })
  }

  const deleteItem = async (id) => {
    const response = await deleteOrder(id);
    if (response.status === 200) {
      Notification({
        title: "Buyurtma muvaffaqiyatli o'chirildi",
        type: "success",
      });
      getOrders(params);
    }
  };

  const editItem = (item) => {
    setModal(true);
    setItem(item);
  };

  const handleClose = () => {
    setModal(false);
    setItem({});
  };

  const handleOpen = () => {
    setModal(true);
  };

  useEffect(() => {
    getOrders(params);
  }, [params, getOrders]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const pageNumber = page ? parseInt(page) : 1;
    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
    }));
  }, [location.search]);

  const headers = [
    { title: "№", value: "index" },
    { title: "Client name", value: "client_name" },
    { title: "Service name", value: "service_name" },
    { title: "Order price", value: "price" },
    { title: "Amount", value: "amount" },
    { title: "Status", value: "status" },
    { title: "Action", value: "action" },
  ];

  return (
    <div>
      <OrderUpdate
        open={modal}
        handleOpen={handleOpen}
        handleClose={handleClose}
        item={item}
      />
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
              onChange={handleInputchange}
              placeholder="Qidiruv"
              inputProps={{ "aria-label": "Search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <OrderModal />
      </div>
      <GlobalTable
        headers={headers}
        body={data}
        isLoading={isLoading}
        editItem={editItem}
        deleteItem={deleteItem}
      />
      <Stack spacing={2}>
        <Pagination count={totalCount} page={page} onChange={handleChange} />
      </Stack>
    </div>
  );
};

export default Index;
