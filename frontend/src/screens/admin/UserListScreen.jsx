import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserListScreen = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [deleteUser, { isLoading: loaderDelete }] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete the user')) {
            try {
                await deleteUser(id);
                toast.success("User deleted");
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <>
            <h1>Users</h1>
            {loaderDelete && <Loader />}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailTo:${user.email}`}>{user.email}</a></td>
                                <td>
                                    {user.isAdmin ? (
                                        <FaCheck style={{ color: 'green' }} />
                                    ) : (
                                        <FaTimes style={{ color: 'red' }} />
                                    )}
                                </td>
                                <td>
                                    <Button as={Link} to={`/admin/user/${user._id}/edit`} variant='light' className='btn-sm'>
                                        <FaEdit />
                                    </Button>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                                        <FaTrash style={{ color: "white" }} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen;