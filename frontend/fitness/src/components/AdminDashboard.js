import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import formatDate from '../utils/formatDate';

// --- Stats Cards Component ---
const StatsCards = ({ userCount, classCount }) => (
    <div className="row mb-4">
        <div className="col-md-6">
            <div className="card text-white bg-primary mb-3">
                <div className="card-header">Total Users</div>
                <div className="card-body"><h5 className="card-title display-4">{userCount}</h5></div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="card text-white bg-success mb-3">
                <div className="card-header">Total Classes</div>
                <div className="card-body"><h5 className="card-title display-4">{classCount}</h5></div>
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
                    <thead><tr><th>Username</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><button className="btn btn-danger btn-sm" onClick={() => onDelete(user._id)}><i className="fas fa-trash"></i></button></td>
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
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState({ 
        name: '', 
        description: '', 
        category: 'Yoga', 
        schedule: '', 
        duration: 60, 
        price: 0, 
        instructor: '', 
        capacity: 15,
        durationType: 'singleDay', 
        durationText: '',
        priceMonthly: 0,
        priceQuarterly: 0,
        priceAnnually: 0,
    });
    const [file, setFile] = useState(null);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onFileChange = e => setFile(e.target.files[0]);

    const onSubmit = async e => {
        e.preventDefault();
        
        const submissionData = {
            name: formData.name,
            description: formData.description,
            category: formData.category,
            instructor: formData.instructor,
            capacity: formData.capacity,
            durationType: formData.durationType,
        };

        if (formData.durationType === 'singleDay') {
            submissionData.schedule = formData.schedule;
            submissionData.duration = formData.duration;
            submissionData.price = formData.price;
        } else {
            submissionData.durationText = formData.durationText;
            submissionData.priceMonthly = formData.priceMonthly;
            submissionData.priceQuarterly = formData.priceQuarterly;
            submissionData.priceAnnually = formData.priceAnnually;
            submissionData.price = formData.priceMonthly; 
        }

        const data = new FormData();
        if (file) {
            data.append('image', file);
        }
        for (const key in submissionData) {
            data.append(key, submissionData[key]);
        }

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const res = await axios.post('/api/classes', data, config);
            showNotification('Class added successfully!');
            onClassAdded(res.data);
            setFormData({ name: '', description: '', category: 'Yoga', schedule: '', duration: 60, price: 0, instructor: '', capacity: 15, durationType: 'singleDay', durationText: '', priceMonthly: 0, priceQuarterly: 0, priceAnnually: 0 });
            setFile(null);
            e.target.reset();
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error adding class.';
            showNotification(errorMsg, 'error');
        }
    };

    return (
        <div className="card mt-4">
            <div className="card-header"><h3>Add New Class</h3></div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3"><input type="text" className="form-control" placeholder="Class Name" name="name" value={formData.name} onChange={onChange} required /></div>
                        <div className="col-md-6 mb-3"><input type="text" className="form-control" placeholder="Instructor" name="instructor" value={formData.instructor} onChange={onChange} required /></div>
                    </div>
                    <div className="mb-3"><textarea className="form-control" placeholder="Description" name="description" value={formData.description} onChange={onChange} required></textarea></div>
                    
                    <div className="mb-3">
                        <label className="form-label">Class Duration Type</label>
                        <div className="form-check"><input className="form-check-input" type="radio" name="durationType" id="singleDay" value="singleDay" checked={formData.durationType === 'singleDay'} onChange={onChange} /><label className="form-check-label" htmlFor="singleDay">Single Day Session</label></div>
                        <div className="form-check"><input className="form-check-input" type="radio" name="durationType" id="multiDay" value="multiDay" checked={formData.durationType === 'multiDay'} onChange={onChange} /><label className="form-check-label" htmlFor="multiDay">Multi-Day Program</label></div>
                    </div>

                    {formData.durationType === 'singleDay' ? (
                        <>
                            <div className="row">
                                <div className="col-md-6 mb-3"><label>Schedule</label><input type="datetime-local" className="form-control" name="schedule" value={formData.schedule} onChange={onChange} required={formData.durationType === 'singleDay'} /></div>
                                <div className="col-md-6 mb-3"><label>Duration (mins)</label><input type="number" className="form-control" name="duration" value={formData.duration} onChange={onChange} required={formData.durationType === 'singleDay'} /></div>
                            </div>
                            <div className="mb-3"><label>Price (₹)</label><input type="number" className="form-control" name="price" value={formData.price} onChange={onChange} required /></div>
                        </>
                    ) : (
                        <>
                            <div className="mb-3"><label>Program Details (e.g., schedule)</label><input type="text" className="form-control" placeholder="e.g., 'Open Access Membership'" name="durationText" value={formData.durationText} onChange={onChange} required={formData.durationType === 'multiDay'} /></div>
                            <div className="row">
                                <div className="col-md-4 mb-3"><label>Monthly Price (₹)</label><input type="number" className="form-control" name="priceMonthly" value={formData.priceMonthly} onChange={onChange} required /></div>
                                <div className="col-md-4 mb-3"><label>Quarterly Price (₹)</label><input type="number" className="form-control" name="priceQuarterly" value={formData.priceQuarterly} onChange={onChange} required /></div>
                                <div className="col-md-4 mb-3"><label>Annually Price (₹)</label><input type="number" className="form-control" name="priceAnnually" value={formData.priceAnnually} onChange={onChange} required /></div>
                            </div>
                        </>
                    )}
                    
                    <div className="row">
                        <div className="col-md-6 mb-3"><label>Category</label><select name="category" value={formData.category} onChange={onChange} className="form-select"><option value="Yoga">Yoga</option><option value="Gym">Gym</option><option value="Dance">Dance</option><option value="Zumba">Zumba</option></select></div>
                        <div className="col-md-6 mb-3"><label>Capacity (Total Slots)</label><input type="number" className="form-control" name="capacity" value={formData.capacity} onChange={onChange} required /></div>
                    </div>
                    <div className="mb-3"><label>Class Image</label><input type="file" className="form-control" name="image" onChange={onFileChange} /></div>
                    <button type="submit" className="btn btn-success w-100">Add Class</button>
                </form>
            </div>
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
                                <td>{cls.schedule ? new Date(cls.schedule).toLocaleString() : cls.durationText}</td>
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
    const { showNotification } = useNotification();
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
            showNotification('Class updated successfully!');
            onClassUpdated(res.data);
            handleClose();
        } catch (err) {
            showNotification('Error updating class.', 'error');
        }
    };

    if (!show) return null;

    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={onSubmit}>
                        <div className="modal-header"><h5 className="modal-title">Edit Class: {classData.name}</h5><button type="button" className="btn-close" onClick={handleClose}></button></div>
                        <div className="modal-body">
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
                                <div className="col-md-4 mb-3"><label>Duration (mins)</label><input type="number" name="duration" value={formData.duration || 60} onChange={onChange} className="form-control" /></div>
                                <div className="col-md-4 mb-3"><label>Price (₹)</label><input type="number" name="price" value={formData.price || 0} onChange={onChange} className="form-control" /></div>
                                <div className="col-md-4 mb-3"><label>Capacity</label><input type="number" name="capacity" value={formData.capacity || 15} onChange={onChange} className="form-control" /></div>
                            </div>
                             <div className="row">
                                <div className="col-md-4 mb-3"><label>Monthly Price (₹)</label><input type="number" name="priceMonthly" value={formData.priceMonthly || 0} onChange={onChange} className="form-control" /></div>
                                <div className="col-md-4 mb-3"><label>Quarterly Price (₹)</label><input type="number" name="priceQuarterly" value={formData.priceQuarterly || 0} onChange={onChange} className="form-control" /></div>
                                <div className="col-md-4 mb-3"><label>Annually Price (₹)</label><input type="number" name="priceAnnually" value={formData.priceAnnually || 0} onChange={onChange} className="form-control" /></div>
                            </div>
                            <div className="mb-3"><label>New Class Image (Optional)</label><input type="file" name="image" onChange={onFileChange} className="form-control" /></div>
                        </div>
                        <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button><button type="submit" className="btn btn-primary">Save Changes</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- Admin's Personal Bookings Component ---
