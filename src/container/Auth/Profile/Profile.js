import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Profile.module.css";
import * as action from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from "../../../hoc/Aux/Aux";

const Profile = (props) => {

  useEffect(() => {
    if (props.userId) {
      props.onFetchUserData(props.userId);
      props.onFetchOrders(props.userId)
    }
  }, [props.onFetchUserData, props.onFetchOrders, props.userId]);


  const formatTime = (orderTime) => {
    let fullTimeArr = new Date(orderTime).toString().split(" ");
    let date = `${fullTimeArr[2]} ${fullTimeArr[1]}, ${fullTimeArr[3]}  `;
    let timeArr = fullTimeArr[4].split(":");
    let meridian = "AM";
    if (timeArr[0] > 12) {
      timeArr[0] -= 12;
      meridian = "PM";
    }
    let timeString = `${timeArr[0]}:${timeArr[1]} ${meridian}`;
    return `${date}  ${timeString}`;
  };

  const orderStatusStyle = (status) => {
    let statusClass = [classes.Pending];
    if (status === "cancelled") {
      statusClass = [classes.Cancelled];
    } else if (status === "completed") {
      statusClass = [classes.Completed];
    }
    return statusClass;
  };

  let profile = (
    <div className={classes.Profile}>
      <h1>Profile Data</h1>
      <div className={classes.ProfileBox}>
        <div className={classes.ProfileContent}>
          <div className={classes.UserDetails}>
            <h3>User Details</h3>

            <div className={classes.InfoRow}>
              <div className={classes.InfoHeading}>Full Name</div>
              <div className={classes.InfoData}>{props.userData.name}</div>
            </div>

            <div className={classes.InfoRow}>
              <div className={classes.InfoHeading}>Email ID</div>
              <div className={classes.InfoData}>{props.userData.email}</div>
            </div>

            <div className={classes.InfoRow}>
              <div className={classes.InfoHeading}>Phone</div>
              <div className={classes.InfoData}>{props.userData.phone}</div>
            </div>
          </div>

          <div className={classes.RecentOrders}>
            <h3>Recent Orders</h3>
            {props.orders.length ? (
              <div className={classes.OrdersListArea}>
                <div className={classes.ColorLabels}>
                  <div>
                    <span
                      style={{ backgroundColor: "darkcyan" }}
                      className={classes.ColorBox}
                    ></span>
                    In Progress
                  </div>
                  <div>
                    <span
                      style={{ backgroundColor: "rgb(211, 46, 46)" }}
                      className={classes.ColorBox}
                    ></span>
                    Cancelled
                  </div>
                  <div>
                    <span
                      style={{ backgroundColor: "green" }}
                      className={classes.ColorBox}
                    ></span>
                    Completed
                  </div>
                </div>
                <ul className={classes.OrdersList}>
                  {props.orders
                    .slice(-5)
                    .reverse()
                    .map((order) => (
                      <div key={order.orderId} className={classes.OrderId}>
                        <li className={orderStatusStyle(order.status)}>
                          <Link to="/orders" title={order.status.toUpperCase()}>
                            {order.orderId}
                          </Link>
                        </li>
                        <li>
                          Order date: {formatTime(parseInt(order.orderId, 10))}
                        </li>
                      </div>
                    ))}
                </ul>
              </div>
            ) : (
              "No orders placed"
            )}
          </div>
        </div>
        <div className={classes.ImageBanner}></div>
      </div>
    </div>
  );

  return <Aux>{props.loading ? <Spinner /> : profile}</Aux>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    userId: state.auth.userId,
    userData: state.auth.userData,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUserData: (userId) => dispatch(action.fetchUserData(userId)),
    onFetchOrders: (userId) => dispatch(action.fetchOrders(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
