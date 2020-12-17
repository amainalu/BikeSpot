function HomePage() {
  return (
    <div>
      <div className="HomePageSetUp">
        <div>
          <h1 className="titleHomepage">Assure your bike safety</h1>
          <img
            className="bikeIcon"
            src="../../bike_700x575-removebg-preview.png"
            alt="bike icon"
            style={{ float: "left" }}
          />
          <h3 className="textNextBike">
            BikeSpot is a private bike parking service, that improves your bike
            journeys by looking after the most essential, your bike!
          </h3>
        </div>

        <div>
          <section className="HomePageSection">
            <h4 className="lessSpaceBetween">Easy Signup</h4>
            <p className="lessSpaceBetween">
              Choose the parking Spots that you want,
            </p>
            <p className="lessSpaceBetween">you can change them anytime</p>
          </section>

          <section className="HomePageSection">
            <h4 className="lessSpaceBetween">Secure</h4>
            <p className="lessSpaceBetween">24/7 survailed parking service,</p>
            <p className="lessSpaceBetween">Authomatic access at any time,</p>
          </section>

          <section className="HomePageSection">
            <h4 className="lessSpaceBetween">Fees</h4>
            <p className="lessSpaceBetween">Rent a Spot for just 15 euros,</p>
            <p className="lessSpaceBetween">Change rented spot for free</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
