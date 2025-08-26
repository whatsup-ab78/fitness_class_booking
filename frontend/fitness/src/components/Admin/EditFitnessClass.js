import React, { useEffect } from "react";

function EditFitnessClass() {

    // The useEffect hook is here, but currently empty.
    // You can add logic here to fetch the fitness class data when the component mounts.
    useEffect(() => {
        // For example: console.log("Component has mounted. Fetch data here.");
    }, []); // The empty array [] means this effect runs only once after the initial render.

    return (
        <div>
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
                                <input type="date" class="form-control" id="scheduled-date" />
                            </div>
                            <div class="form-group mb-3">
                                <label for="time" class="form-label">Time</label>
                                <input type="time" class="form-control" id="time" />
                            </div>
                            <div class="form-group mb-3">
                                <label for="instructor" class="form-label">Instructor</label>
                                <input type="text" class="form-control" id="instructor" />
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
        </div>
    );
}

// Corrected Export: Export the component function itself, not the result of calling it.
export default EditFitnessClass;


