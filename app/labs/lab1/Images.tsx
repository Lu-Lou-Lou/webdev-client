export default function Images() {
  return (
    <div id="wd-images">
      <h4>Image tag</h4>
      Loading an image from the internet:
      <br />
      <img
        id="wd-starship"
        width="400px"
        alt="Starship"
        src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
      />
      <br />
      Loading a local image:
      <br />
      <img
        id="wd-teslabot"
        src="/images/teslabot.jpg"
        height="200px"
        alt="Tesla Bot (Optimus) humanoid robot"
      />
      <br />
      <img
        id="wd-ai-image"
        src="https://images-assets.nasa.gov/image/PIA12348/PIA12348~orig.jpg"
        width="200px"
        alt="Deep space"
      />
      <br />
        Loading my own image:
        <br />
        <img
        id="wd-your-image"
        src="https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/569399919_1144208901137333_6910027940314916955_n.jpg?stp=dst-jpg_tt6&cstp=mx1638x2048&ctp=s1638x2048&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3-gv8xQCH8UQ7kNvwHQpURW&_nc_oc=AdqGb9H92kgReBIgTZSdUpHFsqWf0i4UmxZBiN-u-e4XXNuPmvHvTlwK6YJe95DCdlc&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=0OwKdyI_DxZpxz6dV0K0AQ&_nc_ss=7b289&oh=00_AQIjhQFut5Q_ijRE7Nbw9Z2_IhF08VrLMndSkfpyLXt76A&oe=6ABA09ED"
        width="300px"
        alt="A cute, orange kitty."
        />
    </div>
  );
}