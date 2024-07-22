import GlobalTable from "../../components/ui/globalTable";
import { useEffect, useState } from "react";
import { IconButton, InputBase, Paper, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { OrderModal } from "../../components/modal";
import useClientsStore from "../../store/clients";
import Notification from "../../utils/notification";
import Pagination from "@mui/material/Pagination";

const Index = () => {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const { getClient, client, isLoading, deleteClient, totalCount } = useClientsStore();
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };

  const deleteItem = async (client_id, owner_id) => {
    const responseStatus = await deleteClient(client_id, owner_id);
    if (responseStatus === 200) {
      Notification({
        title: "Mijoz muvaffaqiyatli o'chirildi",
        type: "success",
      });
    } else {
      Notification({
        title: "Mijoz o'chirilmadi",
        type: "error",
      });
    }
  };



  useEffect(() => {
    getClient(params);
  }, [params, getClient]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const pageNumber = page ? parseInt(page) : 1;
    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
    }));
  }, [location.search]);

  const changePage = (value) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };

  const headers = [
    { title: "№", value: "index" },
    { title: "Client name", value: "full_name" },
    { title: "Created-at", value: "created_at" },
    { title: "Phone", value: "phone_number" },
    { title: "Action", value: "action" },
  ];

  return (
    <div>
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
        body={client}
        isLoading={isLoading}
        deleteItem={(id) => deleteItem(id,)}
      />
      <Stack spacing={2}>
        <Pagination count={totalCount} page={page} onChange={handleChange} />
      </Stack>
    </div>
  );
};

export default Index;

