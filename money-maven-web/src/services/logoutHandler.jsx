import { confirmAlert } from "react-confirm-alert";
import { Button } from 'react-bootstrap';

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
          <Button
            variant='secondary'
            onClick={() => {
              handleLogout();
              onClose();
            }}
          >
            Yes
          </Button>
          <Button onClick={onClose} variant='secondary'>No</Button>
        </div>
      );
    },
  });
};
