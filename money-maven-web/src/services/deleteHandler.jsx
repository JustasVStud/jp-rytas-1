import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";

export let deleteHandler = (item, deleteFunction) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="react-confirm-alert-body">
          <h1>Are you sure?</h1>
          <p>{`Do you want to delete ${item.type}: ${item.value} ?`}</p>
          <Button
            variant="secondary"
            onClick={() => {
              deleteFunction(item.id);
              onClose();
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
