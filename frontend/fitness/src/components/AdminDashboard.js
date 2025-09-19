// frontend/src/components/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// --- Stats Cards Component ---
const StatsCards = ({ userCount, classCount }) => (
    <div className="row mb-4">
        <div className="col-md-6">
            <div className="card text-white bg-primary mb-3">
                <div className="card-header">Total Users</div>
                <div className="card-body">
                    <h5 className="card-title display-4">{userCount}</h5>
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="card text-white bg-success mb-3">
                <div className="card-header">Total Classes</div>
                <div className="card-body">
                    <h5 className="card-title display-4">{classCount}</h5>
                </div>
            </div>
        </div>
    </div>
);

// --- User List Component ---
const UserList = ({ users, onDelete }) => (
    <div className="card">
        <div className="card-header"><h3>User Management</h3></div>
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(user._id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// --- Add Class Form Component ---
const AddClassForm = ({ onClassAdded }) => {
    const [formData, setFormData] = useState({ name: '', description: '', category: 'Yoga', schedule: '', duration: 60, price: 20, instructor: '' });
    const [file, setFile] = useState(null);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onFileChange = e => setFile(e.target.files[0]);

    const onSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append('image', file);
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const res = await axios.post('/api/classes', data, config);
            alert('Class added successfully!');
            onClassAdded(res.data);
            setFormData({ name: '', description: '', category: 'Yoga', schedule: '', duration: 60, price: 20, instructor: '' });
            setFile(null);
        } catch (err) {
            console.error(err.response ? err.response.data : err);
            alert('Error adding class.');
        }
    };

    return (
        <div className="card mt-4">
            <div className="card-header"><h3>Add New Class</h3></div>
            <div className="card-body"><form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3"><input type="text" className="form-control" placeholder="Class Name" name="name" value={formData.name} onChange={onChange} required /></div>
                    <div className="col-md-6 mb-3"><input type="text" className="form-control" placeholder="Instructor" name="instructor" value={formData.instructor} onChange={onChange} required /></div>
                </div>
                <div className="mb-3"><textarea className="form-control" placeholder="Description" name="description" value={formData.description} onChange={onChange} required></textarea></div>
                <div className="row">
                    <div className="col-md-6 mb-3"><label>Category</label><select name="category" value={formData.category} onChange={onChange} className="form-select"><option value="Yoga">Yoga</option><option value="Gym">Gym</option><option value="Dance">Dance</option><option value="Zumba">Zumba</option></select></div>
                    <div className="col-md-6 mb-3"><label>Schedule</label><input type="datetime-local" className="form-control" name="schedule" value={formData.schedule} onChange={onChange} required /></div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3"><label>Duration (mins)</label><input type="number" className="form-control" placeholder="60" name="duration" value={formData.duration} onChange={onChange} required /></div>
                    <div className="col-md-6 mb-3"><label>Price ($)</label><input type="number" className="form-control" placeholder="20" name="price" value={formData.price} onChange={onChange} required /></div>
                </div>
                <div className="mb-3"><label>Class Image</label><input type="file" className="form-control" name="image" onChange={onFileChange} /></div>
                <button type="submit" className="btn btn-success w-100">Add Class</button>
            </form></div>
        </div>
    );
};


