import { useCMS, Input, Button } from "tinacms";
import * as React from "react";

export const CustomFileUpload = ({ input, meta, field }) => {

  const cms = useCMS();
  
  const fileUploadRef = React.useRef(null);

  const [fileName, setFileName] = React.useState<string>(input.value);

  React.useEffect(() => {
    input.onChange(fileName);
  }, [fileName])

  input.onChange(fileName);

  const handleSubmit = async () => {
      
    const file = fileUploadRef?.current?.files[0];
    if (!file) return;
    
    setFileName(file.name);
    console.log(file);
    await cms.media.persist([{ directory: "newsletters", file: file }])
    cms.media.store.list({ directory: "newsletters" }).then((res) => {
      console.log(res);
    })
  }

  return (
    <div>
      <Input type="file" ref={fileUploadRef} onChange={(e) => {
        setFileName(e.target.files[0].name);
      }} />
      <Button type="submit" onClick={() => handleSubmit().then(() => console.log("success"))}>Upload File</Button>      
    </div>
  )
}