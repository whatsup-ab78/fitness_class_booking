import React from 'react'

const Addclass = () => {
  return (
      <div className="container mt-4">
        
      <div className="row">
          <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4>Upcoming Classes</h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Instructor</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
               
                    <tr >
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <button className="btn btn-success btn-sm me-2">Edit</button>
                        <button className="btn btn-danger btn-sm">Delete</button>
                      </td>
                      </tr>
            
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Form */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h4>Add Fitness Class</h4>
            </div>
            <div className="card-body">
              <form >
                <div className="form-group mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    className="form-control"
                    id="category"
                   
                  >
                    <option>Yoga</option>
                    <option>Gym</option>
                    <option>Dance</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="date" className="form-label">Scheduled Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                 
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="time" className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                   
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="instructor" className="form-label">Instructor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="instructor"
              
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                  
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="reset" className="btn btn-secondary me-2">Cancel</button>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Table */}
      
      </div>
    </div>
  )
}

export default Addclass