import { confirmAlert } from "react-confirm-alert";

export const logoutHandler = (logout, navigate) => {
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="react-confirm-alert-body">
          <h1>Are you sure?</h1>
          <p>Do you really want to logout?</p>
          <button
            onClick={() => {
              handleLogout();
              onClose();
            }}
          >
            Yes
          </button>
          <button onClick={onClose}>No</button>
        </div>
      );
    },
  });
};
