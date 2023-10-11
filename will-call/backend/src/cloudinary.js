import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: "drxpgaiaw",
    api_key: "779367955929575",
    api_secret: "Nu501hn4BM-seKRA_iq1AOWZlGQ",
});
// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });


export { cloudinary };
