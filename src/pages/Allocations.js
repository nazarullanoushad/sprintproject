import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const Allocations = () => {
  const url = "https://run.mocky.io/v3/36a41f98-356e-4182-aab1-775429653f4f";
  const [allocationList, setAllocationList] = useState([]);
  const [allocationModal, setAllocationModal] = useState({});
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [alert, setAlert] = useState(false);
console.log(allocationModal)
  useEffect(() => {
    axios.get(url).then((response) => {
      setAllocationList(response.data);
    });
  }, [url]);

  const addOrEdit = () => {
    if (!isEdit) {
      setAllocationList((prev) => {
        return [...prev, { ...allocationModal, id: Date.now() }];
      });
    } else {
      const index = allocationList.findIndex(
        (allocation) => allocation.id === allocationModal.id
      );
      setAllocationList((prev) => {
        return [
          ...prev.slice(0, index),
          { ...allocationModal },
          ...prev.slice(index + 1),
        ];
      });
    }

    setShow(false);
    setAllocationModal({});
  };

  const project = [
    {
      label: "Delpheon",
      value: "1",
    },
    {
      label: "Delpheon cloud",
      value: "2",
    },
    {
      label: "Railway",
      value: "3",
    }
  ];


  const team = [
    {
      label: "frontend",
      value: "1",
    },
    {
      label: "backend",
      value: "2",
    },
    {
      label: "testing",
      value: "3",
    }
  ];

  const employee = [
    {
      label: "Neha",
      value: "G123",
    },
    {
      label: "Nasrulla",
      value: "G212",
    },
    {
      label: "Dathan",
      value: "G323",
    }
  ];


  const deleteOneAllocation = (allocationModal) => {
    const index = allocationList.findIndex(
      (allocation) => allocation.id === allocationModal.id
    );
    setAllocationList((prev) => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
    setAlert(false);
    setAllocationModal({});
  };

  const showHideModal = (status) => {
    setShow(status);
    if (!status) setAllocationModal({});
    setIsEdit(false);
  };

  const showConfirmModel = (status) => {
    setAlert(status);
  };

  const editview = (currentProject) => {
    setAllocationModal({ ...currentProject });
    showHideModal(true);
    setIsEdit(true);
  };

  const deleteAllocation = (currentAllocation) => {
    setAllocationModal({ ...currentAllocation });
    showConfirmModel(true);
  };

  const handleChange = ({ target: { name, value } }) => {
    setAllocationModal((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div>
      <table className="table">
        <tr>
          <th>id</th>
          <th>EmployeeId</th>
          <th>TeamId</th>
          <th>ProjectId</th>
          <th>Role</th>
          <th>Hours</th>

          <th>Actions</th>
        </tr>
        {allocationList?.map((allocation) => {
          return (
            <tr key={allocation.id}>
              <td>{allocation.id}</td>
              <td> {allocation.employee}</td>
              <td> {allocation.team}</td>
              <td> {allocation.project}</td>
              <td> {allocation.role}</td>
              <td> {allocation.hoursperday}</td>

              <td>
                <span>
                  <button
                    className="xx"
                    onClick={() => {
                      editview(allocation);
                    }}
                  >
                    <EditOutlined />
                  </button>
                </span>
                {
                  <span>
                    <button
                      className="xx"
                      onClick={() => {
                        deleteAllocation(allocation);
                      }}
                    >
                      {" "}
                      <DeleteOutlined />
                    </button>
                  </span>
                }
              </td>
            </tr>
          );
        })}
      </table>

      <Button className="primary" onClick={() => showHideModal(true)}>
        Add
      </Button>

      <Modal show={show} onHide={() => showHideModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Allocations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Role</Form.Label>
              <input
                name="role"
                value={allocationModal.role || " "}
                onChange={handleChange}
              ></input>
              <br></br>
              <Form.Label>Hoursperday</Form.Label>
              <input
                name="hoursperday"
                value={allocationModal.hoursperday || " "}
                onChange={handleChange}
              ></input>
              <br></br>

              <Form.Label>employee</Form.Label>
            
    <select
                class="custom-select"
                id="inputGroupSelect04"
                onChange={handleChange}
                value={allocationModal?.employee}
                name="employee"
              >
                <option selected>Choose...</option>
                {employee.map((employee) => (
                  <option
                    key={employee.label}
                    id={employee.value}
                    value={employee.value}
                  >
                    {employee.label}
                  </option>
                ))}
              </select>



              <br></br>

              <Form.Label>Team</Form.Label>
              
              <select
                class="custom-select"
                id="inputGroupSelect04"
                onChange={handleChange}
                value={allocationModal?.team}
                name="team"
              >
                <option selected>Choose...</option>
                {team.map((team) => (
                  <option
                    key={team.label}
                    id={team.value}
                    value={team.value}
                  >
                    {team.label}
                  </option>
                ))}
              </select>

              <br></br>

              <Form.Label>Project</Form.Label>
              
              <select
                class="custom-select"
                id="inputGroupSelect04"
                onChange={handleChange}
                value={allocationModal?.project}
                name="project"
              >
                <option selected>Choose...</option>
                {project.map((project) => (
                  <option
                    key={project.label}
                    id={project.value}
                    value={project.value}
                  >
                    {project.label}
                  </option>
                ))}
              </select>

              <br></br>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => showHideModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addOrEdit(allocationModal);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={alert} onHide={() => showConfirmModel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Allocation?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <h1>Do you really want to delete?</h1>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="secondary"
            onClick={() => deleteOneAllocation(allocationModal)}
          >
            yes
          </Button>
          <Button className="secondary" onClick={() => showConfirmModel(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Allocations;
