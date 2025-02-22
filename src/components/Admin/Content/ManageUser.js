import ModalUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { useEffect, useState } from "react";
import { getAllUser, deleteUser } from "../../../services/apiServices";
import ModalDelete from "./ModalDelete";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import TableUser from "./TableUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ReactPaginate from "react-paginate";

const ManageUser = (props) => {
  const [showModalUser, setShowModalUser] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [dataDeleteUser, setDataDeleteUser] = useState({});
  const [dataUpdateUser, setDataUpdateUser] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);
  const fetchUsers = async () => {
    let res = await getAllUser(currentPage, currentLimit);
    if (res && res.EC === 0) {
      setTotalPage(res.DT.totalPages);
      setListUser(res.DT.users);
    }
  };
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };
  const handleUpdateUser = (user) => {
    setIsShowModalUpdate(true);
    setDataUpdateUser(user);
  };
  const resetUpdateData = () => {
    setDataUpdateUser({});
  };
  const handleDeleteUser = async (user) => {
    setIsShowModalDelete(true);
    setDataDeleteUser(user);
  };
  const handleClose = () => {
    setIsShowModalDelete(false);
  };
  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataDeleteUser.id);
    if (res && res.EC === 0) {
      <Link to="/manage-users" />;
      setIsShowModalDelete(false);
      toast.success(res.EM);
      await fetchUsers();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalUser(true)}
          >
            Add new user
          </button>
        </div>
        <div className="table-users-container">
          <TableUser
            listUser={listUser}
            handleDeleteUser={handleDeleteUser}
            handleUpdateUser={handleUpdateUser}
          />
          {totalPage > 0 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
        <ModalUser
          show={showModalUser}
          setShow={setShowModalUser}
          fetchUsers={fetchUsers}
        />
        <ModalUpdateUser
          show={isShowModalUpdate}
          setShow={setIsShowModalUpdate}
          dataUpdateUser={dataUpdateUser}
          fetchUsers={fetchUsers}
          resetUpdateData={resetUpdateData}
        />
        <ModalDelete
          show={isShowModalDelete}
          handleClose={handleClose}
          confirmDeleteUser={confirmDeleteUser}
          dataDeleteUser={dataDeleteUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
