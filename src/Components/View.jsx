import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, Container } from 'react-bootstrap';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import { useState } from 'react';

export default function UserTable() {
  const [userList, setUserList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editUser, setEditUser] = useState({
    username: '',
    email: '',
    age: '',
    dob: ''
  });
  const [open, setOpen] = React.useState(false);

  // Load from localStorage
  React.useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('UserDetailsList')) || [];
    setUserList(storedUsers);
  }, []);

  const handleDelete = (index) => {
    swal
      .fire({
        title: 'Are you sure?',
        text: "You want to delete this user?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      })
      .then((result) => {
        if (result.isConfirmed) {
          const updatedList = userList.filter((_, i) => i !== index);
          setUserList(updatedList);
          localStorage.setItem('UserDetailsList', JSON.stringify(updatedList));
          swal.fire('Deleted!', 'User has been removed.', 'success');
        }
      });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditUser(userList[index]);
    setOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    const updatedList = [...userList];
    updatedList[editIndex] = editUser;
    setUserList(updatedList);
    localStorage.setItem('UserDetailsList', JSON.stringify(updatedList));
    swal.fire('Updated!', 'User details updated.', 'success');
    setOpen(false);
  };

  return (
    <Container style={{ maxWidth: "1000px" }}>
      <Card style={{ marginTop: "40px", padding: "25px" }}>
        <h2 style={{ textAlign: "center", fontWeight: "600" }}>
          Stored User Details
        </h2>

        {userList.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>No user data found.</p>
        ) : (
          <TableContainer component={Paper} sx={{ marginTop: 3 }}>
            <Table aria-label="user table" sx={{ minWidth: 400, overflowX: "auto" }}>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Username</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Age</strong></TableCell>
                  <TableCell><strong>DOB</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {userList.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{user.dob}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleEdit(index)}
                        sx={{ marginRight: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Back button */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/">
            <button className="btn btn-success" style={{ padding: "8px 20px" }}>
              Back to Form
            </button>
          </Link>
        </div>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <TextField label="Username" name="username" value={editUser.username} onChange={handleEditChange} fullWidth margin="dense" />
          <TextField label="Email" name="email" value={editUser.email} onChange={handleEditChange} fullWidth margin="dense" />
          <TextField label="Age" name="age" type="number" value={editUser.age} onChange={handleEditChange} fullWidth margin="dense" />
          <TextField label="DOB" name="dob" type="date" value={editUser.dob} onChange={handleEditChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
