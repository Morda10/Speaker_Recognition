import { Button } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";

function Upload({record}) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(record)
    if(record === null){
      console.log(data.file[0])
      formData.append("file", data.file[0]);
  
    }else{
      formData.append("file", record.blob, "userName.wav");
    }
      const res = await fetch("/api/sample", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      alert(JSON.stringify(res));
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input ref={register} type="file" name="file" style={{display: "none"}} />
      <Button variant="outlined" color="primary" type="submit">Submit</Button>
    </form>
  );
}

export default Upload;
