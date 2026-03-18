function Preview({
  url
}: {
  url: string | null;
}) {
  return (
    <>
      <h1>WebContainer React Template</h1>
      <iframe
        id="preview"
        title="WebContainer Preview"
        style={{ width: "100%", height: "80vh", border: "none" }}
        src={url || undefined}
      />
    </>
  );
}

export default Preview;
