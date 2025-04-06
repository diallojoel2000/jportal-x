import React, { useEffect, useRef } from 'react';
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/dist/js/adminlte.min.js';
import { Collapse } from 'bootstrap';

const TestPage =()=>{
    const collapseRef = useRef(null);

    useEffect(() => {
        if (collapseRef.current) {
            new Collapse(collapseRef.current, {
              toggle: false, // Optional, depends on your usage
            });
          }
      }, []);
      
    return <>
        <div className="app-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Title</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-lte-toggle="card-collapse"
                        title="Collapse"
                      >
                        <i data-lte-icon="expand" className="bi bi-plus-lg"></i>
                        <i data-lte-icon="collapse" className="bi bi-dash-lg"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-lte-toggle="card-remove"
                        title="Remove"
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">Start creating your amazing application!</div>
                  <div className="card-footer">Footer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
}

export default TestPage;