const AdminBookings = ({ bookings }) => (
    <div className="card mt-4">
        <div className="card-header"><h3>My Personal Bookings</h3></div>
        <div className="card-body">
            {bookings.length > 0 ? (
                <ul className="list-group">
                    {bookings.map(b => (
                        <li key={b._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>{b.fitnessClass?.name || 'Class not found'}</strong>
                            <span>{b.fitnessClass?.schedule ? formatDate(b.fitnessClass.schedule) : 'N/A'}</span>
                        </li>
                    ))}
                </ul>
            ) : <p>You haven't personally booked any classes.</p>}
        </div>
    </div>
);

// --- Enrollment Viewer Component ---
const EnrollmentViewer = ({ classes }) => {
    const [selectedClass, setSelectedClass] = useState('');
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClassSelect = async (classId) => {
        if (!classId) {
            setEnrollments([]);
            setSelectedClass('');
            return;
        }
        setSelectedClass(classId);
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/bookings/${classId}/enrollments`);
            setEnrollments(data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch enrollments', err);
            setLoading(false);
        }
    };

    return (
        <div className="card mt-4">
            <div className="card-header"><h3>View Class Enrollments</h3></div>
            <div className="card-body">
                <select className="form-select mb-3" value={selectedClass} onChange={(e) => handleClassSelect(e.target.value)}>
                    <option value="">-- Select a Class to View Enrollments --</option>
                    {classes.map(cls => (
                        <option key={cls._id} value={cls._id}>{cls.name} - {cls.schedule ? formatDate(cls.schedule) : cls.durationText}</option>
                    ))}
                </select>
                {loading ? <p>Loading enrollments...</p> : (
                    enrollments.length > 0 ? (
                        <ul className="list-group">
                            {enrollments.map(e => (
                                <li key={e._id} className="list-group-item">{e.user?.username || 'User not found'} ({e.user?.email || 'N/A'})</li>
                            ))}
                        </ul>
                    ) : (selectedClass && <p>No users are enrolled in this class yet.</p>)
                )}
            </div>
        </div>
    );
};


// --- Main Admin Dashboard Component ---
function AdminDashboard() {
    const { user } = useAuth();
    const { showNotification } = useNotification();
    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [adminBookings, setAdminBookings] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, classesRes, bookingsRes] = await Promise.all([ axios.get('/api/users'), axios.get('/api/classes'), axios.get('/api/bookings/mybookings') ]);
                setUsers(usersRes.data);
                setClasses(classesRes.data);
                setAdminBookings(bookingsRes.data);
            } catch (err) { 
                console.error("Error fetching admin data", err);
                showNotification('Failed to load dashboard data.', 'error');
            }
        };
        fetchData();
    }, []);

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user? This cannot be undone.')) {
            try {
                await axios.delete(`/api/users/${id}`);
                setUsers(users.filter(u => u._id !== id));
                showNotification('User deleted successfully!');
            } catch (err) { 
                showNotification('Error deleting user.', 'error');
            }
        }
    };

    const handleClassAdded = (newClass) => {
        setClasses([...classes, newClass]);
    };

    const handleClassUpdated = (updatedClass) => {
        setClasses(classes.map(cls => (cls._id === updatedClass._id ? updatedClass : cls)));
    };

    const handleDeleteClass = async (id) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            try {
                await axios.delete(`/api/classes/${id}`);
                setClasses(classes.filter(cls => cls._id !== id));
                showNotification('Class deleted successfully!');
            } catch (err) { 
                showNotification('Error deleting class.', 'error'); 
            }
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
            <div className="alert alert-info">Welcome, {user?.username}! Manage your site from here.</div>
            
            <StatsCards userCount={users.length} classCount={classes.length} />
            <AdminBookings bookings={adminBookings} />
            <EnrollmentViewer classes={classes} />
            <UserList users={users} onDelete={handleDeleteUser} />
            <ClassListAdmin classes={classes} onEdit={handleEditClick} onDelete={handleDeleteClass} />
            <AddClassForm onClassAdded={handleClassAdded} />
            <EditClassModal show={showEditModal} handleClose={handleCloseModal} classData={selectedClass} onClassUpdated={handleClassUpdated} />
        </div>
    );
}

export default AdminDashboard;