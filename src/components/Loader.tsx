const Loader = () => {
  return (
    <section className="loader">
      <div>Loding....</div>
    </section>
  );
};

export const LoaderLayout = () => {
  return (
    <section
      style={{
        height: "calc(100vh - 4rem)",
      }}
      className="loader"
    >
      <div></div>
    </section>
  );
};

export default Loader;
