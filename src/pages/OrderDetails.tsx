const OrderDetails = () => {
  return (
    <div className="order_details">
      <div className="prod_det">
        <img
          src="https://m.media-amazon.com/images/I/71RDgtHsREL._AC_UY218_.jpg"
          alt=""
        />
        <p>Mac-Book</p>
      </div>
      <hr />
      <div className="buy_ag">
        <p>Buy it again</p>
        <span>{`>`}</span>
      </div>
      <hr />
      <h1>How's your items?</h1>
      <hr />
      <div className="buy_ag">
        <p>Write a product review</p>
        <span>{`>`}</span>
      </div>
      <hr />
      <div className="buy_ag">
        <p>Create a video review</p>
        <span>{`>`}</span>
      </div>
      <hr />
      <div className="buy_ag">
        <p>Leave seller feedback</p>
        <span>{`>`}</span>
      </div>
      <hr />
    </div>
  );
};

export default OrderDetails;
