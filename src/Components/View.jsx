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

export default function UserTable() {
  const [userList, setUserList] = React.useState([]);
  const [editIndex, setEditIndex] = React.useState(null);
  const [editUser, setEditUser] = React.useState({
    username: '',
    email: '',
    age: '',
    dob: ''
  });
  const [open, setOpen] = React.useState(false);

  // 🔹 Load user details from localStorage when component mounts
  React.useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('UserDetailsList')) || [];
    setUserList(storedUsers);
  }, []);

  // 🗑️ Delete user
  const handleDelete = (index) => {
    swal
      .fire({
        title: 'Are you sure?',
        text: "You want to delete this user?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
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

  // ✏️ Open edit dialog
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditUser(userList[index]);
    setOpen(true);
  };

  // 🧾 Handle input changes in edit dialog
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  // 💾 Save edited user
  const handleSaveEdit = () => {
    const updatedList = [...userList];
    updatedList[editIndex] = editUser;
    setUserList(updatedList);
    localStorage.setItem('UserDetailsList', JSON.stringify(updatedList));
    setOpen(false);
    swal.fire('Updated!', 'User details have been updated.', 'success');
  };

  return (
    <Container>
      <Card style={{ marginTop: "50px", padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>Stored User Details</h2>

        {userList.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No user data found.
          </p>
        ) : (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Username</strong></TableCell>
                  <TableCell align="right"><strong>Email</strong></TableCell>
                  <TableCell align="right"><strong>Age</strong></TableCell>
                  <TableCell align="right"><strong>DOB</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.username}
                    </TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.age}</TableCell>
                    <TableCell align="right">{user.dob}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(index)}
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
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

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/">
            <button className="btn btn-primary">Back to Form</button>
          </Link>
        </div>
      </Card>

      {/* ✏️ Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            name="username"
            value={editUser.username}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={editUser.email}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Age"
            name="age"
            type="number"
            value={editUser.age}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="DOB"
            name="dob"
            type="date"
            value={editUser.dob}
            onChange={handleEditChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
