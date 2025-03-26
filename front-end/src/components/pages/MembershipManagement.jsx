import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-buttons/js/buttons.colVis";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import Swal from "sweetalert2"; // Import SweetAlert2
import MemberShipForm from "../MembershipForm"; // Import your form component

const DataTableComponent = () => {
  const tableRef = useRef(null);
  const [showForm, setShowForm] = useState(false); // State for showing/hiding the form

  useEffect(() => {
    window.jQuery = window.$ = $;

    const data = [
      {
        membershipPhoto: "path/to/photo1.jpg", 
        membershipName: "Gold Membership",
        membershipType: "type 1",
        office: "New York", 
        membershipPeriod: "30",
        joinFee: "$100",
        charge: "$20/month",
      },
      {
        membershipPhoto: "path/to/photo2.jpg",
        membershipName: "Silver Membership",
        membershipType: "type 2    ",
        office: "London",
        membershipPeriod: "60",
        joinFee: "$50",
        charge: "$10/month",
      },
      {
        membershipPhoto: "path/to/photo3.jpg",
        membershipName: "Platinum Membership",
        membershipType: "type 3",
        office: "Paris",
        membershipPeriod: "90",
        joinFee: "$200",
        charge: "$30/month",
      }
    ];
    

    const dataTable = $(tableRef.current).DataTable({
      data: data,
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis'],
      columns: [
        { title: "Photo", data: "membershipPhoto" },
        { title: "Membership Name", data: "membershipName" },
        { title: "Membership Type", data: "membershipType" },
        { title: "Membership Period", data: "membershipPeriod" },
        { title: "Join Fee", data: "joinFee" },
        { title: "charge", data: "charge" },
        {
          title: "Edit",
          data: null,
          defaultContent: "",
          render: (data, type, row) => {
            return `<button class="btn btn-primary btn-sm edit-btn" data-id="${row.id}">Edit</button>`;
          },
        },
        {
          title: "Delete",
          data: null,
          defaultContent: "",
          render: (data, type, row) => {
            return `<button class="btn btn-danger btn-sm delete-btn" data-id="${row.id}">Delete</button>`;
          },
        },
        {
          title: "Activities",
          data: null,
          defaultContent: "",
          render: (data, type, row) => {
            return `<button class="btn btn-info btn-sm activities-btn" data-id="${row.id}">Activities</button>`;
          },
        },
      ],
      responsive: true,
      destroy: true
    });

    // Handle delete button click
    $(tableRef.current).on("click", ".delete-btn", function () {
      const rowId = $(this).data("id");
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this record?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "The record has been deleted.", "success");

          // Remove the row from DataTable
          dataTable
            .row($(this).closest("tr"))
            .remove()
            .draw();
        }
      });
    });

    return () => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        dataTable.destroy();
      }
      $(tableRef.current).off("click", ".delete-btn");
    };
  }, []);

  const handleAddMembershipClick = () => {
    setShowForm(!showForm); // Toggle form visibility when the button is clicked
  };

  return (
    <div className="content" style={{ overflowY: "auto", height: "100vh" }}>
      <div className="container-fluid" style={{ marginTop: "20px" }}>
        <div
          className="card"
          style={{ boxShadow: "rgba(0, 0, 0, 0.75) 0px 0px 4px -1px" }}
        >
          <div className="card-body">
            <h4 className="header-title mb-0">Create Membership</h4>
            <div style={{ marginBottom: "20px" }}>
            {/* Add Membership Button - moved to right */}
            <div className="d-flex justify-content-end">
              <button
                  className="btn btn-blue"
                onClick={handleAddMembershipClick}
              >
                Add Membership
              </button>
            </div>
          </div>
            <div style={{ padding: "20px", backgroundColor: "#f0f4f8" }}>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: "20px",
                }}
              >
                <div className="table-responsive">
                  <table
                    ref={tableRef}
                    className="display table table-striped table-bordered"
                    style={{ width: "100%" }}
                  ></table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally Render the Membership Form */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffff",
            zIndex: 9999,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
       
          }}
        >
          <div style={{ width: "100%" }}>
            <MemberShipForm 
              handleAddMembershipClick ={handleAddMembershipClick} 
              closeModal={ () => setShowForm(false)}  
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTableComponent;
