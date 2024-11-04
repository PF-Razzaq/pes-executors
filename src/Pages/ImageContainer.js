const ImageContainer = (props) => {
  return (
    <>
      <div
        className="banner"
        style={{
          width: "100%",
          height: 132,
          margin: "auto",
          background: "url(/banner.png) repeat-x",
          position: "relative",
        }}
      >
        <h1 className="banner"> Executor's Aide</h1>
        <h1
          style={{ marginTop: "-29px" }}
          data-sider-select-id="58e94d49-3e25-49ec-bcec-dbd70cc9d2f2"
          className="mobileImage"
        >
          {/*  Executor's Aide */}
        </h1>
        {props.selectedLanguage === "en" && (
          <img
            src="/banner6.png"
            width={302}
            height={135}
            style={{ marginTop: "-23px" }}
            className=""
          />
        )}

        {props.selectedLanguage === "fr" && (
          <img
            src="/DigniteLogo.jpg"
            width={302}
            height={135}
            style={{ marginTop: "-23px" }}
            className=""
          />
        )}
      </div>
    </>
  );
};

export default ImageContainer;
