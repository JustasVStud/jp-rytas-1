import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import AuthService from "./Auth.service";

export let logoutHandler = (navigate) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="react-confirm-alert-body">
          <h1>Are you sure?</h1>
          <p>{`Do you really want to logout ?`}</p>
          <Button
            variant="secondary"
            onClick={() => {
              AuthService.logout();
              onClose();
              navigate('/login');
            }}
          >
            Yes
          </Button>
          <Button onClick={onClose} variant="secondary">
            No
          </Button>
        </div>
      );
    },
  });
};
