import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {getRaceById, resetDetail} from "../actions/index"


function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailInfo = useSelector((state) => state.detail);
  console.log(detailInfo);

  useEffect(() => {
    dispatch(getRaceById(id));
    return () => {
      dispatch(resetDetail());
    };
  }, [dispatch, id]);

  return (
    <div className="detail">
      {detailInfo.temperament ? (
        <div>
          <h1 className="title">
            Information about the dog race: {detailInfo.name}
          </h1>
          <img
            src={
              detailInfo.image
                ? detailInfo.image
                : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
            }
            alt={detailInfo.image}
            width={600}
          />
          <p className="info">
            Temperament:{" "}
            {isNaN(detailInfo.weight)
              ? detailInfo.temperament
              : detailInfo.temperament.join(", ")}
          </p>
          <p className="info">Weight: {detailInfo.weight} cms</p>
          <p className="info">Height: {detailInfo.height} kgs</p>
          <p className="info">Years of life: {detailInfo.lifeYears}</p>
        </div>
      ) : (
        <div className="loader">
          <div className="lds-heart">
            <div></div>
          </div>
        </div>
      )}
      <Link to="/home">
        <button className="home">Home</button>
      </Link>
    </div>
  );
}

export default Detail;