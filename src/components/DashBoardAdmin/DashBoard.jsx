import Style from "./DashBoard.module.css";
import customer from "../../assets/customer.png";
import worker from "../../assets/worker.png";
import request from "../../assets/request.png";
import service from "../../assets/service.png";
function DashBoard() {
  return (
    <>
      <div className="container my-5 py-5 d-flex flex-column">
        <div className="row h-20 d-flex justify-content-around py-5 my-5">
          <div className="col-3 d-flex align-self-center my-3">
            <div className={`${Style.cards}`}>
              <img src={customer} alt="customer" />
              <h4>Total Customers</h4>
              <h3>number</h3>
            </div>
          </div>
          <div className="col-3 d-flex align-self-center">
            <div className={`${Style.cards}`}>
              <img src={worker} alt="worker" />
              <h4>Total Workers</h4>
              <h3>number</h3>
            </div>
          </div>
          <div className="col-3 d-flex align-self-center">
            <div className={`${Style.cards}`}>
              <img src={request} alt="request" />
              <h4>Total Requests</h4>
              <h3>number</h3>
            </div>
          </div>
          <div className="col-3 d-flex align-self-center">
            <div className={`${Style.cards}`}>
              <img src={service} alt="service" />
              <h4>Total Services</h4>
              <h3>number</h3>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className={`${Style.tabular}`}>
            <h2>Workers' Requests</h2>
            <br />
            <table className={`w-100 table ${Style.tables}`}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Service</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <button className={`${Style.accept} p-1`}>Accept</button>
                    <button className={`${Style.reject} p-1`}>Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default DashBoard;
