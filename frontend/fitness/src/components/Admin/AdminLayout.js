import React, { useEffect } from "react";

function Adminlayout() {

    return (
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h4>Add Fitness Class</h4>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="form-group mb-3">
                                        <label for="category" class="form-label">Category</label>
                                        <select class="form-control" id="category">
                                            <option>Yoga</option>
                                            <option>Gym</option>
                                            <option>Dance</option>
                                        </select>
                                    </div>
                                    <div class="form-group mb-3">
                                        <label for="scheduled-date" class="form-label">Scheduled Date</label>
                                        <input type="date" class="form-control" id="scheduled-date"/>
                                    </div>
                                    <div class="form-group mb-3">
                                        <label for="time" class="form-label">Time</label>
                                        <input type="time" class="form-control" id="time"/>
                                    </div>
                                    <div class="form-group mb-3">
                                        <label for="instructor" class="form-label">Instructor</label>
                                        <input type="text" class="form-control" id="instructor"/>
                                    </div>
                                    <div class="form-group mb-3">
                                        <label for="description" class="form-label">Description</label>
                                        <textarea class="form-control" id="description" rows="3"></textarea>
                                    </div>
                                    <div class="d-flex justify-content-end">
                                        <button type="button" class="btn btn-secondary me-2">Cancel</button>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">
                                <h4>Upcoming Classes</h4>
                            </div>
                            <div class="card-body">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Category</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Instructor</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Yoga</td>
                                            <td>2025-09-15</td>
                                            <td>08:00 AM</td>
                                            <td>John Doe</td>
                                            <td>Morning Yoga Session</td>
                                            <td>
                                                <button type="button" class="btn btn-success btn-sm">Edit</button>
                                                <button type="button" class="btn btn-danger btn-sm">Delete</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Gym</td>
                                            <td>2025-09-15</td>
                                            <td>10:00 AM</td>
                                            <td>Jane Smith</td>
                                            <td>High-Intensity Interval Training</td>
                                            <td>
                                                <button type="button" class="btn btn-success btn-sm">Edit</button>
                                                <button type="button" class="btn btn-danger btn-sm">Delete</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Dance</td>
                                            <td>2025-09-16</td>
                                            <td>06:00 PM</td>
                                            <td>Emily White</td>
                                            <td>Zumba Fitness</td>
                                            <td>
                                                <button type="button" class="btn btn-success btn-sm">Edit</button>
                                                <button type="button" class="btn btn-danger btn-sm">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
}

            export default Adminlayout;