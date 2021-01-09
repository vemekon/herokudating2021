<div className="row   shadow ps-5  bg-white rounded container  ">
  <div className="row p-2">
    <div className="col-md-3">here is one</div>
    <div className="col-md-3 offset-8">Check</div>
  </div>
  <div className="row   shadow ps-5  bg-primary rounded container  ">
    {items &&
      items.map((x) => (
        <div className="col-md-6  p-2" key={x.id}>
          <CardResult item={x} />
        </div>
      ))}
  </div>
</div>;