// --- Class List Admin Component ---
const ClassListAdmin = ({ classes, onEdit, onDelete }) => (
    <div className="card mt-4">
        <div className="card-header"><h3>Class Management</h3></div>
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead><tr><th>Name</th><th>Category</th><th>Instructor</th><th>Schedule</th><th>Actions</th></tr></thead>
                    <tbody>
                        {classes.map(cls => (
                            <tr key={cls._id}>
                                <td>{cls.name}</td>
                                <td>{cls.category}</td>
                                <td>{cls.instructor}</td>
                                <td>{new Date(cls.schedule).toLocaleString()}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => onEdit(cls)}><i className="fas fa-edit"></i></button>
                                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(cls._id)}><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);


// --- Edit Class Modal Component ---
const EditClassModal = ({ show, handleClose, classData, onClassUpdated }) => {
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (classData) {
            const scheduleDate = classData.schedule ? new Date(classData.schedule).toISOString().slice(0, 16) : '';
            setFormData({ ...classData, schedule: scheduleDate });
        }
    }, [classData]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onFileChange = e => setFile(e.target.files[0]);

    const onSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        if (file) data.append('image', file);
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            const res = await axios.put(`/api/classes/${classData._id}`, data);
            onClassUpdated(res.data);
            handleClose();
        } catch (err) {
            alert('Error updating class.');
        }
    };

    if (!show) return null;

    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={onSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Class: {classData.name}</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            {/* Re-using the same detailed form structure */}
                            <div className="row">
                                <div className="col-md-6 mb-3"><input type="text" name="name" value={formData.name || ''} onChange={onChange} className="form-control" /></div>
                                <div className="col-md-6 mb-3"><input type="text" name="instructor" value={formData.instructor || ''} onChange={onChange} className="form-control" /></div>
                            </div>
                            <div className="mb-3"><textarea name="description" value={formData.description || ''} onChange={onChange} className="form-control"></textarea></div>
                            <div className="row">
                                <div className="col-md-6 mb-3"><label>Category</label><select name="category" value={formData.category || 'Yoga'} onChange={onChange} className="form-select"><option value="Yoga">Yoga</option><option value="Gym">Gym</option><option value="Dance">Dance</option><option value="Zumba">Zumba</option></select></div>
                                <div className="col-md-6 mb-3"><label>Schedule</label><input type="datetime-local" name="schedule" value={formData.schedule || ''} onChange={onChange} className="form-control" /></div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3"><label>Duration (mins)</label><input type="number" name="duration" value={formData.duration || 60} onChange={onChange} className="form-control" /></div>
                                <div className="col-md-6 mb-3"><label>Price ($)</label><input type="number" name="price" value={formData.price || 20} onChange={onChange} className="form-control" /></div>
                            </div>
                            <div className="mb-3"><label>New Class Image (Optional)</label><input type="file" name="image" onChange={onFileChange} className="form-control" /></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


// --- Main Admin Dashboard Component ---
function AdminDashboard() {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, classesRes] = await Promise.all([axios.get('/api/users'), axios.get('/api/classes')]);
                setUsers(usersRes.data);
                setClasses(classesRes.data);
            } catch (err) { console.error("Error fetching admin data", err); }
        };
        fetchData();
    }, []);

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`/api/users/${id}`);
                setUsers(users.filter(u => u._id !== id));
            } catch (err) { alert('Error deleting user'); }
        }
    };

    const handleClassAdded = (newClass) => setClasses([...classes, newClass]);

    const handleClassUpdated = (updatedClass) => {
        setClasses(classes.map(cls => (cls._id === updatedClass._id ? updatedClass : cls)));
    };

    const handleDeleteClass = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`/api/classes/${id}`);
                setClasses(classes.filter(cls => cls._id !== id));
            } catch (err) { alert('Error deleting class'); }
        }
    };

    const handleEditClick = (cls) => {
        setSelectedClass(cls);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedClass(null);
    };

    return (
        <div>
            <h2 className="mb-4">Admin Dashboard</h2>
            <div className="alert alert-info">Welcome, {user?.username}!</div>
            <StatsCards userCount={users.length} classCount={classes.length} />
            <UserList users={users} onDelete={handleDeleteUser} />
            <ClassListAdmin classes={classes} onEdit={handleEditClick} onDelete={handleDeleteClass} />
            <AddClassForm onClassAdded={handleClassAdded} />
            <EditClassModal show={showEditModal} handleClose={handleCloseModal} classData={selectedClass} onClassUpdated={handleClassUpdated} />
        </div>
    );
}

export default AdminDashboard;