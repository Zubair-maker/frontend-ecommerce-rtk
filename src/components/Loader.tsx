const Loader = () => {
  return (
    <section className="loader">
      <div>Loding....</div>
    </section>
  );
};

export const Skeleton = ({ width = "unset" }: { width?: string }) => {
  return (
    <div className="sk_loader" style={{ width }}>
      <div className="sk_shape"></div>
      <div className="sk_shape"></div>
      <div className="sk_shape"></div>
    </div>
  );
};

export default Loader;
