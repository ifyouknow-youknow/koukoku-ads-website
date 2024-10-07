import { useEffect, useState } from "react";
import { storage_DownloadMedia } from "../../firebase";

export function AsyncImage({ imagePath, width, height, radius, objectFit }) {
    const [url, setUrl] = useState(null);
    useEffect(() => {
        if (imagePath) {
            storage_DownloadMedia(imagePath, (downloadedUrl) => {
                setUrl(downloadedUrl);
            });
        }
    }, [imagePath]);
    return (
        <div>
            {url !== null ? (
                <div>
                    <img
                        src={url}
                        style={{
                            width: width != undefined ? width : '100%',
                            height: height != undefined ? height : '100%',
                            borderRadius: radius !== undefined ? radius : 10,
                            objectFit: objectFit != undefined ? objectFit : 'cover',
                        }}
                    />
                </div>
            ) : (
                <div style={{ backgroundColor: "#C9CED8", borderRadius: "10px" }}></div>
            )}
        </div>
    );
}
